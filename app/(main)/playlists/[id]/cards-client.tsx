"use client";

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Playlist, UserCard} from "@/lib/database-helper";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  ChevronDownIcon, ChevronLeft,
  ChevronLeftIcon, ChevronRight,
  ChevronsLeft,
  Edit2,
  Globe,
  Hash,
  LayoutGridIcon,
  ListIcon,
  Trash2
} from "lucide-react";
import {Tabs, TabsList , TabsTrigger , TabsContent} from "@/components/ui/tabs";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {useAutoResize} from "@/hooks/use-auto-resize";
import axios from "axios";
import {cn} from "@/lib/utils";
import {BiChevronsLeft} from "react-icons/bi";

interface CardsClientProps {
  playlist: Playlist;
  userId: string
}

type StatefulCard = UserCard & {
  state: "idle" | "editing" | "deleting";
  flipped: boolean;
}

const CardsClient = (
  {
    playlist,
    userId,
  } : CardsClientProps
) => {

  const [playlistCards , setPlaylistCards] = useState<StatefulCard[]>([]);

  useEffect(() => {
    setPlaylistCards(
      playlist?.cards.map((i) => {
        return {
          ...i,
          state: "idle",
          flipped: false,
        } as StatefulCard;
      })
    );
  }, [playlist]);


  const [view, setView] = useState("grid")
  const [sortBy, setSortBy] = useState("question")
  const [sortOrder, setSortOrder] = useState("asc")
  const [filterText, setFilterText] = useState("")

  const autoResize1 = useAutoResize(); //add man
  const autoResize2 = useAutoResize(); //add ai
  const autoResize3 = useAutoResize(); //edit man

  const [creatingCard , setCreatingCard] = useState<boolean>(false)

  const manualFieldAnswer = useRef<HTMLInputElement>(null);
  const editFieldAnswer = useRef<HTMLInputElement>(null);
  const aiFieldCount = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const [editMode , setEditMode] = useState(false);

  const [currentEditingCard , setCurrentEditingCard] = useState<StatefulCard | null>(null);

  const [practiceModeIndex , setPracticeModeIndex] = useState<number | null>(null);

  const cards = useMemo(() => {
    return playlistCards.filter((card) => card.question.toLowerCase().includes(filterText.toLowerCase()))
      .sort((a, b) => {
        if (sortOrder === "asc") {
          // @ts-ignore
          return a[sortBy] > b[sortBy] ? 1 : -1
        } else {
          // @ts-ignore
          return a[sortBy] < b[sortBy] ? 1 : -1
        }
      });
  }, [playlistCards, filterText, sortBy, sortOrder])

  const createCard = async (question: string, answer: string) => {
    setSubmitting(true);
    try {
      if (question.trim().length == 0) {
        setError("Question cannot be empty");
        setSubmitting(false);
        return;
      }

      if (answer.trim().length == 0) {
        setError("Answer cannot be empty");
        setSubmitting(false);
        return;
      }

      const res = await axios.post("/api/cards", {
        playlistId: playlist?.id,
        question: question.trim(),
        answer: answer.trim(),
      })

      const card = res.data;
      const newList = playlistCards.map(e => e);
      newList.push({
        ...card,
        createdAt: new Date(card.createdAt),
        state: "idle",
        flipped: false
      } as StatefulCard);
      setPlaylistCards(newList);
      setSubmitting(false);
      setCreatingCard(false);
    } catch (e) {
      setError("Failed to create card, maybe check your internet ?");
      console.log(e);
    }
    setSubmitting(false);
  }

  const generateCards = async (context: string, count: string) => {
    setSubmitting(true);
    try {
      if (context.trim().length == 0) {
        setError("Context cannot be empty");
        setSubmitting(false);
        return;
      }

      if (count.trim().length == 0) {
        setError("Count cannot be empty");
        setSubmitting(false);
        return;
      }

      const res = await axios.post("/api/generate", {
        playlist: playlist?.id,
        count: parseInt(count.trim()),
        topic: context.trim(),
      })

      const cards = res.data.data as any[];
      const newList = playlistCards.map(e => e);
      for (const card of cards){
        newList.push({
          ...card,
          createdAt: new Date(card.createdAt),
          state: "idle",
          flipped: false
        } as StatefulCard);
      }

      setPlaylistCards(newList);
      setSubmitting(false);
      setCreatingCard(false);
    } catch (e) {
      setError("Failed to create card, maybe check your internet ?");
      console.log(e);
    }
    setSubmitting(false);
  }

  const submitEdit = async (newQuestion: string, newAnswer: string) => {
    const currentId = currentEditingCard?.id;
    setCurrentEditingCard(null);

    setPlaylistCards((current) => {
      return current.map((e) => {
        return (e.id == currentId ? {
          ...e,
          state: "editing",
        } : e) as StatefulCard;
      });
    });

    try {
      const req = await axios.patch("/api/cards" , {
        playlist: playlist?.id,
        id: currentEditingCard?.id,
        newQuestion: newQuestion,
        newAnswer: newAnswer,
      });

      setPlaylistCards((current) => {
        return current.map((e) => {
          if (e.id != currentId) return e;
          return {
            ...e,
            question: newQuestion,
            answer: newAnswer,
            state: "idle",
          }
        });
      });

    } catch (e) {
      console.log(e);
      setPlaylistCards((current) => {
        return current.map((e) => {
          return (e.id == currentId ? {
            ...e,
            state: "idle",
          } : e) as StatefulCard;
        });
      });
    }
  }

  const deleteCard = async (cardId: string) => {
    setPlaylistCards((current) => {
      return current.map((e) => {
        return (e.id == cardId ? {
          ...e,
          state: "deleting",
        } : e) as StatefulCard;
      });
    });

    try {

      const req = await axios.delete("/api/cards" , {
        data: {
          playlist: playlist?.id,
          id: cardId
        }
      });

      setPlaylistCards((current) => {
        return current.filter((e) => {
          return (e.id != cardId);
        });
      });

    } catch (e) {
      console.log(e);
      setPlaylistCards((current) => {
        return current.map((e) => {
          return (e.id == cardId ? {
            ...e,
            state: "idle",
          } : e) as StatefulCard;
        });
      });
    }
  }

  const practiceIndex = practiceModeIndex == null ? 0 : practiceModeIndex;

  return (
    <>
      <Dialog open={creatingCard} onOpenChange={ (e) => {if (!e) setCreatingCard(false)}}>
        <DialogContent>
          <Tabs defaultValue="manual" className="w-full p-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Manual</TabsTrigger>
              <TabsTrigger value="ai">AI</TabsTrigger>
            </TabsList>
            <TabsContent value="manual">
              <Card>
                <CardHeader>
                  <CardTitle>Card Details</CardTitle>
                  <CardDescription>
                    {"Type in the question and the answer that should exist on the card."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label>Question</Label>
                    <textarea ref={autoResize1.ref as any}
                              onInput={autoResize1.onInput}
                              defaultValue=""
                              className={"overflow-auto p-2 w-full border-[1px] border-gray-400 focus:border-black max-h-[15vh]"}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label >Answer</Label>
                    <Input defaultValue="" ref={manualFieldAnswer}/>
                  </div>
                  <p className={"text-red-800"}>{error}</p>
                </CardContent>
                <CardFooter>
                  <Button className={"text-white"}
                          disabled={submitting}
                    onClick={() => {
                      if (!autoResize1.ref?.current) {
                        return;
                      }

                      createCard(
                        (autoResize1.ref?.current as HTMLTextAreaElement).value ?? "",
                        manualFieldAnswer.current?.value ?? ""
                      );

                    }}
                  >Add</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="ai">
              <Card>
                <CardHeader>
                  <CardTitle>AI</CardTitle>
                  <CardDescription>
                    {"Use AI to generate number of cards based on topic of your choice!"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label>Context</Label>
                    <textarea ref={autoResize2.ref as any}
                              onInput={autoResize2.onInput}
                              defaultValue=""
                              className={"overflow-auto p-2 w-full border-[1px] border-gray-400 focus:border-black max-h-[20vh]"}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label >Number of cards to generate</Label>
                    <Input type="number" min={1} max={15} ref={aiFieldCount}/>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className={"text-white"}
                    disabled={submitting}
                    onClick={() => {
                      if (!autoResize2.ref?.current) {
                        return;
                      }
                      generateCards(
                        (autoResize2.ref?.current as HTMLTextAreaElement).value ?? "",
                        aiFieldCount.current?.value ?? ""
                      );

                    }}
                  >Generate</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <Dialog open={practiceModeIndex != null} onOpenChange={ (e) => {if (!e) setPracticeModeIndex(null)}}>
        <DialogContent>
          <div className={"absolute inset-0 overflow-auto flex flex-row"}>
            <div
              className={"my-8 w-fit rounded-md items-center content-center px-1 hover:bg-neutral-700 transition-all group"}
              onClick={
                () => {
                  setPracticeModeIndex((v) => {
                    if (v == null) return 0;
                    if (v - 1 < 0) {
                      return playlistCards.length - 1;
                    }
                    return v - 1;
                  });
                }
              }>
              <ChevronLeft className={"group-hover:text-white"}/>
            </div>

            <div className={"flex-1"}/>

            <div
              className={"my-8 w-fit rounded-md items-center content-center px-1 hover:bg-neutral-700 transition-all group"}
              onClick={
                () => {
                  setPracticeModeIndex((v) => {
                    if (v == null) return 0;
                    if (v + 1 >= playlistCards.length) {
                      return 0;
                    }
                    return v + 1;
                  });
                }
              }>
              <ChevronRight className={"group-hover:text-white"}/>
            </div>
          </div>

          <div className={"relative px-6 flex flex-col"}>
            {
              playlistCards.length && (
                <Card className={"break-inside-avoid"} onClick={() => {
                  setPlaylistCards(
                    playlistCards.map(i => {
                      if (i.id != playlistCards[practiceIndex].id) return i;
                      return {
                        ...i,
                        flipped: !i.flipped,
                      }
                    })
                  )
                }}>
                  <CardContent className={cn(
                    "p-4 group relative",
                    playlistCards[practiceIndex].state != 'idle' && "opacity-20",
                  )}>
                    <div className={cn(
                      "absolute inset-0 overflow-auto opacity-0 transition-all pointer-events-none p-4",
                      playlistCards[practiceIndex].flipped && "opacity-100"
                    )}>
                      <p className={"text-sm font-semibold "}>{playlistCards[practiceIndex].answer}</p>
                    </div>
                    <div className={cn(
                      "flex flex-col w-full opacity-100 transition-all",
                      playlistCards[practiceIndex].flipped && "opacity-0"
                    )}>
                      <p
                        className="text-sm bg-transparent h-fit overflow-hidden pointer-events-none">{playlistCards[practiceIndex].question}</p>
                      <div className={"ml-auto group-hover:opacity-100 opacity-0 transition-all flex flex-row"}>
                        {editMode && (
                          <>
                            <Button size="icon" className="mr-2" variant={"ghost"}
                                    disabled={playlistCards[practiceIndex].state != 'idle'} onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setCurrentEditingCard(playlistCards[practiceIndex]);
                            }}>
                              <Edit2 className="w-4 h-4 text-green-300"/>
                            </Button>

                            <Button size="icon" className="" variant={"ghost"}
                                    disabled={playlistCards[practiceIndex].state != 'idle'} onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              deleteCard(playlistCards[practiceIndex].id);
                            }}>
                              <Trash2 className="w-4 h-4 text-red-400"/>
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className={
                      cn(
                        "text-gray-500 mt-2 flex w-full items-center opacity-100 transition-all",
                        playlistCards[practiceIndex].flipped && "opacity-0"
                      )
                    }>
                      <p
                        className={"ml-auto text-black/50"}>{playlistCards[practiceIndex].createdAt.toDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            }

            <p className={"text-sm font-semibold text-neutral-400 mt-2"}>
              Question {practiceIndex + 1} / {playlistCards.length}
            </p>
          </div>
        </DialogContent>
      </Dialog>


      <Dialog open={currentEditingCard != null} onOpenChange={(e) => {
        if (!e) setCurrentEditingCard(null)
      }}>
        <DialogContent>
          <Card>
            <CardHeader>
            <CardTitle>Card Details</CardTitle>
              <CardDescription>
                {"Type in the question and the answer that should exist on the card."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label>Question</Label>
                {currentEditingCard &&
                  <textarea ref={autoResize3.ref as any}
                            onInput={autoResize3.onInput}
                            defaultValue={currentEditingCard?.question}
                            className={"overflow-auto p-2 w-full border-[1px] border-gray-400 focus:border-black max-h-[15vh]"}
                  />}
              </div>
              <div className="space-y-1">
                <Label>Answer</Label>
                {currentEditingCard && <Input defaultValue={currentEditingCard?.answer} ref={editFieldAnswer}/>}
              </div>
              <p className={"text-red-800"}>{error}</p>
            </CardContent>
            <CardFooter>
              <Button className={"text-white"}
                      disabled={submitting}
                      onClick={() => {
                        if (!autoResize3.ref?.current) {
                          return;
                        }

                        submitEdit(
                          (autoResize3.ref?.current as HTMLTextAreaElement).value ?? "",
                          editFieldAnswer.current?.value ?? ""
                        );

                      }}
              >Save</Button>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>

      <div className={cn("container mx-auto px-4 py-8 flex flex-1")}>
        <div className={cn(
          "p-2 md:p-4 transition-all rounded-md border-2 border-black/0 flex flex-col w-full",
          editMode && "bg-neutral-200 border-2 border-black"
        )}>

        <div className={
          cn("flex w-full items-center justify-between mb-6 transition-all",)
        }>
          <div className={""}>
            <h1 className="text-2xl font-bold">{playlist?.name}</h1>
            <div className={cn(
              "w-full mt-2 flex flex-row content-center items-center",
              (playlist.ownerId !== userId) && "hidden"
            )}>
              <Input type="checkbox" checked={editMode} onChange={() => setEditMode(!editMode)} className={"w-5 h-5"}/>
              <p className={"text-xl ml-2"}>Edit Mode</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">

            <Button variant={"outline"} className={"text-green-900 font-semibold mr-4"} onClick={() => {
              setPracticeModeIndex(0);
            }}>
              <Hash className={"w-4 h-4"}/>
              Practice
            </Button>

            { playlist.ownerId == userId &&
              <Button className={"text-white"} onClick={() => {
                setError(null);
                setCreatingCard(true);
              }}>
                Add Cards
              </Button>
            }



            <Input
              type="text"
              placeholder="Search by question..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <span>Sort by</span>
                  <ChevronDownIcon className="w-4 h-4"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={"bg-white"}>
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                  <DropdownMenuRadioItem value="question">Question</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="answer">Answer</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="createdAt">Date Added</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
                  <DropdownMenuRadioItem value="asc">Ascending</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="desc">Descending</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant={view === "grid" ? "secondary" : "outline"} onClick={() => setView("grid")}>
              <LayoutGridIcon className="w-4 h-4"/>
            </Button>
            <Button variant={view === "list" ? "secondary" : "outline"} onClick={() => setView("list")}>
              <ListIcon className="w-4 h-4"/>
            </Button>
          </div>
        </div>
        <div
          className={"space-y-6 sm:columns-2 sm:gap-2 xl:columns-3 items-center justify-center flex-wrap"}
        >
          {cards?.map((card) => (
            <Card key={card.id} className={"break-inside-avoid"} onClick={() => {
              setPlaylistCards(
                playlistCards.map(i => {
                  if (i.id != card.id) return i;
                  return {
                    ...i,
                    flipped: !i.flipped,
                  }
                })
              )
            }}>
              <CardContent className={cn(
                "p-4 group relative",
                card.state != 'idle' && "opacity-20",
              )}>
                <div className={cn(
                  "absolute inset-0 overflow-auto opacity-0 transition-all pointer-events-none p-4",
                  card.flipped && "opacity-100"
                )}>
                  <p className={"text-sm font-semibold "}>{card.answer}</p>
                </div>
                <div className={cn(
                  "flex flex-col w-full opacity-100 transition-all",
                  card.flipped && "opacity-0"
                )}>
                  <p className="text-sm bg-transparent h-fit overflow-hidden pointer-events-none">{card.question}</p>
                  <div className={"ml-auto group-hover:opacity-100 opacity-0 transition-all flex flex-row"}>
                    {editMode && (
                      <>
                        <Button size="icon" className="mr-2" variant={"ghost"} disabled={card.state != 'idle'} onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setCurrentEditingCard(card);
                        }}>
                          <Edit2 className="w-4 h-4 text-green-300"/>
                        </Button>

                        <Button size="icon" className="" variant={"ghost"} disabled={card.state != 'idle'} onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteCard(card.id);
                        }}>
                          <Trash2 className="w-4 h-4 text-red-400"/>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <div className={
                  cn(
                    "text-gray-500 mt-2 flex w-full items-center opacity-100 transition-all",
                    card.flipped && "opacity-0"
                  )
                }>
                  <p className={"ml-auto text-black/50"}>{card.createdAt.toDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>


        <div className={cn(
          "flex-1 w-full h-full flex-col items-center justify-center content-center hidden",
          playlist?.cards.length == 0 && "flex"
        )}>
          No cards, maybe start adding some by clicking the &quot;Add Cards&quot; button.
        </div>

        </div>
      </div>
    </>
  );
};

export default CardsClient;