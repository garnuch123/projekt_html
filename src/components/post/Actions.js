import { Flex, IconButton } from "@chakra-ui/react"
import {FaRegHeart, FaHeart, faRegCom, FaRegComment, FaTrash} from "react-icons/fa"
import { useAuth } from "hooks/auth";
import { useToggleLike, useDeletePost } from "hooks/posts";
import { Link } from "react-router-dom";
import { PROTECTED } from "lib/routes";

export default function Actions({post}) {
  const { id, likes} = post;
  const {user, isLoading: userLoading} = useAuth()
  const isLiked = likes.includes(user?.id)

  const {toggleLike, isLoading: likeLoading} = useToggleLike({id, 
    isLiked, 
    uid: user?.id });
  const {deletePost, isLoading: deleteLoading} = useDeletePost(id)


  return (
      <Flex alignItems={"center"} p={"2"}>
        <IconButton 
        size="md"
        onClick={toggleLike}
        isLoading={ likeLoading || userLoading}
        colorScheme="red"
        variant={"ghost"}
        icon={isLiked ? <FaHeart /> : <FaRegHeart/>}
        isRound/>
        {likes.length}
      

      
        <IconButton
        // ikona komentarzy
        as={Link} 
        to={`${PROTECTED}/comments/${post.id}`}
        size="md"
        //onClick={toggleLike}
        //isLoading={ likeLoading || userLoading}
        colorScheme="ghost"
        variant={"ghost"}
        icon={<FaRegComment />}
        isRound/>
        5
      

        
        <IconButton
        // ikona usuwania
        ml="auto"
        size="md"
        onClick={deletePost}
        isLoading = {deleteLoading}
        colorScheme="red"
        variant={"ghost"}
        icon={<FaTrash />}
        isRound/>
        5
      
    </Flex>
  )
}