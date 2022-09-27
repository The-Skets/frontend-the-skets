import SideBar from "../../../components/admin/SideBar";
import { CheckCircleIcon, ChevronRightIcon, MailIcon } from '@heroicons/react/solid'

import useSWR from 'swr';
import VideosDetailed from "../../../components/admin/performance/VideosDetailed";
import {useRouter} from "next/router";
import PerformanceInformation from "../../../components/admin/performance/PerformanceInformation";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ManagePerformance() {
    const router = useRouter()
    let { data, error } = useSWR('http://192.168.1.209:5000/v1/private/admin/get_performances?performance_id='+router.query.id+'&reversed=true', fetcher)

    return(
        <>
            <SideBar active={"Performances"}>
                <PerformanceInformation data={data} error={error} />
                <VideosDetailed data={data} error={error} />
            </SideBar>
        </>
    )
}