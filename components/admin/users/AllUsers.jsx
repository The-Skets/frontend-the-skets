import useSWR from "swr";
import Link from "next/link";

const fetcher = url => fetch(url, {credentials: 'include'}).then(r => r.json())

export default function AllUsers() {
    let { data, error } = useSWR('http://192.168.1.209:5000/v1/private/admin/get_users?reversed=true&limit=0', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <>
            {data.map((user) => {
                <div key={user.username}>
                    {/* TODO: this. */}
                </div>
            })}
        </>
    )
}