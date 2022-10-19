import NavBar from '../components/NavBar'
import ProfileComments from "../components/ProfileComments";
import { PhotographIcon } from '@heroicons/react/solid'
import useStorage from "../lib/ILocalStorage";

import {useRouter} from "next/router";
import {useState} from "react";
import UploadModal from "../components/UploadModal";

export default function Profile() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function debug() {
        fetch('https://api.theskets.com/debug', {credentials: 'include'}).then((res) => res.text())
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
                    <UploadModal
                        modalIsOpen={modalIsOpen}
                        setModalIsOpen={setModalIsOpen}
                        title={"Change your profile picture"}
                        callback={() => {console.log()}}
                        buttonText={"Upload"}
                        uploadUrl={"https://api.theskets.com/v1/private/new_profile_image"}
                    />

                    <img className='object-cover mmd:ml-auto mmd:mr-auto w-48 h-48 rounded-full' src={IStorage.getObj("profile")["pfp_url"]} />
                    {/*<span className={"opacity-50 object-cover absolute bg-gray-900 object-cover mmd:ml-auto mmd:mr-auto w-48 h-48 rounded-full z-50 "+styles.editOnHover}>*/}

                    {/*<div className={"flex justify-center"}>*/}
                    {/*    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">*/}
                    {/*        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />*/}
                    {/*    </svg>*/}
                    {/*</div>*/}
                    {/*</span>*/}
                    {/*<div className={"absolute object-cover mmd:ml-auto mmd:mr-auto w-48 h-48 rounded-full z-50"}>*/}
                    {/*    <div className={"flex justify-center"}>*/}
                    {/*        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">*/}
                    {/*            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />*/}
                    {/*        </svg>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

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

                    <div className='flex justify-evenly pb-3.5 border-b pt-5'>
                        <h1 className='float-left'>Profile Picture</h1>
                        <button
                            type="button"
                            onClick={() => setModalIsOpen(true)}
                            className="mr-0 ml-auto inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <PhotographIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                            Change Image
                        </button>
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