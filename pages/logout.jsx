import useStorage from '../lib/ILocalStorage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Logout() {
    const IStorage = useStorage();

    fetch('https://api.theskets.com/v1/private/logout', {credentials: 'include'}).then((res) => res.json()).then((data) => {
        IStorage.logout();
    });

    const router = useRouter();

    useEffect(() => {
        router.push("/")
    }, [IStorage]);

    return;
}