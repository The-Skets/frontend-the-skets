import SideBar from "../../../../components/admin/SideBar";

import {useRouter} from "next/router";
import useSWR from "swr";
import VideoInformation from "../../../../components/admin/videos/VideoInformation";
import CommentsDetailed from "../../../../components/admin/videos/CommentsDetailed";
import useStorage from "../../../../lib/ILocalStorage";

const fetcher = url => fetch(url, {credentials: 'include'}).then(r => r.json())

export default function ManageVideos() {
    const router = useRouter()
    const IStorage = useStorage()

    IStorage.syncSession();

    if (!IStorage.isLoggedIn()) {
        router.push("/sign_in");
    }

    if (!IStorage.isAdmin()) {
        router.push("/")
    }
    
    let { data, error, mutate } = useSWR('http://192.168.1.209:5000/v1/private/admin/get_videos?performance_id='+router.query.performance_id+'&video_id='+router.query.id, fetcher)

    return(
        <>
            <SideBar active={"Videos"}>
                <VideoInformation data={data} error={error} mutate={mutate} />
                <CommentsDetailed data={data} error={error} />
            </SideBar>
        </>
    )
}