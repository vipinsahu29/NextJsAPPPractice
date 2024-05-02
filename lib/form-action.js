"use server";
import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation";

import { uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
export async function createPost(prevState, formData) {
  //form action function

  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");
  let errors = [];
  if (!title || title.trim().length === 0) {
    errors.push("Title is required.");
  }
  if (!content || title.trim().length === 0) {
    errors.push("Content is required.");
  }
  if (!image || image.size === 0) {
    errors.push("Image is required.");
  }
  if (errors.length > 0) {
    return { errors };
  }
  let imageUrl;
  try {
     imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error("Image upload fails, try again");
  }
  console.log("-->",imageUrl)
  storePost({
    imageUrl: imageUrl,
    title,
    content,
    userId: 1,
  });
  revalidatePath('/','layout')
  redirect("/feed");
}
