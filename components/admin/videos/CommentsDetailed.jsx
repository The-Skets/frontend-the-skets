import useSWR from "swr";
import {CheckCircleIcon, ChevronRightIcon, ClockIcon, TrashIcon} from "@heroicons/react/solid";
import {useRouter} from "next/router";
import Link from "next/link";
import {useState} from "react";

// const fetcher = (...args) => fetch(...args, {credentials: 'include'}).then((res) => res.json());
const fetcher = url => fetch(url, {credentials: 'include'}).then(r => r.json())

export default function CommentsDetailed() {
    const router = useRouter()
    let { data, error } = useSWR('https://api.theskets.com/v1/get_comments?performance_id='+router.query.performance_id+'&video_id='+router.query.id, fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    if (Object.keys(data).length === 0) {
        return <div>No comments yet!</div>
    }
    
    return(
        <>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divid-e-y divide-gray-200">
                    {data.map((comment) => (
                        <li key={comment.username}>
                            <Link href={"/admin/comments/"+comment.id} >
                                <a className="block hover:bg-gray-50">
                                    <div className="flex items-center px-4 py-4 sm:px-6">
                                        <div className="min-w-0 flex-1 flex items-center">
                                            <div className="flex-shrink-0">
                                                {/*<img className="h-12 w-12 rounded-full" src={video.thumbnail_url} alt="" />*/}
                                            </div>
                                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                <div>
                                                    <p className="text-sm font-medium text-indigo-600 truncate">{comment.username}</p>
                                                    <p className="mt-2 flex items-center text-sm text-gray-500">
                                                        {/*<span className="truncate">{video.length}</span>*/}
                                                    </p>
                                                </div>
                                                <div className="hidden md:block">
                                                    <div>
                                                        <p className="mt-2 flex items-center text-sm text-gray-500">
                                                            <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                                                            {comment.comment_body}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"flex flex-row"}>
                                            {/*<button type={"button"} onClick={() => setModalIsOpen(true)}><TrashIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-500 z-50" aria-hidden="true" /></button>*/}
                                            <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}