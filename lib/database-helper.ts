import {
  addDoc,
  collection, deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where
} from "@firebase/firestore";
import {db} from "@/lib/firebase";
import {auth, currentUser} from "@clerk/nextjs/server";
import {uuidv4} from "@firebase/util";

export async function addToCollection(name: string, record: any){
  return addDoc(collection(db , name) , record);
}

export type ActiveUser = {
  userId: string;
  name: string;
  imageUrl: string;
  email: string;
}

export async function currentUserProfile(redirect?: boolean) : Promise<ActiveUser | null> {
  const user = await currentUser();

  if (!user) {
    if (redirect) {
      auth().redirectToSignIn();
      return null;
    }
    return null;
  }

  return await runTransaction(db , async (t) => {
    const userRef = doc(db, "users", user.id);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()){
      return {
        userId: userDoc.id,
        name: userDoc.get("name") as string,
        imageUrl: userDoc.get("imageUrl") as string,
        email: userDoc.get("email") as string,
      };
    } else {
      const newUser = {
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      };
      await setDoc(userRef, newUser);
      console.log("Creating user with ID: " + user.id);
      return {
        userId: userDoc.id,
        ...newUser,
      };
    }
  });
}

export type Playlist = {
  id: string;
  private: boolean;
  ownerId: string;
  deleted: boolean;
  createdAt: Date;
  name: string;
  cards: UserCard[];
}

export type UserCard = {
  id: string;
  playlistId: string;
  question: string;
  answer: string;
  deleted: boolean;
  createdAt: Date;
}


export async function getAllUserPlaylists(userId: string): Promise<Playlist[]> {
  const mQuery = query(
    collection(db, "playlist"),
    where("ownerId", "==", userId),
    where("deleted", "==", false)
  );

  const querySnapshot = await getDocs(mQuery);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ownerId: userId,
      deleted: false,
      createdAt: data.createdAt.toDate(),
      name: data.name,
      cards: data.cards,
      private: data.private,
    }
  });
}

export async function getPlaylist(userId: string, playlistId: string): Promise<Playlist | null> {
  const ref = doc(db, "playlist", playlistId);
  const playlist = await getDoc(ref);
  if (!playlist.exists()){
    return null; //not found
  }

  const data = playlist.data();
  if (data.private && data.ownerId != userId){
    return null; //no access
  }

  const cards = data.cards as any[];
  const mCards = cards.map((e) => {
    return {
      id: e.id,
      question: e.question,
      answer: e.answer,
      deleted: e.deleted,
      createdAt: e.createdAt.toDate(),
      playlistId: e.playlistId
    } as UserCard;
  })

  const mFinalCards = mCards.filter((e) => {
    return !e.deleted;
  })

  return {
    id: playlist.id,
    ownerId: userId,
    deleted: false,
    createdAt: data.createdAt.toDate(),
    name: data.name,
    cards: mFinalCards,
    private: data.private,
  }
}

export async function createPlaylist(userId: string, name: string , isPrivate: boolean): Promise<Playlist> {
  const newDoc = {
    name: name,
    ownerId: userId,
    deleted: false,
    createdAt: new Date(),
    private: isPrivate,
    cards: [],
  };

  const docRef = await addDoc(collection(db, "playlist"), newDoc);

  return {
    ...newDoc,
    id: docRef.id,
  }
}

export async function updatePlaylist(userId: string, playListId: string, newName?: string, newPrivate?: boolean): Promise<Playlist | null> {
  const playlistRef = doc(db, "playlist", playListId);

  const playlistDoc = await getDoc(playlistRef);
  if (!playlistDoc.exists()) {
    return null;
  }

  if (playlistDoc.data().ownerId !== userId || playlistDoc.data().deleted === true) {
    return null;
  }

  await updateDoc(playlistRef, {
    name: newName ?? playlistDoc.data().name,
    private: newPrivate ?? playlistDoc.data().private,
  });

  const updatedDoc = await getDoc(playlistRef);
  const data = updatedDoc.data();
  if (data === undefined || data === null) {
    return null;
  }

  const cards = data.cards as any[];
  const mCards = cards.map((e) => {
    return {
      id: e.id,
      question: e.question,
      answer: e.answer,
      deleted: e.deleted,
      createdAt: e.createdAt.toDate(),
      playlistId: e.playlistId
    } as UserCard;
  })

  const mFinalCards = mCards.filter((e) => {
    return !e.deleted;
  })

  return {
    id: updatedDoc.id,
    ownerId: userId,
    deleted: false,
    createdAt: data.createdAt.toDate(),
    name: data.name,
    cards: mFinalCards,
    private: data.private,
  }
}

export async function deletePlaylist(userId: string, playListId: string): Promise<boolean> {

  const playlistRef = doc(db, "playlist", playListId);
  const playlist = await getDoc(playlistRef);
  if (!playlist.exists()) {
    return false;
  }

  if (playlist.data().ownerId !== userId || playlist.data().deleted === true) {
    return false;
  }

  //delete the doc
  await updateDoc(playlistRef , {
    ...playlist.data(),
    deleted: true,
  });


  const mQuery = query(
    collection(db, "cards"),
    where("playlistId", "==", playListId),
    where("deleted", "==", false)
  );

  const querySnapshot = await getDocs(mQuery);

  for (const card of querySnapshot.docs) {
    await updateDoc(card.ref, {
      ...card.data(),
      deleted: true,
    })
  }

  return true;

}

//TODO: implement a function that finds all the user cards for the user with
//      this specific id (make sure not to return cards that are deleted)
export async function getAllUserCards(userId: string, playlistId: string): Promise<UserCard[] | null> {

  const playlistRef = doc(db, "playlist", playlistId);
  const playlistDoc = await getDoc(playlistRef);

  if (!playlistDoc.exists()){
    return null;
  }

  const data = playlistDoc.data();
  if (data.deleted){
    return null;
  }

  if (data.private && data.ownerId != userId){
    return null;
  }

  data.cards.filter((i: any) => {
    return !i.deleted; //filter deleted cards
  })

  return data.cards.map((card: any) => {
    return {
      id: card.id,
      playlistId: playlistId,  // Associate the card with the playlistId
      question: card.question, // Assuming card has a question field
      answer: card.answer,     // Assuming card has an answer field
      deleted: card.deleted ?? false,  // Handle deleted status, defaulting to false if not present
      createdAt: card.createdAt ? card.createdAt.toDate() : new Date(), // Convert Firestore timestamp to Date
    } as UserCard;
  });
}

//TODO: implement a function that updates an existing user card, changing the question to newQuestion
//      and answer to newAnswer. true if success (card is found and updated), false if failed for any reason
export async function updateUserCard(userId: string, playlistId: string, cardId: string, newQuestion: string, newAnswer: string): Promise<UserCard | null> {
  const playlistRef = doc(db, "playlist", playlistId);
  const playlistDoc = await getDoc(playlistRef);

  if (!playlistDoc.exists()) {
    return null;
  }

  const data = playlistDoc.data();

  if (data.deleted) {
    return null;
  }

  if (data.ownerId !== userId) {
    return null;
  }

  const cardIndex = data.cards.findIndex((card: any) => card.id === cardId);

  if (cardIndex === -1) {
    return null; // Card not found
  }

  if (data.cards[cardIndex].deleted) return null;

  data.cards[cardIndex].question = newQuestion;
  data.cards[cardIndex].answer = newAnswer;

  await updateDoc(playlistRef, { cards: data.cards });

  const updatedCard = data.cards[cardIndex];
  return {
    id: updatedCard.id,
    playlistId: playlistId,
    question: updatedCard.question,
    answer: updatedCard.answer,
    deleted: updatedCard.deleted ?? false,
    createdAt: updatedCard.createdAt ? updatedCard.createdAt.toDate() : new Date(),
  } as UserCard;
}

//TODO: just as the name says, delete the card with specific id, do it by setting the 'deleted' field to true.
export async function deleteUserCard(userId: string, playlistId: string, cardId: string): Promise<boolean> {
  const playlistRef = doc(db, "playlist", playlistId);
  const playlistDoc = await getDoc(playlistRef);

  // Check if the playlist document exists
  if (!playlistDoc.exists()) {
    return false;
  }

  const data = playlistDoc.data();

  if (data.deleted || data.ownerId !== userId) {
    return false;
  }

  const cardIndex = data.cards.findIndex((card: any) => card.id === cardId);

  if (cardIndex === -1) {
    return false; // Card not found
  }

  data.cards[cardIndex].deleted = true;

  await updateDoc(playlistRef, { cards: data.cards });

  return true;
}

//TODO: creates a new UserCard.
export async function addUserCard(userId: string, playlistId: string, question: string, answer: string): Promise<UserCard | null> {
  const playlistRef = doc(db, "playlist", playlistId);
  const playlistDoc = await getDoc(playlistRef);

  if (!playlistDoc.exists()) {
    return null;
  }

  const data = playlistDoc.data();

  if (data.deleted) {
    return null;
  }

  if (data.ownerId !== userId) {
    return null;
  }

  const newCard: UserCard = {
    id: uuidv4(), // Generate a unique ID for the new card
    playlistId: playlistId,
    question: question,
    answer: answer,
    deleted: false,
    createdAt: new Date(),
  };

  const updatedCards = [...data.cards, newCard];
  await updateDoc(playlistRef, { cards: updatedCards });

  return newCard;
}