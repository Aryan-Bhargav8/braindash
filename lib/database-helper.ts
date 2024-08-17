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

