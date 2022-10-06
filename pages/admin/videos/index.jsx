import SideBar from "../../../components/admin/SideBar";
import AllVideos from "../../../components/admin/videos/AllVideos";
import {useRouter} from "next/router";
import useStorage from "../../../lib/ILocalStorage";

export default function Videos() {
    const router = useRouter()
    const IStorage = useStorage();
    IStorage.syncSession();

    if (!IStorage.isAdmin()) {
        router.push("/")
    }

    return (
        <>
            <SideBar active={"Videos"}>
                    <AllVideos />
            </SideBar>
        </>
    )
}