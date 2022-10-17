import useSWR from 'swr';

const fetcher = url => fetch(url, {credentials: 'include'}).then(r => r.json())

import {CogIcon, PlusIcon, TrashIcon} from '@heroicons/react/solid'
import {useState} from "react";
import Link from "next/link";
import Modal from "../../Modal";

export default function CurrentPerformances() {
    let { data, error } = useSWR('http://192.168.1.209:5000/v1/private/admin/get_performances?limit=0&reversed=true', fetcher)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPerformance, setSelectedPerformance] = useState(false);

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    const deletePerformance = () => {
        fetch("http://192.168.1.209:5000/v1/private/admin/delete_performance/"+selectedPerformance.url_name, {method: "DELETE", credentials: "include"})
    }

    // EXAMPLE OBJ STRUCTURE
    //
    // data = {
    //     "name": "The Skets Live Performance 1",
    //     "date": "04/02/2022",
    //     "quality": "480p",
    //     "thumbnail_url": "https...",
    //     "url_name": "performance-1"
    //     "videos", "comments": {
    //         0: {
    //             ...
    //         },
    //         1: {
    //             ...
    //         }
    //     }
    // }

    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Modal
                setModalIsOpen={setModalIsOpen}
                modalIsOpen={modalIsOpen}
                title={`Delete ${selectedPerformance.name}?`}
                subtitle={`This will immediately delete ${selectedPerformance.name} and all its videos.`}
                callback={deletePerformance}
                buttonText={"Delete"}
                icon={
                <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-red-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </>
                }
            />
            <li
                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
            >
                <div className="flex-1 flex flex-col p-8">
                    <img className="h-32 flex-shrink-0 mx-auto rounded" src="http://192.168.1.209:5000/v1/performance_images/default.png" alt="" />
                    <h3 className="mt-6 text-gray-900 text-sm font-medium">New Performance</h3>
                    <dl className="mt-1 flex-grow flex flex-col justify-between">
                        <dt className="sr-only">Date</dt>
                        <dd className="text-gray-500 text-sm">{new Date().toLocaleString()}</dd>
                    </dl>
                </div>
                <div>
                    <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="w-0 flex-1 flex">
                            <Link href={"/admin/performances/new"}>
                                <a
                                    className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                >
                                    <PlusIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                    <span className="ml-3">Create</span>
                                </a>
                            </Link>
                        </div>
                        {/*<div className="-ml-px w-0 flex-1 flex">*/}
                        {/*    <button*/}
                        {/*        className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"*/}
                        {/*        onClick={() => {setModalIsOpen(true); setSelectedPerformance(performance)}}*/}
                        {/*    >*/}
                        {/*        <TrashIcon className="w-5 h-5 text-red-500" aria-hidden="true" />*/}
                        {/*        <span className="ml-3">Delete</span>*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </li>
            {data.map((performance) => (
                <li
                    key={performance.url_name}
                    className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
                >
                    <div className="flex-1 flex flex-col p-8">
                        <img className="h-32 flex-shrink-0 mx-auto rounded" src={performance.thumbnail_url} alt="" />
                        <h3 className="mt-6 text-gray-900 text-sm font-medium">{performance.name}</h3>
                        <dl className="mt-1 flex-grow flex flex-col justify-between">
                            <dt className="sr-only">Date</dt>
                            <dd className="text-gray-500 text-sm">{performance.date}</dd>
                        </dl>
                    </div>
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="w-0 flex-1 flex">
                                <Link href={"/admin/performances/"+performance.url_name}>
                                    <a
                                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                    >
                                        <CogIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                        <span className="ml-3">Manage</span>
                                    </a>
                                </Link>
                            </div>
                            <div className="-ml-px w-0 flex-1 flex">
                                <button
                                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                                    onClick={() => {setModalIsOpen(true); setSelectedPerformance(performance)}}
                                >
                                    <TrashIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
                                    <span className="ml-3">Delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}