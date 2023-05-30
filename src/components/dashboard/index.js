import { Box, Button, Heading, HStack, Textarea } from "@chakra-ui/react";
import Postlist from "components/post/Postlist";
import { useAuth } from 'hooks/auth';
import { useAddPost, usePosts } from 'hooks/posts';
import React from 'react'
import { useForm } from 'react-hook-form';


function NewPost(){
  const {register, handleSubmit, reset} = useForm();
  const {addPost, isLoading: addingPost} =  useAddPost();
  const {user, usLoading: authLoading} = useAuth();



  function handleAddPost(data) {
    addPost({
      uid: user.id,
      text: data.text,
    });
    reset();
  }

  return (<Box maxW="600px" mx="auto" py="10">
      <form onSubmit={handleSubmit(handleAddPost)}>
          <HStack justify={'space-between'}>
            <Heading size={"lg"} >New post</Heading>
            <Button colorScheme='teal' type="submit" isLoading={ authLoading || addingPost }>Post</Button>
            
          </HStack>
          <Textarea  resize={'none'}
          mt={"5"}
          placeholder='create a new post'
          {...register("text", {required: true})}
          />
      </form>
    </Box>
  )
}

export default function Dashboard() {
 const {posts, isLoading} = usePosts();

 if (isLoading) return "Loading posts...."

  return (
    <>
      <NewPost />
      <Postlist posts={posts}/>
    </>
    
    
  )
}
