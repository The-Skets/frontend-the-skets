import NavBar from '../../components/NavBar'
import CurrentPerformances from '../../components/admin/CurrentPerformances'

import useStorage from "../../lib/ILocalStorage";
import {useRouter} from "next/router";
import SideBar from "../../components/admin/SideBar";
import {useState} from "react";
import PageSelection from "../../components/admin/PageSelection";

export default function Dashboard() {
    const IStorage = useStorage();
    const router = useRouter();

    const [active, setActive] = useState("Dashboard")

    // IStorage.syncSession();

    // if (!IStorage.isLoggedIn()) {
    //     router.push("/sign_in");
    // } TODO: uncomment
    
    return(
        <>
            <SideBar active={"Dashboard"}>
                <PageSelection />
            </SideBar>
        </>
    )
}