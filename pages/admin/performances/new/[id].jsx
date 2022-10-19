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
        router.push("/sign_in");
    }

    if (!IStorage.isAdmin()) {
        router.push("/")
    }

    let { data, error } = useSWR('http://192.168.1.209:5000/v1/private/admin/get_temporary_performance?performance_id='+router.query.id, fetcher)

    return (
        <SideBar active={"Performances"}>
            <TemporaryPerformanceInformation data={data} error={error} />
            {data ? data[0]["videos"].map((video) => (
                <VideoInformation key={video.url_name} data={video} error={false} isNew={true}/>
            )): "Loading..."}
        </SideBar>
    )
}