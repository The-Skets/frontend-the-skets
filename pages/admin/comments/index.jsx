import SideBar from "../../../components/admin/SideBar";
import AllComments from "../../../components/admin/comments/AllComments";
import {useRouter} from "next/router";
import useStorage from "../../../lib/ILocalStorage";

export default function Comments() {
    const router = useRouter()
    const IStorage = useStorage();
    IStorage.syncSession();

    if (!IStorage.isAdmin()) {
        router.push("/")
    }

    return(
        <>
            <SideBar active={"Comments"}>
                <div className={"flex justify-center"}>
                    <AllComments />
                </div>
            </SideBar>
        </>
    )
}