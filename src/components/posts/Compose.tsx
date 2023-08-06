'use client'
import React, {useEffect} from 'react';
// import "@uiw/react-md-editor/markdown-editor.css";
// import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { getCodeString } from 'rehype-rewrite';
import '~/styles/w-md.css'
import katex from 'katex';
import 'katex/dist/katex.css';
import {Button} from "~/components/ui/button";
import {UploadIcon} from "lucide-react";
import {effect} from "zod";
import {Textarea} from "~/components/ui/textarea.tsx";
import {useSession} from "~/providers/supabase-provider.tsx";
import toast from "react-hot-toast";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

const codeComponent = ({ inline, children = [], className, ...props }) => {
  const txt = children[0] || '';
  if (inline) {
    if (typeof txt === 'string' && /^\$\$(.*)\$\$/.test(txt)) {
      const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, '$1'), {
        throwOnError: false,
      });
      return <code dangerouslySetInnerHTML={{ __html: html }} />;
    }
    return <code>{txt}</code>;
  }
  const code = props.node && props.node.children ? getCodeString(props.node.children) : txt;
  if (
    typeof code === 'string' &&
    typeof className === 'string' &&
    /^language-katex/.test(className.toLocaleLowerCase())
  ) {
    const html = katex.renderToString(code, {
      throwOnError: false,
    });
    return <code style={{ fontSize: '150%' }} dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <code className={String(className)}>{txt}</code>;
}

interface ComposeProps {
  type: string,
  uni: string,
  course: string,
  department: string
}

const showErrorToast = (message:string) => {
  toast.error(message, {
    position: "bottom-right"
  })
}

const Compose: React.FC<ComposeProps> = ({...props}) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const session = useSession()

  const handlePost = async () => {
    if (!title || !content) {
      showErrorToast('Neither title nor the content of the post can be empty.')
      return
    }
    const jwt = session?.access_token;
    const response = await fetch(`${process.env.NEXT_PUBLIC_EDGE_URL}/create-post`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        subtitle,
        content,
        uni: props.uni,
        department: props.department,
        course: props.course,
        post_type:props.type
      }),
    })

    const resp_json = await response.json()
    if (response.status === 200) {
      toast.success(resp_json.message, {
        position: "bottom-right"
      })
    } else showErrorToast(resp_json.error)

    // console.log(props)
  }
  return (
    <div>
      <div className='pt-7 mx-auto w-10/12 rounded-3xl mb-10'>
        <div className="flex flex-row gap-4 justify-between mb-4 items-center mx-auto">
          <h2 className="mt-7 text-2xl font-bold text-muted-foreground tracking-wide ml-1">Compose Post</h2>
          <h2 className="px-7 h-8 bg-white rounded-xl mt-2 pt-[5px] text-gray-500 font-bold tracking-wide">{props.type}</h2>
          <Button
            onClick={handlePost}
            className="
              px-7
              h-8
              rounded-xl
              bg-white
              hover:bg-accent2
              hover:text-white
              tracking-wider
              font-bold
              text-gray-500"
          ><span className=" mr-2"><UploadIcon size={18}/></span>Post</Button>
        </div>
        <div className='flex flex-row justify-evenly items-center gap-3'>
          <Textarea
            className="bg-white rounded-xl h-1 text-lg my-4 placeholder:text-gray-400 text-muted-foreground font-semibold tracking-wide focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder={'Post Title'} value={title} onChange={(e) => setTitle(e.target.value)}/>
          <Textarea
            className="bg-white rounded-xl h-1 my-4 pt-2 pl-3 placeholder:text-gray-400 text-muted-foreground font-semibold tracking-wide focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder={'Post Summary'} value={subtitle} onChange={(e) => setSubtitle(e.target.value)}/>
        </div>
        <MDEditor previewOptions={{components: {code: codeComponent}}} height={500} hideToolbar={true} preview={'live'} value={content} onChange={setContent} />
      </div>
    </div>
  );
}

export default Compose;
