import useStorage from "../../lib/ILocalStorage";
import {useRouter} from "next/router";
import SideBar from "../../components/admin/SideBar";
import PageSelection from "../../components/admin/PageSelection";

export default function Dashboard() {
    const IStorage = useStorage();
    const router = useRouter();
    IStorage.syncSession();

    if (!IStorage.isLoggedIn()) {
        router.push("/sign_in");
    }

    return(
        <>
            <SideBar active={"Dashboard"}>
                <PageSelection />
            </SideBar>
        </>
    )
}