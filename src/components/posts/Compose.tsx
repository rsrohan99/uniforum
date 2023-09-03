'use client'
import React, {useState} from 'react';
// import "@uiw/react-md-editor/markdown-editor.css";
// import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import {getCodeString} from 'rehype-rewrite';
import '~/styles/w-md.css'
import katex from 'katex';
import 'katex/dist/katex.css';
import {Button} from "~/components/ui/button";
import {UploadIcon} from "lucide-react";
import {Textarea} from "~/components/ui/textarea";
import {useSession} from "~/providers/supabase-provider";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import NProgress from "nprogress";

export const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

export const codeComponent = ({ inline, children = [], className, ...props }) => {
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
  post_type: string,
  uni: string,
  course: string,
  department: string
}

export const showErrorToast = (message:string) => {
  toast.error(message, {
    position: "bottom-right"
  })
}

const Compose: React.FC<ComposeProps> = ({...props}) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const session = useSession()
  const router = useRouter()

  const handlePost = async () => {
    if (!title || !subtitle) {
      showErrorToast('Neither title nor the content of the post can be empty.')
      return
    }
    NProgress.start()
    toast.loading("Posting...", {position: "bottom-right", id: 'posting'})
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
        post_type:props.post_type,
        metadata: null
      }),
    })

    const resp_json = await response.json()
    if (response.status === 200) {
      toast.remove('posting')
      toast.success(resp_json.message, {
        position: "bottom-right"
      })
      router.push('/app')
    } else {
      toast.remove('posting')
      showErrorToast(resp_json.error)
    }

    // console.log(props)
  }
  return (
    <div>
      <div className='mx-auto mb-10 w-10/12 rounded-3xl pt-7'>
        <div className="mx-auto mb-4 flex flex-row flex-wrap items-center justify-between gap-4">
          <h2 className="mt-7 ml-1 text-2xl font-bold tracking-wide text-muted-foreground">Compose Post</h2>
          <h2 className="mt-2 h-8 rounded-xl bg-white px-7 font-bold tracking-wide text-gray-500 pt-[5px]">{props.post_type}</h2>
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
          ><span className="mr-2"><UploadIcon size={18}/></span>Post</Button>
        </div>
        <div className={`flex flex-row items-center justify-evenly gap-3 flex-wrap ${(props.post_type === 'Discussion' || props.post_type === "Q&A")? "md:flex-nowrap": ""}`}>
          <Textarea
            className="my-4 h-1 rounded-xl bg-white text-lg font-semibold tracking-wide placeholder:text-gray-400 text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder={'Post Title'} value={title} onChange={(e) => setTitle(e.target.value)}/>
          <Textarea
            className="my-4 h-1 rounded-xl bg-white pt-2 pl-3 font-semibold tracking-wide placeholder:text-gray-400 text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder={'Post Summary'} value={subtitle} onChange={(e) => setSubtitle(e.target.value)}/>
        </div>
        {(props.post_type === 'Discussion' || props.post_type === "Q&A") && (
          <MDEditor previewOptions={{components: {code: codeComponent}}} height={500} hideToolbar={true} preview={'live'} value={content} onChange={setContent} />
        )}
      </div>
    </div>
  );
}

export default Compose;
