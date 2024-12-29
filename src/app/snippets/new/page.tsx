'use client'
import { createSnippet } from "@/actions";
import Link from "next/link";
import { useActionState } from "react";
export default function CreateNewSnippet() {

  const [formState, action] = useActionState(createSnippet, { message: "" })

  return (
    <form action={action}>
      <h3 className="font-bold text-white mt-3 mb-10 text-4xl bg-slate-500 p-2">Create New Snippets</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4  items-center">
          <label htmlFor="title" className="w-12 text-xl font-bold">Title</label>
          <input
            id="title"
            name="title"
            className="border-2 border-solid border-red-500 rounded p-2 w-full"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="code" className="w-12 text-xl font-bold">Code</label>
          <textarea

            id="code"
            name="code"
            className="border-2 border-solid border-red-500 rounded p-2 w-full h-80"
          />
        </div>
        {formState.message.length !== 0 ? (
          <div className="font-bold text-2xl  bg-red-300 border-2 rounded-lg p-2  shadow-lg">
            {formState.message}
          </div>
        ) : null}


        <button type="submit" className="rounded p-2 bg-blue-200 font-bold">Create</button>
        <div>
          <Link className="block border-2 border-blue-500 rounded p-2 w-40 text-center  font-bold" href={'/'}>Home</Link>
        </div>
      </div>

    </form>
  )
}