'use client'
import { Editor } from '@monaco-editor/react'
import { Snippet } from '@prisma/client'
import { useState } from 'react'

import { updateEditedCode } from '@/actions'

interface SnippetCodeEditProps {
  snippet: Snippet
}
export default function SnippetCodeEdit({ snippet }: SnippetCodeEditProps) {

  const [code, setCode] = useState(snippet.code)
  const handleEditorChange = (value: string = '') => {
    setCode(value)
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   await updateEditedCode(snippet.id, code)
  // }

  const bindedUpdateEditedCode = updateEditedCode.bind(null, snippet.id, code);

  return (
    <div>
      <Editor
        className='mt-5'
        height="80vh"
        theme='vs-dark'
        language='python'
        defaultValue={snippet.code}
        options={{
          minimap: { enabled: false },
          fontSize: 24,
          lineHeight: 30
        }}
        onChange={handleEditorChange}
      />
      <form action={bindedUpdateEditedCode}>
        <button type='submit' className="block border-2 border-blue-500 rounded mt-5 p-2 w-40 text-center  font-bold">Save</button>
      </form>

    </div>
  )
}