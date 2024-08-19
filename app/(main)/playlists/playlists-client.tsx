"use client";

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Playlist} from "@/lib/database-helper";
import {Button} from "@/components/ui/button";
import {ChevronDownIcon,LayoutGridIcon, ListIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";

import axios from "axios";
import {cn} from "@/lib/utils";
import PlaylistCard from "@/app/(main)/playlists/playlist-card";

interface PlaylistsClientProps {
  playlists: Playlist[];
}

export type StatefulPlaylist = Playlist & {
  state: "idle" | "editing" | "deleting";
}

const PlaylistsClient = (
  {playlists : serverPL} : PlaylistsClientProps
) => {
  const [mPlaylists, setPlaylists] = useState<StatefulPlaylist[]>([]);

  useEffect(() => {
    setPlaylists(serverPL.map((list) => {
      return {
        ...list,
        state: "idle",
      }
    }));
  }, [serverPL]);

  const [view, setView] = useState("grid")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [filterText, setFilterText] = useState("")
  const playlists = useMemo(() => {
    return mPlaylists.filter((playlist) => playlist.name.toLowerCase().includes(filterText.toLowerCase()))
      .sort((a, b) => {
        if (sortOrder === "asc") {
          // @ts-ignore
          return a[sortBy] > b[sortBy] ? 1 : -1
        } else {
          // @ts-ignore
          return a[sortBy] < b[sortBy] ? 1 : -1
        }
      })
  }, [filterText, sortBy, sortOrder , mPlaylists])

  const [currentEditing , setCurrentEditing] = useState<StatefulPlaylist | null>();
  const [currentDeleting , setCurrentDeleting] = useState<StatefulPlaylist | null>();
  const [currentCreating , setCurrentCreating] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const editingNameFieldRef = useRef<HTMLInputElement>(null);
  const editingPublicFieldRef = useRef<HTMLInputElement>(null);

  const creatingNameFieldRef = useRef<HTMLInputElement>(null);
  const creatingPublicFieldRef = useRef<HTMLInputElement>(null);


  const handleEdit = (playlist: StatefulPlaylist) => {
    setCurrentEditing(playlist);
  }

  const handleDelete = (playlist: StatefulPlaylist) => {
    setCurrentDeleting(playlist);
  }

  const submitEdit = async (newName: string, newPublic: boolean)=> {
    setSubmitting((e) => true);
    setPlaylists((current) => {
      return current.map((e) => {
        return (currentEditing && e.id == currentEditing.id ? {
          ...e,
          state: "editing",
        } : e) as StatefulPlaylist;
      });
    })

    try {

      const req = await axios.patch("/api/playlist" , {
        id: currentEditing?.id,
        newName: newName,
        newPrivate: !newPublic,
      });

      setPlaylists((current) => {
        return current.map((e) => {
          return (currentEditing && e.id == currentEditing.id ? {
            ...e,
            state: "idle",
            name: newName,
            private: !newPublic,
          } : e) as StatefulPlaylist;
        });
      });

      setCurrentEditing(null);

    } catch (e) {
      console.log(e);
      setPlaylists((current) => {
        return current.map((e) => {
          return (currentEditing && e.id == currentEditing.id ? {
            ...e,
            state: "idle",
          } : e) as StatefulPlaylist;
        });
      })
    }
    setSubmitting((e) => false);
  }


  const submitAdd = async (name: string, mPublic: boolean)=> {
    setSubmitting((e) => true);
    setPlaylists((current) => {
      current.push({
        state: "editing",
        private: !mPublic,
        name: name,
        cards: [],
        createdAt: new Date(),
        ownerId: "---",
        id: "current",
        deleted: false,
      } as StatefulPlaylist)
      return current;
    })

    try {

      const req = await axios.post("/api/playlist" , {
        name: name,
        isPrivate: !mPublic,
      });

      setPlaylists((current) => {
        const l = current.filter((e) => {
          return e.id != "current";
        });

        l.push({
          ...req.data,
          state: "idle",
          createdAt: new Date(req.data.createdAt)
        });

        return l;
      });

      setCurrentCreating(false);

    } catch (e) {
      console.log(e);
      setPlaylists((current) => {
        return current.filter((e) => {
          return e.id != "current";
        });
      })
    }

    setSubmitting((e) => false);
  }

  const submitDelete = async (id: string)=> {
    setSubmitting((e) => true);
    setPlaylists((current) => {
      return current.map((e) => {
        return (currentDeleting && e.id == currentDeleting.id ? {
          ...e,
          state: "deleting",
        } : e) as StatefulPlaylist;
      });
    });

    try {

      const req = await axios.delete("/api/playlist" , {
        data: {
          id: currentDeleting?.id,
        }
      });

      setPlaylists((current) => {
        return current.filter((e) => {
          return (currentDeleting && e.id != currentDeleting.id);
        });
      });

      setCurrentDeleting(null);
    } catch (e) {
      console.log(e);
      setPlaylists((current) => {
        return current.map((e) => {
          return (currentDeleting && e.id == currentDeleting.id ? {
            ...e,
            state: "idle",
          } : e) as StatefulPlaylist;
        });
      })
    }
    setSubmitting((e) => false);
  }

  return (
    <div className="container mx-auto px-4 py-8 w-full h-full">
      <Dialog open={currentEditing != null} onOpenChange={(open) => {
        if (!open) setCurrentEditing(null);
      }}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Edit Playlist</DialogTitle>
            <DialogDescription>
              Enter a new name for your playlist and choose if you want to make it public.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-[auto_1fr] gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              {currentEditing && <Input defaultValue={currentEditing.name} className="col-span-1" ref={editingNameFieldRef}/>}
            </div>
            <div className="flex items-center space-x-2">
              {currentEditing && <Input defaultChecked={!currentEditing.private} type={"checkbox"} className={"p-0 w-4 h-4"} ref={editingPublicFieldRef}/>}
              <Label htmlFor="public">Make Playlist Public</Label>
            </div>
          </div>
          <DialogFooter>
            <Button className={"text-white"} disabled={submitting} onClick={() => {
              submitEdit(editingNameFieldRef.current?.value ?? "", editingPublicFieldRef.current?.checked ?? true);
            }}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={currentDeleting != null} onOpenChange={(open) => {
        if (!open) setCurrentDeleting(null);
      }}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete playlist</DialogTitle>
            <DialogDescription>
              You are about to delete <p className={"text-indigo-400 inline"}>{` ${currentDeleting ? currentDeleting?.name : "meh"} `}</p>  playlist, this cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className={"text-white"} disabled={submitting} onClick={() => {
              submitDelete(currentDeleting?.id ?? "");
            }}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Playlists</h1>
        <div className="flex items-center space-x-4">

          <Button className={"text-white"} onClick={() => {
            setCurrentCreating(true);
          }}>
            Add Playlist
          </Button>

          <Dialog open={currentCreating} onOpenChange={(open) => {
            if (!open) setCurrentCreating(false);
          }}>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Create Playlist</DialogTitle>
                <DialogDescription>
                  Enter a name for your playlist and choose if you want to make it public.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid items-center grid-cols-[auto_1fr] gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input defaultValue={""} className="col-span-1" ref={creatingNameFieldRef}/>
                </div>
                <div className="flex items-center space-x-2">
                  <Input defaultChecked={true} type={"checkbox"} className={"p-0 w-4 h-4"} ref={editingPublicFieldRef}/>
                  <Label htmlFor="public">Make Playlist Public</Label>
                </div>
              </div>
              <DialogFooter>
                <Button className={"text-white"} disabled={submitting} onClick={() => {
                  submitAdd(creatingNameFieldRef.current?.value ?? "", creatingPublicFieldRef.current?.checked ?? true);
                }}>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Input
            type="text"
            placeholder="Search playlists..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <span>Sort by</span>
                <ChevronDownIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={"bg-white"}>
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="name">Title</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="createdAt">Date Added</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
                <DropdownMenuRadioItem value="asc">Ascending</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="desc">Descending</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant={view === "grid" ? "secondary" : "outline"} onClick={() => setView("grid")}>
            <LayoutGridIcon className="w-4 h-4" />
          </Button>
          <Button variant={view === "list" ? "secondary" : "outline"} onClick={() => setView("list")}>
            <ListIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div
        className={`gap-2 grid ${
          view === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"
        }`}
      >
        {playlists.map((playlist) =>
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>

      <div className={cn(
        "flex-1 w-full h-full flex-col items-center justify-center content-center hidden",
        mPlaylists.length == 0 && "flex"
      )}>
        No playlists, maybe start adding some by clicking the &quot;Add Playlist&quot; button :)
      </div>
    </div>
  );

};

export default PlaylistsClient;