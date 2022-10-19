import {useRouter} from "next/router";
import useStorage from "../../../lib/ILocalStorage";
import SideBar from "../../../components/admin/SideBar";
import UserInformation from "../../../components/admin/users/UserInformation";
import useSWR from "swr";

const fetcher = url => fetch(url, {credentials: 'include'}).then(r => r.json())

export default function ManageUser() {
    const router = useRouter();
    const IStorage = useStorage();
    IStorage.syncSession();

    if (!IStorage.isAdmin()) {
        router.push("/")
    }

    let { data, error } = useSWR('https://api.theskets.com/v1/private/admin/get_users?id='+router.query.id, fetcher)

    return (
        <>
            <SideBar>
                <UserInformation data={data} error={error} />
            </SideBar>
        </>
    )
}