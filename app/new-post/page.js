

import PostForm from "@/components/post-form";
import { createPost } from "@/lib/form-action";

export default function NewPostPage() {
  
 
  return (
    <PostForm action={createPost}/>
  );
}
