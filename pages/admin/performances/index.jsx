import SideBar from "../../../components/admin/SideBar";
import CurrentPerformances from "../../../components/admin/performance/CurrentPerformances";
import useStorage from "../../../lib/ILocalStorage";
import {useRouter} from "next/router";

export default function Performances() {
    const IStorage = useStorage()
    const router = useRouter()

    IStorage.syncSession();

    if (!IStorage.isLoggedIn()) {
        router.push("/sign_in");
    }

    return(
        <>
            <SideBar active={"Performances"}>
                <div className={"flex justify-center"}>
                    <CurrentPerformances />
                </div>
            </SideBar>
        </>
    )
}