import useSWR from 'swr'

const fetcher = url => fetch(url, {credentials: 'include'}).then(r => r.json())
let videoIdOfSentComment = "";

export default function Comments(props) {
    let { data, error } = useSWR('https://api.theskets.com/v1/get_comments?video_id='+props.video_id+"&performance_id="+props.performance_id+"&limit="+props.limit, fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    console.log("vid: "+videoIdOfSentComment);

    if (data.length === undefined) {
        if (props.newComment.length > 0) {
            if (videoIdOfSentComment !== props.video_id) {
                videoIdOfSentComment = props.video_id;
                props.clearComments();
                return <div>No comments yet!</div>
            } else {
                data = [...props.newComment.slice().reverse()];
            }
        } else {
            return <div>No comments yet!</div>
        }
    } else {
        if (videoIdOfSentComment !== props.video_id) {
            props.clearComments();
            videoIdOfSentComment = props.video_id;
        } else {
            if (props.newComment.length > 0) {
                data = [...data.slice(0, 0), ...props.newComment.slice().reverse(), ...data.slice(0)];
            }
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
                            className="h-8 w-8 rounded-full object-cover"
                            src={`https://api.theskets.com/v1/pfp/${element["username"]}.jpg`}
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