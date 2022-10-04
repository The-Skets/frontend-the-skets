import SideBar from "../../../components/admin/SideBar";
import AllComments from "../../../components/admin/comments/AllComments";

export default function Comments() {
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