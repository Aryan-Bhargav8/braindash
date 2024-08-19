"use client";
import React, {useState} from 'react';
import {useOrigin} from "@/hooks/use-origin";
import {Card, CardContent} from "@/components/ui/card";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Edit2, Globe, Trash2} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import Image from "next/image";
import {StatefulPlaylist} from "@/app/(main)/playlists/playlists-client";

const PlaylistCard = (
  {
    playlist,
    handleEdit,
    handleDelete,
  } : {
    playlist: StatefulPlaylist,
    handleEdit: (playlist: StatefulPlaylist) => void,
    handleDelete: (playlist: StatefulPlaylist) => void,
  }
) => {
  const [Copy, setCopy] = useState(false);
  const origin = useOrigin();

  return <Card className="overflow-hidden">
    <Link href={`/playlists/${playlist.id}`} className="block" prefetch={false}>
      <CardContent className={cn(
        "p-4 group",
        playlist.state != 'idle' && "opacity-20",
      )}>
        <div className={"flex w-full"}>
          <h3 className="text-lg font-bold line-clamp-2 overflow-ellipsis">{playlist.name}</h3>
          <div className={"ml-auto group-hover:opacity-100 opacity-0 transition-all flex flex-row"}>

            <Button size="icon" className="mr-2" variant={"ghost"} onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleEdit(playlist);
            }}>
              <Edit2 className="w-4 h-4 text-green-300" />
            </Button>

            <Button size="icon" className="" variant={"ghost"} onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDelete(playlist);
            }}>
              <Trash2 className="w-4 h-4 text-red-400" />
            </Button>
          </div>
        </div>
        <div className="text-gray-500 mt-2 flex w-full items-center content-center justify-center">
          {playlist.cards.length} items
          <Tooltip delayDuration={100}>
            <TooltipContent>
              This play list is {playlist.private ? "private" : "public"}.
              <div className='inline-block ml-2 content-center items-center' onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setCopy(true);
                navigator.clipboard.writeText(`${origin}/playlists/${playlist.id}`);
                setTimeout(() => setCopy(false), 3000);
              }}>
                <Image
                  src={Copy ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                  width={18}
                  height={18}
                  alt='copy'
                />
              </div>
            </TooltipContent>
            <TooltipTrigger>
              <Globe className={cn(
                "h-4 w-4 ml-2 text-indigo-400",
                playlist.private && "text-red-400"
              )}/>
            </TooltipTrigger>
          </Tooltip>
          <p className={"ml-auto text-black/50"}>{playlist.createdAt.toDateString()}</p>
        </div>
      </CardContent>
    </Link>
  </Card>;
};

export default PlaylistCard;