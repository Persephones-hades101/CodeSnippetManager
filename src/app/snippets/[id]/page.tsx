import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteSnippet } from "@/actions";
interface SnippetShowPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  const resolvedParams = await props.params
  // console.log(resolvedParams);
  const id = parseInt(resolvedParams.id)
  const snippet = await db.snippet.findUnique({
    where: {
      id
    }
  })

  if (!snippet) {
    return notFound();
  }

  const bindedDeleteSnippet = deleteSnippet.bind(null, id)

  return (

    <div className="flex flex-col gap-5 mt-10">
      {/* <h1 className="font-bold text-white mt-3 mb-10 text-4xl bg-slate-500 p-2">Snippet Show Page </h1> */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{snippet.title}</h1>
        <div className="flex gap-10">
          <Link className="block border-2 border-blue-500 rounded p-2 w-40 text-center  font-bold" href={`/snippets/${snippet.id}/edit`}>Edit</Link >
          <form action={bindedDeleteSnippet}>
            <button className="block border-2 border-blue-500 rounded p-2 w-40 text-center  font-bold" type="submit">delete</button>
          </form>
        </div>
      </div>
      <pre className="p-5 border rounded bg-gray-400  text-xl whitespace-pre-wrap">
        <code>
          {snippet.code}
        </code>
      </pre>
      <div>
        <Link className="block border-2 border-blue-500 rounded p-2 w-40 text-center  font-bold" href={'/'}>Home</Link>
      </div>
    </div>
  )
}


export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString()
    }
  })
}