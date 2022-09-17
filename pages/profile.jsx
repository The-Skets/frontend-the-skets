import NavBar from '../components/NavBar'
import ProfileComments from "../components/ProfileComments";
import useStorage from "../lib/ILocalStorage";

import {useRouter} from "next/router";

export default function Profile() {
    function debug() {
        fetch('http://192.168.1.209:5000/debug', {credentials: 'include'}).then((res) => res.text())
        .then((data) => {
            console.log(data);
        })
    }

    const IStorage = useStorage();
    const router = useRouter();

    IStorage.syncSession();

    if (!IStorage.isLoggedIn()) {
        router.push("/sign_in");
    }

    return (
        <>
            <NavBar active={"Null"} />

            <div className='mx-5 md:mx-20 3xl:mx-96 lg:mx-30 mt-20 flex mmd:justify-center mmd:flex-col pb-5'>
                <div className='flex flex-col mmd:justify-center text-center bg-zinc-100 outline outline-1 outline-zinc-300 rounded-lg p-10 pb-24'>
                    <img className='object-cover mmd:ml-auto mmd:mr-auto w-48 h-48 rounded-full' src={IStorage.getObj("profile")["pfp_image"]}></img>
                    <h1 className='pt-5 text-xl'>{IStorage.getObj("profile")["name"]}</h1>
                    <p className='pt-5 text-zinc-500'>{IStorage.getObj("profile")["account_type"]}</p>
                </div>

                <div className='mmd:justify-center mmd:mt-5 flex md:ml-5 flex-grow flex-col bg-zinc-100 outline outline-1 outline-zinc-300 rounded-lg p-10 pb-24'>

                    <div className='flex justify-evenly pb-3.5 border-b'>
                        <h1 className='float-left'>Username</h1>
                        <p className='text-zinc-500 mr-0 ml-auto'>{IStorage.getObj("profile")["name"]}</p>
                    </div>

                    <div className='flex justify-evenly pb-3.5 border-b pt-5'>
                        <h1 className='float-left'>Email</h1>
                        <p className='text-zinc-500 mr-0 ml-auto'>{IStorage.getObj("profile")["email"]}</p>
                    </div>

                    <div className='flex mt-10 flex-col'>
                        <h1>Comments Made:</h1>

                        <div className='overflow-auto flex mt-5 p-2 hover:bg-zinc-100'>
                            <ProfileComments />
                        </div>

                    </div>
                </div>
            </div>

            <h1 onClick={() => debug()}>debug</h1>
        </>
    )
}