import useSWR from "swr";
import {useRouter} from "next/router";
import CommentRow from "./CommentRow";
import {TrashIcon} from "@heroicons/react/solid";

const fetcher = url => fetch(url, {credentials: 'include'}).then(r => r.json())

export default function CommentInformation() {
    const router = useRouter();
    let { data, error } = useSWR('http://192.168.1.209:5000/v1/private/admin/get_comments?comment_id='+router.query.id, fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    const deleteComment = () => {
        fetch('http://192.168.1.209:5000/v1/private/admin/delete_comment/' + data[0].id, {
            credentials: 'include',
            method: 'DELETE'
        })
        router.back();
    }

    return (
        <>
            <div className="bg-white shadow overflow-hidden sm:rounded-md px-4 py-4 sm:px-6 mb-5">
                <div className={"flex flex-row"}>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Comment Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Information on the comment by {data[0].username}.</p>
                    </div>
                    <div className="relative w-0 flex-1 inline-flex justify-end py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                        <button
                            onClick={() => {deleteComment()}}
                        >
                            <TrashIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <div className="mt-5 border-t border-gray-200">
                    <dl className="divide-y divide-gray-200">
                        <CommentRow title={"Id"} description={data[0].id} />
                        <CommentRow title={"Author"} description={data[0].username} />
                        <CommentRow title={"Content"} description={data[0].comment_body} />
                        <CommentRow title={"Video Id"} description={data[0].video_id} />
                        <CommentRow title={"Performance Id"} description={data[0].performance_id} />
                        <CommentRow title={"Date Posted"} description={data[0].date_posted} />
                    </dl>
                </div>
            </div>
        </>
    )
}