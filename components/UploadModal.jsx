import useStorage from "../lib/ILocalStorage";
import {useDropzone} from 'react-dropzone';
import {useCallback, useState} from "react";

export default function UploadModal({modalIsOpen, setModalIsOpen, title, uploadUrl, buttonText}) {
    const IStorage = useStorage();
    const [file, setFile] = useState("");

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            setFile(file);
        })
    }, [])

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        maxFiles: 1,
        onDrop
    });

    const uploadFile = () => {
        if (file == "") {
            return;
        }

        let formData = new FormData();
        formData.append("file", file);

        fetch(uploadUrl, {
            "credentials": "include",
            "method": "POST",
            "body": formData
        }).then((data) => {
            console.log(data);  // to ensure session is synced.
        })
        IStorage.forceSyncSession();
    }

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <>
            {modalIsOpen ? (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div
                        className="fixed inset-0 w-full h-full bg-black opacity-40"
                        onClick={() => setModalIsOpen(false)}
                    ></div>
                    <div className="flex items-center min-h-screen px-4 py-8">
                        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                            <div className="mt-3 sm:flex">
                                {/*<div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">*/}
                                {/*    /!*{icon}*!/*/}
                                {/*</div>*/}
                                <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                    <h4 className="text-lg font-medium text-gray-800">
                                        {title}
                                    </h4>

                                    <button
                                        type="button"
                                        className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <section className="container">
                                            <div {...getRootProps({className: 'dropzone'})}>
                                                <input {...getInputProps()} />
                                                <p>Drag n drop some files here, or click to select files</p>
                                            </div>
                                            <aside>
                                                <h4>Files</h4>
                                                <ul>{files}</ul>
                                            </aside>
                                        </section>
                                    </button>

                                    <div className="items-center gap-2 mt-3 sm:flex">
                                        <button
                                            className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-500 focus:ring-2"
                                            onClick={() => {
                                                    uploadFile();
                                                    setModalIsOpen(false);
                                                }
                                            }
                                        >
                                            {buttonText}
                                        </button>
                                        <button
                                            className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                            onClick={() =>
                                                setModalIsOpen(false)
                                            }
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ): null}
        </>
    )
}