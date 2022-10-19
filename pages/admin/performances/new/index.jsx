import SideBar from "../../../../components/admin/SideBar";
import NewPerformanceForm from "../../../../components/admin/performance/new/NewPerformanceForm";

export default function NewPerformance() {
    return (
        <>
            <SideBar active={"Performances"}>
                <NewPerformanceForm />
            </SideBar>
        </>
    )
}