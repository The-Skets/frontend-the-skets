import useStorage from '../lib/ILocalStorage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Logout() {
    const IStorage = useStorage();

    fetch('http://127.0.0.1:5000/v1/private/logout', {credentials: 'include'}).then((res) => res.json()).then((data) => {
        IStorage.logout();
    });

    const router = useRouter();

    useEffect(() => {
        router.push("/")
    })

    return;
}