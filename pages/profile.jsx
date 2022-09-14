import NavBar from '../components/navbar'
import ProfileComments from "../components/ProfileComments";

import API_URL from '../lib/Config';

export default function Profile() {
    function debug() {
        fetch(API_URL+'/debug', {credentials: 'include'}).then((res) => res.text())
        .then((data) => {
            console.log(data);
        })
    }

    return (
        <>
            <NavBar active={"Null"} />

            <div className='mx-5 md:mx-20 3xl:mx-96 lg:mx-30 mt-20 flex mmd:justify-center mmd:flex-col pb-5'>
                <div className='flex flex-col mmd:justify-center text-center bg-zinc-100 outline outline-1 outline-zinc-300 rounded-lg p-10 pb-24'>
                    <img className='object-cover mmd:ml-auto mmd:mr-auto w-48 h-48 rounded-full' src="https://media.product.which.co.uk/prod/images/900_450/gm-f103d4c2-d1e5-4431-9be2-ed2ddaf2ed46-maincorded-vacuum-cleaner.jpg"></img>
                    <h1 className='pt-5 text-xl'>Carter</h1>
                    <p className='pt-5 text-zinc-500'>Admin</p>
                </div>

                <div className='mmd:justify-center mmd:mt-5 flex md:ml-5 flex-grow flex-col bg-zinc-100 outline outline-1 outline-zinc-300 rounded-lg p-10 pb-24'>

                    <div className='flex justify-evenly pb-3.5 border-b'>
                        <h1 className='float-left'>Username</h1>
                        <p className='text-zinc-500 mr-0 ml-auto'>carter</p>
                    </div>

                    <div className='flex justify-evenly pb-3.5 border-b pt-5'>
                        <h1 className='float-left'>Email</h1>
                        <p className='text-zinc-500 mr-0 ml-auto'>carterannandale@gmail.com</p>
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