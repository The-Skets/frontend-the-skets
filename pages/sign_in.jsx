import useStorage from "../lib/ILocalStorage";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import ApiSyncSession from "../lib/ApiSyncSession";
import NavBar from "../components/NavBar";

import { LockClosedIcon } from '@heroicons/react/solid'
import API_URL from '../lib/Config';
import Link from "next/link";

export default function SignIn() {
    const router = useRouter();
    const IStorage = useStorage();

    useEffect(() => {
        if (IStorage.getItem("logged_in") === "true") {
            router.push("/profile");
        } else {
            ApiSyncSession((response) => {
                if (response["status"] === "success") {
                    console.log("session response: "+response["session"]);
                    IStorage.setItem("logged_in", "true");
                    IStorage.setObj("profile", response["session"]);
                    router.push("/profile");
                }
            })
        }
    }, [])

    const [alertVisible, setAlertVisible] = useState("hidden invisible");
    const [successVisible, setSuccessVisible] = useState("hidden invisible");
    const [alertText, setAlertText] = useState('Unknown Error');

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            checkLogin();
        }
    }

    function checkLogin() {
        fetch(API_URL+'/v1/private/sign_in', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({username: user.username, password: user.password})
        }).then(res => res.json()).then((res) => {
            if (res.status === "success") {
                setAlertVisible("hidden invisible");
                setSuccessVisible("block");
                IStorage.setItem("logged_in", "true");
                IStorage.setObj("profile", res["session"]);
                router.push("/profile");
            } else {
                setAlertVisible("block")
                setAlertText(res.message);
            }
        });
    }

    return (
        <>
            <NavBar active={"Null"} />

            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to The Skets</h2>
                    </div>

                    <div className={alertVisible}>
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error! </strong>
                            <span className="block sm:inline">{alertText}</span>

                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg onClick={() => setAlertVisible("hidden invisible")} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                            </span>
                        </div>
                    </div>

                    <div className={successVisible}>
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Success! </strong>
                            <span className="block sm:inline">Redirecting...</span>

                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg onClick={() => setSuccessVisible("hidden invisible")} className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                            </span>
                        </div>
                    </div>

                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="username" className="sr-only">
                                    Username
                                </label>

                                <input
                                    autoComplete="username"
                                    id="username"
                                    name="username"
                                    type="username"
                                    onChange={(e) => {setUser((prev)=>({...prev, username: e.target.value}))}}
                                    value={user.username}
                                    required
                                    className="appearance-none rounded-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Username"
                                />

                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    autoComplete="password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={(e) => {setUser((prev)=>({...prev, password: e.target.value}))}}
                                    onKeyDown={handleKeyDown}
                                    value={user.password}
                                    required
                                    pattern=".{6,}"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link href="/sign_up"><a className="font-medium text-indigo-600 hover:text-indigo-500">
                                    I don&apos;t have an account
                                </a></Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={checkLogin}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Sign in
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}