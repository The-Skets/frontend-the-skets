import styles from '../styles/NewComment.module.css';
import useStorage from "../lib/ILocalStorage";

export default function NewComment({data}) {
    const IStorage = useStorage();

    function textAreaAdjust(element) {
        element.target.style.height = "1px";
        element.target.style.height = (element.target.scrollHeight)+"px";
    }

    return (
        <>
            <div className={"flex justify-left flex mt-5 p-2 hover:bg-zinc-100"}>
                <img alt={"Profile Image"} className="h-8 w-8 rounded-full" src={IStorage.getObj("profile")["pfp_url"]}></img>
                <div className={"flex flex-col ml-5"}>
                    <h3 className={"font-bold"}>{IStorage.getObj("profile")["name"]}</h3>
                    <textarea onKeyDown={textAreaAdjust} rows={1} className={"rounded p-2 " + styles.textarea} placeholder={"Write a public comment"}></textarea>
                </div>
            </div>
        </>
    )
}