import NavBar from '../components/NavBar'
import CurrentPerfs from '../components/admin/CurrentPerfs'

export default function Dashboard() {
    const IStorage = useStorage();
    IStorage.syncSession()

    if (!IStorage.isLoggedIn()) {
        router.push("/sign_in");
    }
    
    return(
        <>
            <NavBar active={'Null'} />
            
            <div className={"flex justify-center"}>
                <CurrentPerfs />
            </div>
        </>
    )
}