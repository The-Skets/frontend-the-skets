import InformationRow from "../InformationRow";
import UploadModal from "../../UploadModal";
import {useState} from "react";
import {PhotographIcon} from "@heroicons/react/solid";

export default function PerformanceInformation({data, error}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    console.log(data);

    const changeToInput = (title, newInput) => {
        fetch('https://api.theskets.com/v1/private/admin/patch_performance/'+data[0].url_name, {credentials: 'include', method: 'PATCH',
            body: JSON.stringify({
                "patching": title,
                "new_value": newInput
            })})
        .then((res) => res.json())
    }

    return (
        <>
            <UploadModal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                title={`Change the thumbnail for ${data[0].name}`}
                callback={() => {console.log()}}
                buttonText={"Upload"}
                uploadUrl={"https://api.theskets.com/v1/private/new_performance_image?performance_id="+data[0].url_name}
            />
            <div className="bg-white shadow overflow-hidden sm:rounded-md px-4 py-4 sm:px-6 mb-5">
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Performance Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about {data[0].name}.</p>
                </div>
                <div className="mt-5 border-t border-gray-200">
                    <dl className="divide-y divide-gray-200">
                        <InformationRow title={"Name"} description={data[0].name} changeToInput={changeToInput} />

                        <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">Thumbnail</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <button
                                    type="button"
                                    onClick={() => setModalIsOpen(true)}
                                    className="mr-0 ml-auto inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <PhotographIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                    Change Image
                                </button>
                                <span className="ml-4 flex-shrink-0">
                            </span>
                            </dd>
                        </div>

                        <InformationRow title={"Date"} description={data[0].date} changeToInput={changeToInput} />
                        <InformationRow title={"Quality"} description={data[0].quality} changeToInput={changeToInput} />
                    </dl>
                </div>
            </div>
        </>
    )
}