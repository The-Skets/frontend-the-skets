import SideBar from "../../../../components/admin/SideBar";
import NewPerformanceForm from "../../../../components/admin/performance/new/NewPerformanceForm";
import useStorage from "../../../../lib/ILocalStorage";

export default function NewPerformance() {
    const IStorage = useStorage()

    IStorage.syncSession();

    if (!IStorage.isLoggedIn()) {
        router.push("/sign_in")
    }

    if (!IStorage.isAdmin()) {
        router.push("/")
    }
    return (
        <>
            <SideBar active={"Performances"}>
                <NewPerformanceForm />
            </SideBar>
        </>
    )
}