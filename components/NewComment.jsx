import styles from '../styles/NewComment.module.css';
import useStorage from "../lib/ILocalStorage";
import {useState} from "react";

export default function NewComment(data) {
    const IStorage = useStorage();
    const [message, setMessage] = useState("")

    function textAreaAdjust(element) {
        element.target.style.height = "1px";
        element.target.style.height = (element.target.scrollHeight)+"px";

        setMessage(element.target.value);
    }

    function addComment() {
        fetch('http://127.0.0.1:5000/v1/private/add_comment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({video_id: data.video_id, performance_id: data.performance_id, comment_body: message})
        }).then(res => res.json()).then((res) => {
            if (res.status === "success") {
                let currentDate = new Date();

                let date_string = currentDate.getDay().toString() + "-" + currentDate.getMonth().toString() + "-" + currentDate.getFullYear().toString() + " " + currentDate.getHours().toString()
                + ":" + currentDate.getMinutes().toString() + ":" + currentDate.getSeconds().toString();

                setMessage("");
                data.addNewComment({
                    "comment_body": message,
                    "date_posted": date_string,
                    "username": IStorage.getObj("profile")["name"]
                });
            } else {
                //TODO: Handle this error
            }
        });
    }

    return (
        <>
            <div className={"flex justify-left flex mt-5 p-2 hover:bg-zinc-100"}>
                <img alt={"Profile Image"} className="h-8 w-8 rounded-full" src={IStorage.getObj("profile")["pfp_url"]}></img>
                <div className={"flex flex-col ml-5"}>
                    <h3 className={"font-bold"}>{IStorage.getObj("profile")["name"]}</h3>
                    <div className={"flex flex-row"}>
                        <textarea value={message} onChange={textAreaAdjust} rows={1} className={"rounded p-2 " + styles.textarea} placeholder={"Write a comment"}></textarea>
                        <button onClick={addComment} className={"ml-5 inline-block px-6 py-2.5 bg-blue-600 text-white text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}