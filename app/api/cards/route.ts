import { NextRequest, NextResponse } from "next/server";
import {
  addUserCard,
  currentUserProfile,
  deleteUserCard,
  getAllUserCards,
  updateUserCard,
} from "@/lib/database-helper";

// in: playlistId, question, answer
// out: card object
export async function POST(request: NextRequest) {
  try {
    const { playlistId, question, answer } = await request.json();
    const user = await currentUserProfile();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !playlistId ||
      !question ||
      !answer ||
      question.trim().length === 0 ||
      answer.trim().length === 0 ||
      question.trim().length > 1024 ||
      answer.trim().length > 512
    ) {
      return new NextResponse("Invalid Params", { status: 402 });
    }

    const card = await addUserCard(user.userId, playlistId, question.trim(), answer.trim());

    if (!card) {
      return new NextResponse("Playlist Not Found", { status: 404 });
    }

    return NextResponse.json(card, {
      status: 200,
    });
  } catch (error) {
    console.log("POST [api/cards]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// in: playlistId
// out: card[]
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const playlistId = searchParams.get("playlistId");

    const user = await currentUserProfile();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!playlistId) {
      return new NextResponse("Invalid Params", { status: 402 });
    }

    const cards = await getAllUserCards(user.userId, playlistId);

    return NextResponse.json(cards, {
      status: 200,
    });
  } catch (error) {
    console.log("GET [api/cards]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// in: id, newQuestion, newAnswer
// out: card or null
export async function PATCH(request: NextRequest) {
  try {
    const { playlist, id, newQuestion, newAnswer } = await request.json();
    const user = await currentUserProfile();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !id ||
      !playlist ||
      !newQuestion ||
      !newAnswer ||
      newQuestion.trim().length === 0 ||
      newAnswer.trim().length === 0
    ) {
      return new NextResponse("Invalid Params", { status: 402 });
    }

    const success = await updateUserCard(user.userId, playlist, id, newQuestion.trim(), newAnswer.trim());

    if (!success) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("PATCH [api/cards]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// in: id
// out: success (boolean)
export async function DELETE(request: NextRequest) {
  try {
    const { playlist , id } = await request.json();
    const user = await currentUserProfile();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!id) {
      return new NextResponse("Invalid Params", { status: 402 });
    }

    const success = await deleteUserCard(user.userId, playlist, id);

    if (!success) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("DELETE [api/cards]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}