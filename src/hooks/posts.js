import { setDoc, doc, collection, query, orderBy, updateDoc, arrayRemove, arrayUnion, where } from "firebase/firestore";
import { useState } from "react"
import { db } from "lib/firebase";
import { uuidv4 } from "@firebase/util";
import { useToast } from "@chakra-ui/react";
import {useCollectionData, useDocumentData} from "react-firebase-hooks/firestore"


export function useAddPost() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function addPost(post) {
    setLoading(true)
    const id = uuidv4();
    await setDoc(doc(db, "posts", id), {
      ...post,
      id,
      date: Date.now(),
      likes: [],
    });
    // popup ze post zostal zrobiony
    toast({
      title:"Post added succesfully!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });

    setLoading(false);

  }

  return { addPost, isLoading}
}

export function usePosts(uid = null) {

  
  const q = uid ? query(collection(db, "posts"), orderBy("date", "desc"), where('uid', '==', uid)) : query(collection(db, "posts"), orderBy("date", "desc")) ;
  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return {posts, isLoading}
}

export function useToggleLike({id,isLiked, uid}){
  const [isLoading, setLoading] = useState(false);


  async function toggleLike() {
    setLoading(true)
    const docRef = doc(db, "posts", id)
    await updateDoc(docRef, {
      likes: isLiked? arrayRemove(uid) : arrayUnion(uid),
    });
    setLoading(false)
  }


  return {toggleLike, isLoading}
}

export function useDeletePost(id){
  const [isLoading, setLoading] = useState(false);
  async function deletePost() {}

  return {deletePost ,isLoading};
}

export function usePost(id) {
  const q = doc(db, "posts", id)
  const [post, isLoading, error] = useDocumentData(q);
  return {post, isLoading}
}