import {useRouter} from "next/router";
import useSWR from "swr";
import {useState} from "react";
import Link from "next/link";
import {ChevronDownIcon, TrashIcon} from '@heroicons/react/solid'

const fetcher = url => fetch(url, {credentials: 'include'}).then(r => r.json())

export default function AllComments() {
    const [limit, setLimit] = useState(0);
    let { data, error } = useSWR('http://192.168.1.209:5000/v1/private/admin/get_comments?limit='+limit.toString(), fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return(
        <>
            <div className="flex flex-col overflow-auto">
                <div className="-my-2 sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-auto border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Author
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Content
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Video Id
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Performance Id
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Date Posted
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {data.map((comment) => (
                                    <tr key={comment.date_posted}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900"><Link href={"/admin/comments/"+comment.id}>{comment.id}</Link></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comment.username}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comment.comment_body}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900"><Link href={"/admin/videos/"+comment.performance_id+"/"+comment.video_id}>{comment.video_id}</Link></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900"><Link href={"/admin/performances/"+comment.performance_id}>{comment.performance_id}</Link></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comment.date_posted}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}