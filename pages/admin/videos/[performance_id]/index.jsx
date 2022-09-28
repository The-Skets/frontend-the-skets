import {useRouter} from "next/router";
import {useEffect} from "react";

export default function RedirectToPerformance() {
    const router = useRouter()
    useEffect(() => {
        if (router.query.performance_id != undefined) {
            router.push("/admin/performances/"+router.query.performance_id)
        }
    }, [router.query])

    return (
        <>
        Loading
        </>
    )
}