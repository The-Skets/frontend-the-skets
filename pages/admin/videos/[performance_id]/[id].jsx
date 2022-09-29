import SideBar from "../../../../components/admin/SideBar";

import {useRouter} from "next/router";
import useSWR from "swr";
import VideoInformation from "../../../../components/admin/videos/VideoInformation";
import CommentsDetailed from "../../../../components/admin/videos/CommentsDetailed";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ManageVideos() {
    const router = useRouter()
    let { data, error } = useSWR('http://127.0.0.1:5000/v1/private/admin/get_videos?performance_id='+router.query.performance_id+'&video_id='+router.query.id, fetcher)

    return(
        <>
            <SideBar active={"Videos"}>
                <VideoInformation data={data} error={error} />
                <CommentsDetailed data={data} error={error} />
            </SideBar>
        </>
    )
}