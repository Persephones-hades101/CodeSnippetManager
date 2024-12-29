import { db } from "@/db";
import { notFound } from "next/navigation";
import SnippetCodeEdit from "@/components/snippet-code-edit";

interface SnippetEditPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
  const resolvedParams = await props.params
  // console.log(resolvedParams);
  const id = parseInt(resolvedParams.id)

  const snippet = await db.snippet.findFirst({
    where: {
      id
    }
  })

  if (!snippet) {
    return notFound();
  }

  return (
    <SnippetCodeEdit snippet={snippet} />
  )
}