import SideBar from "../../../components/admin/SideBar";
import CurrentPerformances from "../../../components/admin/performance/CurrentPerformances";

export default function Performances() {
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