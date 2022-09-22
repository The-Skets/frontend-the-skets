import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function CurrentPerformances() {
    let { data, error } = useSWR('http://192.168.1.209:5000/v1/private/admin/get_performances?limit=0', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    
    let perfs = [];

    data.forEach((element) => {
        perfs.push(
            <>
                {element.name}
            </>
        )
    })

    return(perfs)
}