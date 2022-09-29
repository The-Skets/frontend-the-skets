import InformationRow from "../InformationRow";

export default function VideoInformation({data, error}) {
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    const changeToInput = (title, newInput) => {
        fetch('http://127.0.0.1:5000/v1/private/admin/patch_video/'+data[0].performance_id+"/"+data[0].url_name, {credentials: 'include', method: 'PATCH',
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
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Video Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
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