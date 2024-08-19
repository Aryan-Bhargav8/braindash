import React from 'react';
import PlaylistsClient from "@/app/(main)/playlists/playlists-client";
import {currentUserProfile, getPlaylist} from "@/lib/database-helper";
import CardsClient from "@/app/(main)/playlists/[id]/cards-client";

interface PlaylistProps {
  params: {
    id: string;
  };
}

const Page = async (
  {params} : PlaylistProps
) => {
  const user = await currentUserProfile(true);
  if (!user) {
    return <></>;
  }

  const playlist = await getPlaylist(user.userId , params.id);

  if (!playlist) {
    return (
      <main className={"flex-1 flex"}>
        {"Seems like this playlist doesn't exist or you don't have access to it."}
      </main>
    );
  }

  return (
    <div className={"w-full flex flex-col flex-1"}>
      <CardsClient playlist={playlist} userId={user.userId}/>
    </div>
  );
};

export default Page;