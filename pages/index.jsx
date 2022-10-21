import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NavBar from "../components/NavBar";

export default function Home() {
    return (
        <>
            <NavBar active={"Home"} />
            <body>
            <header
                className="w-full md:h-[1000px] bg-[url('/home/hero.jpg')] bg-cover bg-center flex justify-center items-center">
                <div className="flex flex-col justify-center items-center md:pb-[500px] mmd:pb-[400px] ">
                    <h1 className="text-center text-5xl text-white font-bold drop-shadow-lg">The Prospect
                        {/*<span className="text-amber-500">KINDACODE.COM</span>*/}
                    </h1>
                    {/*<p className="mt-5 text-center text-lg text-white opacity-70">This webiste is about programming and*/}
                    {/*    things like*/}
                    {/*    that</p>*/}
                    <a className="mt-8 px-12 py-3 bg-gradient-to-r from-[#a4acae] to-[#abb4b3] hover:from-[#abb4b3] hover:to-[#a4acae] text-xl text-white/70 font-semibold drop-shadow-lg rounded-full"
                       href="#">Listen</a>
                </div>
            </header>
            <div className="container p-20">
                <h1 className="text-4xl">Other Content</h1>
            </div>
            </body>
        </>
    )
}