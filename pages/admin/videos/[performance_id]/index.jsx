import {useRouter} from "next/router";
import {useEffect} from "react";
import useStorage from "../../../../lib/ILocalStorage";

export default function RedirectToPerformance() {
    const IStorage = useStorage();
    const router = useRouter()

    useEffect(() => {
        if (router.query.performance_id !== undefined) {
            router.push("/admin/performances/"+router.query.performance_id)
        }
    }, [router.query])

    IStorage.syncSession();

    if (!IStorage.isLoggedIn()) {
        router.push("/sign_in");
    }

    return (
        <>
        Loading
        </>
    )
}