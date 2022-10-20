import SideBar from "../../../components/admin/SideBar";
import { CheckCircleIcon, ChevronRightIcon, MailIcon } from '@heroicons/react/solid'

import useSWR from 'swr';
import VideosDetailed from "../../../components/admin/performance/VideosDetailed";
import {useRouter} from "next/router";
import PerformanceInformation from "../../../components/admin/performance/PerformanceInformation";
import useStorage from "../../../lib/ILocalStorage";

const fetcher = url => fetch(url, {credentials: 'include'}).then(r => r.json())

export default function ManagePerformance() {
    const router = useRouter()
    const IStorage = useStorage()

    IStorage.syncSession();

    if (!IStorage.isLoggedIn()) {
        router.push("/sign_in");
    }

    if (!IStorage.isAdmin()) {
        router.push("/")
    }

    let { data, error, mutate } = useSWR('http://192.168.1.209:5000/v1/private/admin/get_performances?performance_id='+router.query.id+'&reversed=true', fetcher)

    return(
        <>
            <SideBar active={"Performances"}>
                <PerformanceInformation data={data} error={error} mutate={mutate} />
                <VideosDetailed data={data} error={error} />
            </SideBar>
        </>
    )
}