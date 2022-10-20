import useSWR from "swr";
import {useState} from "react";
import Link from "next/link";

const fetcher = url => fetch(url, {credentials: 'include'}).then(r => r.json())

export default function AllVideos() {
    let { data, error } = useSWR('http://192.168.1.209:5000/v1/private/admin/get_videos?reversed=true', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return(
        <>
            <div className="flex flex-col overflow-auto overflow-y-hidden">
                <div className="-my-2 sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-auto overflow-y-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Thumbnail
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Video ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Performance ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Length
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        YouTube URL
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >

                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {data.map((video) => (
                                    <tr key={video.src}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex-shrink-0">
                                                <img className="h-12 w-12 rounded-full" src={video.thumbnail_url} alt="" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{video.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900"><Link href={"/admin/videos/"+video.performance_id+"/"+video.url_name}>{video.url_name}</Link></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900"><Link href={"/admin/performances/"+video.performance_id}>{video.performance_id}</Link></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{video.length}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{"youtu.be/"+video.src}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900"><Link href={"/admin/videos/"+video.performance_id+"/"+video.url_name}>Edit</Link></td>
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