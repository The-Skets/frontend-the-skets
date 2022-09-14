import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Comments(props) {
    let { data, error } = useSWR('http://127.0.0.1:5000/v1/get_comments?video_id='+props.video_id+"&performance_id="+props.performance_id+"&limit="+props.limit, fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    if (data.length === undefined) {
        if (props.newComment.length > 0) {
            data = [...props.newComment.slice().reverse()];
        } else {
            return <div>No comments yet!</div>
        }
    } else {
        if (props.newComment.length > 0) {
            data = [...data.slice(0, 0), ...props.newComment.slice().reverse(), ...data.slice(0)];
        }
    }

    let comments = [];

    console.log(data);

    data.forEach((element) => {
        comments.push(
            <>
                <div key={element["username"] + element["date_posted"]} className='overflow-auto'>
                    <div className='flex mt-5 p-2 hover:bg-zinc-100'>
                        <img
                            className="h-8 w-8 rounded-full"
                            src="https://media.product.which.co.uk/prod/images/900_450/gm-f103d4c2-d1e5-4431-9be2-ed2ddaf2ed46-maincorded-vacuum-cleaner.jpg"
                            alt=""
                        />

                        <div className='flex flex-col'>
                            <h3 className='ml-5 mmd:text-xs font-bold'>{element["username"]}</h3>
                            <h3 className='ml-5 mmd:text-xs'>{element["comment_body"]}</h3>
                            <p className='ml-5 mmd:text-xs italic font-light'>{element["date_posted"]}</p>
                        </div>
                    </div>
                </div>
            </>
        )
    })

    return comments;
}