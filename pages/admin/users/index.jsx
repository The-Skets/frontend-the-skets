import SideBar from "../../../components/admin/SideBar";
import useStorage from "../../../lib/ILocalStorage";
import {useRouter} from "next/router";
import AllUsers from "../../../components/admin/users/AllUsers";

export default function Users() {
    const IStorage = useStorage()
    const router = useRouter()

    IStorage.syncSession()

    if (!IStorage.isLoggedIn()) {
        router.push("/sign_in");
    }

    if (!IStorage.isAdmin()) {
        router.push("/")
    }

    return(
        <>
            <SideBar>
                <AllUsers />
            </SideBar>
        </>
    )
}