import {NextRequest, NextResponse} from "next/server";
import {
  createPlaylist,
  currentUserProfile,
  deletePlaylist,
  getAllUserPlaylists,
  updatePlaylist
} from "@/lib/database-helper";

//in: name
//out: playlist object
export async function POST(request: NextRequest) {
  try {
    const { name , isPrivate } = await request.json();
    const user = await currentUserProfile();
    if (!user) {
      return new NextResponse("Unauthorized" , {status: 401});
    }

    if (!name || name.length > 512 || name.trim().length == 0) {
      return new NextResponse("Invalid Params" , {status: 402});
    }

    const playlistName = name.trim();

    const playlist = await createPlaylist(user.userId , playlistName , isPrivate);

    return NextResponse.json(playlist , {
      status: 200
    });

  } catch (error) {
    console.log("POST [api/playlist]" , error);
    return new NextResponse("Internal Error" , {status: 500, statusText: "Internal Server Error"});
  }
}

//in: -
//out: playlist[]
export async function GET(request: NextRequest) {
  try {
    const user = await currentUserProfile();
    if (!user) {
      return new NextResponse("Unauthorized" , {status: 401});
    }

    const playlists = await getAllUserPlaylists(user.userId);

    return NextResponse.json(playlists, {
      status: 200,
    });

  } catch (error) {
    console.log("GET [api/playlist]" , error);
    return new NextResponse("Internal Error" , {status: 500, statusText: "Internal Server Error"});
  }
}

//in : id, newName
//out: playlist object
export async function PATCH(request: NextRequest) {
  try {
    const { id, newName , newPrivate } = await request.json();
    const user = await currentUserProfile();
    if (!user) {
      return new NextResponse("Unauthorized" , {status: 401});
    }

    if (!newName || newName.length > 512 || newName.trim().length == 0 || !id) {
      return new NextResponse("Invalid Params" , {status: 402});
    }

    const newPlaylistName = newName.trim();

    const playlist = await updatePlaylist(user.userId , id , newPlaylistName , newPrivate);

    if (!playlist) {
      return new NextResponse("Not Found" , {status: 320});
    }

    return NextResponse.json(playlist, {
      status: 200,
    });

  } catch (error) {
    console.log("PATCH [api/playlist]" , error);
    return new NextResponse("Internal Error" , {status: 500, statusText: "Internal Server Error"});
  }
}

//in : id
//out: -
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const user = await currentUserProfile();

    if (!user) {
      return new NextResponse("Unauthorized" , {status: 401});
    }

    if (!id) {
      return new NextResponse("Invalid Params" , {status: 402});
    }

    const playlist = await deletePlaylist(user.userId , id);

    if (!playlist) {
      return new NextResponse("Not Found" , {status: 404});
    }

    return NextResponse.json({
      status: 200,
      data: "deleted",
    });

  } catch (error) {
    console.log("DELETE [api/playlist]" , error);
    return new NextResponse("Internal Error" , {status: 500, statusText: "Internal Server Error"});
  }
}