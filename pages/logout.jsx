import useStorage from '../lib/ILocalStorage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import API_URL from '../lib/Config';

export default function Logout() {
    const IStorage = useStorage();

    fetch(API_URL+'/v1/private/logout', {credentials: 'include'}).then((res) => res.json()).then((data) => {
        IStorage.logout();
    });

    const router = useRouter();

    useEffect(() => {
        router.push("/")
    }, [IStorage]);

    return;
}