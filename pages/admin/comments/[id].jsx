import SideBar from "../../../components/admin/SideBar";
import CommentInformation from "../../../components/admin/comments/CommentInformation";
import useStorage from "../../../lib/ILocalStorage";
import {useRouter} from "next/router";

export default function ManageComment() {
    const router = useRouter()
    const IStorage = useStorage();
    IStorage.syncSession();

    if (!IStorage.isAdmin()) {
        router.push("/")
    }

    return(
        <>
            <SideBar active={"Comments"}>
                <CommentInformation />
            </SideBar>
        </>
    )
}