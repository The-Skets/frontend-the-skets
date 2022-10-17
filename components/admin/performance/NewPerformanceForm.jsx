import {useState} from "react";
import {useRouter} from "next/router";

export default function NewPerformanceForm() {
    const router = useRouter();

    const [alertText, setAlertText] = useState('Unknown Error');
    const [alertVisible, setAlertVisible] = useState("hidden invisible");

    function submitForm(e) {
        e.preventDefault();
        fetch('http://192.168.1.209:5000/v1/private/admin/new_performance', {
            method: 'POST',
            credentials: 'include',
            body: new FormData(e.target)
        }).then(r => {
            if (r.status === 200 || r.status === 204) {
                router.push("/admin/performances/");
            } else {
                setAlertVisible("block")
                setAlertText(r.json().message);
            }
        });
    }

    return (
        <form onSubmit={submitForm} className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">New Performance</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Add a new performance from a YouTube playlist.
                        </p>
                    </div>

                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                YouTube Playlist URL
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <div className="">
                                    <input
                                        type="text"
                                        name="playlist"
                                        id="playlist"
                                        autoComplete="none"
                                        placeholder="https://youtube.com/playlist"
                                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="friendly-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Friendly Name
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="friendly-name"
                                    id="friendly-name"
                                    autoComplete="none"
                                    placeholder={"The Skets Live Performance 1"}
                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="url-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                URL Name
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="url-name"
                                    id="url-name"
                                    autoComplete="none"
                                    placeholder={"performance-1"}
                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="date-of-performance" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Date of performance
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="date-of-performance"
                                    id="date-of-performance"
                                    autoComplete="none"
                                    placeholder={"22/04/2022"}
                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="quality" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Quality
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="quality"
                                    id="quality"
                                    autoComplete="none"
                                    placeholder={"1080p"}
                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Thumbnail
                            </label>
                            <div className="sm:col-span-2 sm:mt-1">
                                <input id="file-upload" name="file-upload" type="file" />
                            </div>
                        </div>

                        <div className={alertVisible}>
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">Error! </strong>
                                <span className="block sm:inline">{alertText}</span>

                                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg onClick={() => setAlertVisible("hidden invisible")} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                            </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={router.back}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    )
}