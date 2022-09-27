/* This example requires Tailwind CSS v2.0+ */
import { PaperClipIcon } from '@heroicons/react/solid'
import PerformanceInformationRow from "./PerformanceInformationRow";

export default function PerformanceInformation({data, error}) {
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    console.log(data);

    const changeToInput = (title, newInput) => {
        fetch('http://192.168.1.209:5000/v1/private/admin/patch_performance/'+data[0].url_name, {credentials: 'include', method: 'PATCH',
            body: JSON.stringify({
                "patching": title,
                "new_value": newInput
            })})
        .then((res) => res.json())
    }

    return (
        <>
            <div className="bg-white shadow overflow-hidden sm:rounded-md px-4 py-4 sm:px-6 mb-5">
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Performance Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                </div>
                <div className="mt-5 border-t border-gray-200">
                    <dl className="divide-y divide-gray-200">
                        <PerformanceInformationRow title={"Name"} description={data[0].name} changeToInput={changeToInput} />
                        <PerformanceInformationRow title={"Thumbnail URL"} description={data[0].thumbnail_url} changeToInput={changeToInput} />
                        <PerformanceInformationRow title={"Date"} description={data[0].date} changeToInput={changeToInput} />
                        <PerformanceInformationRow title={"Quality"} description={data[0].quality} changeToInput={changeToInput} />
                    </dl>
                </div>
            </div>
        </>
    )
}