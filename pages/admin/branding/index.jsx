import SideBar from "../../../components/admin/SideBar";
import AllComments from "../../../components/admin/comments/AllComments";
import {useRouter} from "next/router";
import useStorage from "../../../lib/ILocalStorage";
import BrandingInformation from "../../../components/admin/branding/BrandingInformation";
import useSWR from "swr";

const fetcher = url => fetch(url, {credentials: 'include'}).then(r => r.json())

export default function Branding() {
    let { data, error } = useSWR('https://api.theskets.com/v1/private/admin/get_branding', fetcher)

    const router = useRouter()
    const IStorage = useStorage();
    IStorage.syncSession();

    if (!IStorage.isAdmin()) {
        router.push("/")
    }

    return(
        <>
            <SideBar active={"Branding"}>
                <div className={"flex justify-center"}>
                    <BrandingInformation />
                </div>
            </SideBar>
        </>
    )
}