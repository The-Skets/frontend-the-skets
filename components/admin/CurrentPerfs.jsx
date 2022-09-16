export default function CurrentPerfs() {
    let { data, error } = useSWR('https://api.theskets.com/v1/private/admin/get_performances?limit=0', fetcher)

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