import React from 'react';
import {createPlaylist, currentUserProfile, getAllUserPlaylists} from "@/lib/database-helper";
import PlaylistsClient from "@/app/(main)/playlists/playlists-client";

const Page = async () => {
  const user = await currentUserProfile(true);
  if (!user) return <></>;

  const playlists = await getAllUserPlaylists(user.userId);

  return (
    <main className={"flex-1"}>
      <PlaylistsClient playlists={playlists}/>
    </main>
  );
};

export default Page;