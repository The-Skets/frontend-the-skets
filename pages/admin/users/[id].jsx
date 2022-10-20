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

    let { data, error, mutate } = useSWR('http://192.168.1.209:5000/v1/private/admin/get_users?id='+router.query.id, fetcher)

    return (
        <>
            <SideBar>
                <UserInformation data={data} error={error} mutate={mutate} />
            </SideBar>
        </>
    )
}