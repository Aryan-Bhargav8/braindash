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
import {update} from "@firebase/database";

export async function addToCollection(name: string, record: any){
  return addDoc(collection(db , name) , record);
}

type ActiveUser = {
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

type Playlist = {
  id: string;
  ownerId: string;
  deleted: boolean;
  createdAt: Date;
  name: string;
  cards: UserCard[];
}

type UserCard = {
  id: string;
  playlistId: string;
  question: string;
  answer: string;
  deleted: boolean;
  createdAt: Date;
}


export async function getAllUserPlaylists(userId: string): Promise<Playlist[]> {
  const mQuery = query(
    collection(db, "playlists"),
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
      createdAt: data.createdAt,
      name: data.name,
      cards: data.cards,
    }
  });
}

export async function createPlaylist(userId: string, name: string): Promise<Playlist> {
  const newDoc = {
    name: name,
    ownerId: userId,
    deleted: false,
    createdAt: new Date(),
    cards: [],
  };

  let docRef = doc(db, "playlists", uuidv4());
  while ((await getDoc(docRef)).exists()) { //this is the ugliest but the fastest way to do it xD
    docRef = doc(db, "playlists", uuidv4());
  }

  await setDoc(docRef, newDoc);

  return {
    ...newDoc,
    id: docRef.id,
  }
}

export async function updatePlaylist(userId: string, playListId: string, newName: string): Promise<Playlist | null> {
  const playlistRef = doc(db, "playlists", playListId);

  const playlistDoc = await getDoc(playlistRef);
  if (!playlistDoc.exists()) {
    return null;
  }

  await updateDoc(playlistRef, {
    name: newName,
  });

  const updatedDoc = await getDoc(playlistRef);
  const data = updatedDoc.data();
  if (data === undefined || data === null) {
    return null;
  }

  return {
    id: updatedDoc.id,
    ownerId: userId,
    deleted: false,
    createdAt: data.createdAt,
    name: data.name,
    cards: data.cards,
  }
}

export async function deletePlaylist(userId: string, playListId: string): Promise<boolean> {

  const playlistRef = doc(db, "playlists", playListId);
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
export async function getAllUserCards(userId: string, playlistId: string): Promise<UserCard[]> {
  return [];
}

//TODO: implement a function that updates an existing user card, changing the question to newQuestion
//      and answer to newAnswer. true if success (card is found and updated), false if failed for any reason
export async function updateUserCard(userId: string, cardId: string, newQuestion: string, newAnswer: string): Promise<UserCard | null> {
  return null;
}

//TODO: just as the name says, delete the card with specific id, do it by setting the 'deleted' field to true.
export async function deleteUserCard(userId: string, cardId: string): Promise<boolean> {
  return false;
}

//TODO: creates a new UserCard.
export async function addUserCard(userId: string, cardId: string, question: string, answer: string): Promise<UserCard | null> {
  return null;
}