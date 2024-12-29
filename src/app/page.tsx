import { db } from "@/db";
import Link from "next/link";




export default async function Home() {

  const snippets = await db.snippet.findMany()

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
        className="flex justify-between items-center border-2 border-red-400 rounded p-2 text-2xl"
      >
        <div>{snippet.title}</div>
        <div>view</div>
      </Link>
    );
  })

  return (
    <div>
      <h1 className="font-bold text-white mt-3 mb-10 text-4xl bg-slate-500 p-2">Home - <span className="text-3xl font-normal">All snippet Shows Here</span></h1>
      <div className="flex justify-between items-center mb-5">
        <Link className="border-2 border-blue-500 rounded p-2 w-50 font-bold" href={'/snippets/new'}>Create New Snippet</Link>
      </div>
      <div className="flex flex-col gap-4">
        {renderedSnippets}
      </div>
    </div>
  );
}
