import InformationRow from "../InformationRow";
import InformationRowReadOnly from "../InformationRowReadOnly";

export default function PerformanceInformation({data, error}) {
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    console.log(data);

    const changeToInput = (title, newInput) => {
        fetch('http://192.168.1.209:5000/v1/private/admin/patch_user/'+data[0].id, {credentials: 'include', method: 'PATCH',
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
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about {data[0].username}.</p>
                </div>
                <div className="mt-5 border-t border-gray-200">
                    <dl className="divide-y divide-gray-200">
                        <InformationRowReadOnly title={"ID"} description={data[0].id} />
                        <InformationRowReadOnly title={"Username"} description={data[0].username} changeToInput={changeToInput} />
                        <InformationRowReadOnly title={"Email"} description={data[0].email} changeToInput={changeToInput} />
                        <InformationRow title={"Account Type"} description={data[0].account_type} changeToInput={changeToInput} />
                        <InformationRowReadOnly title={"Date Joined"} description={data[0].date_joined} changeToInput={changeToInput} />
                    </dl>
                </div>
            </div>
        </>
    )
}