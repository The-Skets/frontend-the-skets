import SideBar from "../../../../components/admin/SideBar";
import TemporaryPerformanceInformation from "../../../../components/admin/performance/new/TemporaryPerformanceInformation";
import {useRouter} from "next/router";
import useStorage from "../../../../lib/ILocalStorage";
import useSWR from "swr";
import VideoInformation from "../../../../components/admin/videos/VideoInformation";

const fetcher = url => fetch(url, {credentials: 'include'}).then(r => r.json())

export default function NewPerformanceConfirm() {
    const router = useRouter();
    const IStorage = useStorage()

    IStorage.syncSession();

    if (!IStorage.isLoggedIn()) {
        router.push("/sign_in")
    }

    if (!IStorage.isAdmin()) {
        router.push("/")
    }

    const publishPerformance = () => {
        fetch('http://192.168.1.209:5000/v1/private/admin/publish_temporary_performance?performance_id='+data[0].url_name, {credentials: 'include'}).then((res) => res.json())
        .then((data) => {
            if (data["status"] === "success") {
                router.push("/admin/performances")
            } else {
                console.log(data["message"])
            }
        })
    }

    let { data, error, mutate } = useSWR('http://192.168.1.209:5000/v1/private/admin/get_temporary_performance?performance_id='+router.query.id, fetcher)

    if (data) {
        if (data["message"] == "Performance does not exist.") {
            mutate()
        }
    }

    return (
        <SideBar active={"Performances"}>
            <TemporaryPerformanceInformation data={data} error={error} />
            {data && data["status"] !== "failure" ? data[0]["videos"].map((video) => (
                <>
                    <VideoInformation key={video.url_name} data={video} error={error} isNew={true} mutate={mutate} />
                </>
            )): "Loading..."}
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
                        type="button"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={publishPerformance}
                    >
                        Publish
                    </button>
                </div>
            </div>
        </SideBar>
    )
}