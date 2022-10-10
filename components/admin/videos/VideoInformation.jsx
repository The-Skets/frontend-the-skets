import InformationRow from "../InformationRow";
import Modal from "../../Modal";
import {useState} from "react";

export default function VideoInformation({data, error}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    const changeToInput = (title, newInput) => {
        fetch('http://192.168.1.209:5000/v1/private/admin/patch_video/'+data[0].performance_id+"/"+data[0].url_name, {credentials: 'include', method: 'PATCH',
            body: JSON.stringify({
                "patching": title,
                "new_value": newInput
            })})
            .then((res) => res.json())
    }

    const deleteVideo = () => {
        fetch('http://192.168.1.209:5000/v1/private/admin/delete_video/'+data[0].performance_id+"/"+data[0].url_name, {
            credentials: 'include',
            method: 'DELETE'
        })
        router.back();
    }

    return (
        <>
            <Modal 
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                title={`Delete ${data[0].name}?`}
                subtitle={`This will immediately delete ${data[0].name} and all its videos.`}
                callback={deleteVideo}
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
            <div className="bg-white shadow overflow-hidden sm:rounded-md px-4 py-4 sm:px-6 mb-5">
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Video Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                </div>
                <div className="relative w-0 flex-1 inline-flex justify-end py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                        <button
                            onClick={() => {setModalIsOpen(true)}}
                        >
                            <TrashIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
                        </button>
                    </div>
                <div className="mt-5 border-t border-gray-200">
                    <dl className="divide-y divide-gray-200">
                        <InformationRow title={"Name"} description={data[0].name} changeToInput={changeToInput} />
                        <InformationRow title={"Thumbnail URL"} description={data[0].thumbnail_url} changeToInput={changeToInput} />
                        <InformationRow title={"Performance"} description={data[0].performance_id} changeToInput={changeToInput} />
                        <InformationRow title={"Length"} description={data[0].length} changeToInput={changeToInput} />
                        <InformationRow title={"YouTube Video"} description={"https://youtu.be/"+data[0].src} changeToInput={changeToInput} />
                    </dl>
                </div>
            </div>
        </>
    )
}