'use client'
import React, {useState} from 'react';
import '~/styles/w-md.css'
import 'katex/dist/katex.css';
import {Button} from "~/components/ui/button";
import {Cross, UploadIcon, XCircle} from "lucide-react";
import {Textarea} from "~/components/ui/textarea";
import {useSession} from "~/providers/supabase-provider";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import NProgress from "nprogress";
import {Input} from "~/components/ui/input";


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

const ComposePoll: React.FC<ComposeProps> = ({...props}) => {
  // const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>([])
  const [newPollOption, setNewPollOption] = useState<string>("")
  // const [subtitle, setSubtitle] = useState("");
  const session = useSession()
  const router = useRouter()

  const handlePost = async () => {
    if (!title) {
      showErrorToast('Title of the post cannot be empty.')
      return
    }
    if (pollOptions.length === 0) {
      showErrorToast('Please add at least one poll option')
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
        subtitle: "",
        content: "",
        uni: props.uni,
        department: props.department,
        course: props.course,
        post_type:props.post_type,
        metadata: {
          isOpen: true,
          currentPolls: pollOptions.map(pollOption => ({option: pollOption, count: 0}))
        }
      }),
    })

    const resp_json = await response.json()
    if (response.status === 200) {
      toast.remove('posting')
      toast.success(resp_json.message, {
        position: "bottom-right"
      })
      router.push('/app')
    } else showErrorToast(resp_json.error)

    // console.log(props)
  }
  return (
    <div>
      <div className='mx-auto mb-10 w-10/12 rounded-3xl pt-7'>
        <div className="mx-auto mb-4 flex flex-row flex-wrap items-center justify-between gap-4">
          <h2 className="mt-7 ml-1 text-2xl font-bold tracking-wide text-muted-foreground">Create Poll</h2>
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
        <div className={`flex flex-col gap-3 flex-wrap ${(props.post_type === 'Discussion' || props.post_type === "Q&A")? "md:flex-nowrap": ""}`}>
          <Textarea
            className="my-4 h-1 rounded-xl bg-white text-lg font-semibold tracking-wide placeholder:text-gray-400 text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder={'Poll Title'} value={title} onChange={(e) => setTitle(e.target.value)}/>
          <div className="text-muted-foreground font-semibold text-lg mb-2 tracking-wide">Add Poll Options:</div>
          {pollOptions.map((pollOption, index) => (
            <div key={index} className="flex flex-row gap-3 items-center text-muted-foreground font-medium tracking-wide">
              <span>{index+1}. {pollOption}</span>
              <XCircle
                onClick={() => {
                  setPollOptions(pollOptions.filter((_,idx)=>idx!==index))
                }}
                size={18} className="text-muted-foreground hover:text-accent2 cursor-pointer"/>
            </div>
          ))}
          <div className="flex flex-row gap-2 items-center mt-4 flex-wrap">
            <Input
              className="bg-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl w-min ml-[-6px] text-muted-foreground"
              placeholder="Add Poll Option" value={newPollOption} onChange={(e) => setNewPollOption(e.target.value)} />
            <Button
              className="px-7 h-8 rounded-xl bg-accent2 text-white tracking-wider font-bold focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-accent2 hover:text-white"
              onClick={() => {
                if (pollOptions.includes(newPollOption)) {
                  showErrorToast("Poll Option already exists")
                  return
                }
                if (!newPollOption) {
                  showErrorToast("Poll Option cannot be empty")
                  return;
                }
                setPollOptions([...pollOptions, newPollOption])
                setNewPollOption("")
              }}
              type="submit">Add</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComposePoll;