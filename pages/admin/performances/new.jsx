import SideBar from "../../../components/admin/SideBar";
import NewPerformanceForm from "../../../components/admin/performance/NewPerformanceForm";

export default function NewPerformance() {
    return (
        <>
            <SideBar active={"Performances"}>
                <NewPerformanceForm />
            </SideBar>
        </>
    )
}