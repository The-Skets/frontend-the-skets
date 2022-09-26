import useSWR from "swr";
import {CheckCircleIcon, ChevronRightIcon, MailIcon} from "@heroicons/react/solid";
import {useRouter} from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function PerformancesDetailed() {
    const router = useRouter()
    let { data, error } = useSWR('http://192.168.1.209:5000/v1/private/admin/get_performances?performance_id='+router.query.id+'&reversed=true', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

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
    //             length,
    //             name
    //             src
    //             thumbnail_url
    //             url_name
    //         },
    //         1: {
    //             ...
    //         }
    //     }
    // }

    console.log(data);

    let videos = [];

    return(
        <>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divid-e-y divide-gray-200">
                    {data[0]["videos"].map((video) => ( // TODO: figure out what is wrong with this
                        <li key={video.url_name}>
                            <a href="application.href" className="block hover:bg-gray-50">
                                <div className="flex items-center px-4 py-4 sm:px-6">
                                    <div className="min-w-0 flex-1 flex items-center">
                                        <div className="flex-shrink-0">
                                            <img className="h-12 w-12 rounded-full" src={video.thumbnail_url} alt="" />
                                        </div>
                                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                            <div>
                                                <p className="text-sm font-medium text-indigo-600 truncate">{video.name}</p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                                    <MailIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    <span className="truncate">application.applicant.email</span>
                                                </p>
                                            </div>
                                            <div className="hidden md:block">
                                                <div>
                                                    <p className="text-sm text-gray-900">
                                                        Applied on
                                                    </p>
                                                    <p className="mt-2 flex items-center text-sm text-gray-500">
                                                        <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                                                        application.stage
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}