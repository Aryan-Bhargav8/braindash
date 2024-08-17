import {addDoc, collection} from "@firebase/firestore";
import {db} from "@/lib/firebase";


export async function addToCollection(name: string, record: any){
  return addDoc(collection(db , name) , record);
}
