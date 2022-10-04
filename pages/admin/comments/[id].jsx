import SideBar from "../../../components/admin/SideBar";
import CommentInformation from "../../../components/admin/comments/CommentInformation";

export default function ManageComment() {

    return(
        <>
            <SideBar active={"Comments"}>
                <CommentInformation />
            </SideBar>
        </>
    )
}