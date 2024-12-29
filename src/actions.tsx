'use server'
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { redirect } from "next/navigation";

// server action for creating a new snippet
export async function createSnippet(formState: { message: string }, formData: FormData) {
  'use server';


  try {

    const title = formData.get('title');
    const code = formData.get('code');

    if (typeof title != 'string' || title.length < 3) {
      return {
        message: "Error: Give a Longer Title!!!"
      }
    }
    if (typeof code != 'string' || code.length < 10) {
      return {
        message: "Error: Give a Longer Code Snippet!!!"
      }
    }

    await db.snippet.create({
      data: {
        title, code
      }
    })



  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message
      }
    }
    else {
      return {
        message: "Something Went Wrong!!!"
      }
    }
  }

  revalidatePath('/')
  redirect("/")

}


// server action for updating a snippet
export const updateEditedCode = async (snippetId: number, code: string) => {

  await db.snippet.update({
    where: {
      id: snippetId
    },
    data: {
      code
    }
  });

  // console.log(updatedRecord)
  // return updatedRecord;
  revalidatePath(`/snippets/${snippetId}`)
  redirect(`/snippets/${snippetId}`)

}



// server action for deleting a snippet
export const deleteSnippet = async (id: number) => {
  await db.snippet.delete({
    where: {
      id
    }
  })

  revalidatePath('/')
  redirect("/")
}
