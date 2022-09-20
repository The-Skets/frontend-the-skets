import NavBar from '../../components/NavBar'

import CurrentPerformances from '../../components/admin/CurrentPerformances'

import useStorage from "../lib/ILocalStorage";
import {useRouter} from "next/router";

export default function Dashboard() {
    const IStorage = useStorage();
    const router = useRouter();

    IStorage.syncSession();

    if (!IStorage.isLoggedIn()) {
        router.push("/sign_in");
    }
    
    return(
        <>
            <NavBar active={'Null'} />
            
            <div className={"flex justify-center"}>
                <CurrentPerformances />
            </div>
        </>
    )
}