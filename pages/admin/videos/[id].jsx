import {useRouter} from "next/router";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ManageVideos() {
    const router = useRouter()
    let { data, error } = useSWR('http://192.168.1.209:5000/v1/private/admin/get_performances?performance_id='+router.query.id+'&reversed=true', fetcher)

    return(
        <>
            +
        </>
    )
}