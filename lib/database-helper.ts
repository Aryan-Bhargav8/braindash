import {addDoc, collection, doc, getDoc, runTransaction, setDoc} from "@firebase/firestore";
import {db} from "@/lib/firebase";
import {auth, currentUser} from "@clerk/nextjs/server";

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


type UserCard = {
  ownerId: string;
  cardId: string;
  question: string;
  answer: string;
  deleted: boolean;
  createdAt: Date;
}

//TODO: implement a function that finds all the user cards for the user with
//      this specific id (make sure not to return cards that are deleted)
export async function getAllUserCards(userId: string): Promise<UserCard[]> {
  return [];
}

//TODO: implement a function that updates an existing user card, changing the question to newQuestion
//      and answer to newAnswer. true if success (card is found and updated), false if failed for any reason
export async function updateUserCard(userId: string, cardId: string, newQuestion: string, newAnswer: string): Promise<boolean> {
  return false;
}

//TODO: just as the name says, delete the card with specific id, do it by setting the 'deleted' field to true.
export async function deleteUserCard(userId: string, cardId: string): Promise<boolean> {
  return false;
}

//TODO: creates a new UserCard.
export async function addUserCard(userId: string, cardId: string, question: string, answer: string): Promise<UserCard | null> {
  return null;
}