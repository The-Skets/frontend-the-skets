import { useReducer, useState, useCallback, useEffect } from 'react';
import YouTube from '@u-wave/react-youtube';
import useSWR from 'swr'

import NavBar from "../../components/NavBar";
import NextUp from "../../components/NextUp";
import Comments from "../../components/Comments";
import useStorage from "../../lib/ILocalStorage";

export default function StreamPerformance({data}) {
    const IStorage = useStorage();

    const [currentVidObj, setCurrentVidObj] = useState(0);
    const [commentState, setCommentState] = useState([]);
    const [isSSR, setIsSSR] = useState(true);

    const [user, setUser] = useState({
       logged_in: false,
       username: "",
       email: "",
       pfp_url: "",

    });

    const handleVideoEnd = () => {
        setCurrentVidObj(currentVidObj+1)
    }

    useEffect(() => {
        setIsSSR(false);
    }, []);

    useEffect(() => {
        if (!IStorage.isLoggedIn()) {
            setUser({
                logged_in: true,
                username: IStorage.getItem("profile")["username"],
                email: IStorage.getItem("profile")["email"],
                pfp_url: IStorage.getItem("profile")["pfp_url"]
            });
        }
    }, []);

    return (
        <>
            <NavBar active={"Stream"} />

            <div className='bg-gray-100 mx-5 sm:mx-20 mt-10 pb-20 rounded-lg text-black'>

                <div className='content-center mt-5 md:mt-5 mx-5 md:mx-20'>
                    <div className="aspect-w-16 aspect-h-9">
                        <YouTube
                            video={data["src"][currentVidObj]}
                            autoplay
                            onEnd={handleVideoEnd}
                            modestBranding={true}
                            showRelatedVideos={false}
                        />
                    </div>
                </div>

                <div className='flex mlg:flex-col'>
                    <div className='rounded-lg content-center p-5 mt-5 md:mt-10 mx-5 md:ml-20 xl:mr-10 md:mx-20 border-solid border-black bg-white'>
                        <h1 className='p-2 border-b border-gray-500'>Next Up</h1>
                        <div id="next-up" className='overflow-auto'>
                            <NextUp data={data} obj={currentVidObj} changeObj={setCurrentVidObj} />
                        </div>
                    </div>

                    <div className='lg:flex-grow rounded-lg content-center p-5 mt-5 md:mt-10 mx-5 md:mr-20 xl:ml-10 md:ml-20 md:mx-20 border-solid border-black bg-white'>
                        <div className='justify-between p-2 border-b border-gray-500 flex'>
                            <h1>Comments</h1>
                            {(!isSSR && window.localStorage.getItem("token")) && (
                                <></>
                            )}
                            <Comments video_id={data["url_name"][currentVidObj]} />
                        </div>

                        {/* <div className="mt-5 max-w-lg rounded-lg shadow-md shadow-blue-600/50">
                                <form action="" className="w-full p-4">
                                    <div className="mb-2">
                                    <label htmlFor="comment" className="text-lg text-gray-600">Add a comment</label>
                                    <textarea
                                        className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                                        name="comment"
                                        placeholder=""></textarea>
                                    </div>
                                    <div>
                                        <button className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded">
                                            Comment
                                        </button>
                                        <button
                                            className="px-3 py-2 text-sm text-blue-600 border border-blue-500 rounded">
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div> */}
                        <div style={{height: (!isSSR && document.getElementById("next-up").clientHeight)+"px"}} className='overflow-auto'>
                            {/* <Comments commentState={commentState} setCommentState={setCommentState} video_id={data["url_name"][currentVidObj]} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const id = context["query"];

    const videos_response = await fetch("http://127.0.0.1:5000/v1/get_video?performance_id="+id.id);
    const videos = await videos_response.json();

    console.log(videos)

    return {
        props: {
            data: videos,
        }
    }
}