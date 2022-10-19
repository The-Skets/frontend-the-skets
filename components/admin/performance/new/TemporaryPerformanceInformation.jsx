import InformationRowReadOnly from "../../InformationRowReadOnly";

export default function PerformanceInformation({data, error}) {
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    console.log(data);

    return (
        <>
            <div className="bg-white shadow overflow-hidden sm:rounded-md px-4 py-4 sm:px-6 mb-5">
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Confirm Performance Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{data[0].name} is not public. Please edit and publish.</p>
                </div>
                <div className="mt-5 border-t border-gray-200">
                    <dl className="divide-y divide-gray-200">
                        <InformationRowReadOnly title={"Name"} description={data[0].name} />
                        <InformationRowReadOnly title={"Date"} description={data[0].date} />
                        <InformationRowReadOnly title={"Quality"} description={data[0].quality} />
                    </dl>
                </div>
            </div>
        </>
    )
}