import {useReducer, useState, useCallback, useEffect, useContext} from 'react';
import YouTube from '@u-wave/react-youtube';

import NavBar from "../../components/NavBar";
import NextUp from "../../components/NextUp";
import Comments from "../../components/Comments";
import useStorage from "../../lib/ILocalStorage";
import NewComment from "../../components/NewComment";

export default function Stream(data) {
    const IStorage = useStorage();
    IStorage.syncSession();

    const [currentVidObj, setCurrentVidObj] = useState(0);
    const [newComment, setNewComment] = useState([]);
    const [isSSR, setIsSSR] = useState(true);

    const addNewComment = (body) => {
        setNewComment([...newComment, body]);
    }

    const clearComments = (body) => {
        setNewComment([]);
    }

    const handleVideoEnd = () => {
        console.log("cur: "+currentVidObj.toString());
        console.log("dl: "+data.data.length.toString());
        console.log(data.data);
        if (currentVidObj < (data.data.length - 1)) { setCurrentVidObj(prev => Number(prev) + 1) }
        console.log("curAfter: "+currentVidObj.toString());
        console.log(data.data[currentVidObj]);
    }

    useEffect(() => {
        setIsSSR(false);
    }, []);

    console.log("cur!: "+currentVidObj.toString());

    return (
        <>
            <NavBar active={"Stream"} />

            <div className='bg-gray-100 mt-5 pt-5 mx-5 sm:mx-20 mt-10 pb-20 rounded-lg text-black'>

                <div className='content-center mt-5 md:mt-5 mx-5 md:mx-20'>
                    <div className="aspect-w-16 aspect-h-9">
                        <YouTube
                            video={data.data[currentVidObj]["src"]}
                            autoplay
                            onEnd={handleVideoEnd}
                            modestBranding={true}
                            showRelatedVideos={false}
                            annotations={false}
                        />
                    </div>
                </div>

                <div className='flex mxlg:flex-col'>
                    <div className='rounded-lg content-center p-5 mt-5 md:mt-10 mx-5 md:ml-20 xl:mr-10 md:mx-20 border-solid border-black bg-white'>
                        <h1 className='p-2 border-b border-gray-500'>Next Up</h1>
                        <div id="next-up" className='overflow-auto'>
                            <NextUp data={data.data} currentVidObj={currentVidObj} setCurrentVidObj={setCurrentVidObj} />
                        </div>
                    </div>

                    <div className='lg:flex-grow rounded-lg content-center p-5 mt-5 md:mt-10 mx-5 md:mr-20 xl:ml-10 md:ml-20 md:mx-20 border-solid border-black bg-white'>
                        <div className='p-2 border-b border-gray-500 flex'>
                            <h1>Comments</h1>
                        </div>

                        {(!isSSR && IStorage.isLoggedIn()) && (
                            <NewComment video_id={data.data[currentVidObj]["url_name"]} performance_id={data.perf_id} addNewComment={addNewComment} />
                        )}

                        <div style={{height: (!isSSR && document.getElementById("next-up").clientHeight)+"px"}} className='overflow-auto'>
                            <Comments video_id={data.data[currentVidObj]["url_name"]} performance_id={data.perf_id} limit="0" newComment={newComment} clearComments={clearComments} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const id = context["query"];
    let perf_id = id.id;

    const videos_response = await fetch("http://127.0.0.1:5000/v1/get_video?performance_id="+perf_id);
    const videos = await videos_response.json();

    console.log(videos)

    return {
        props: {
            data: videos,
            perf_id: perf_id
        }
    }
}