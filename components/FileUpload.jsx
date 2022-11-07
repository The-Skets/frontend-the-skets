import {useDropzone} from 'react-dropzone';
import {useCallback} from "react";
import useStorage from "../lib/ILocalStorage";

export default function FileUpload(props) {
    const IStorage = useStorage();

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')

            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                console.log(binaryStr)

                let formData = new FormData();
                formData.append("file", file);

                fetch("https://api.theskets.com/v1/private/new_profile_image", {
                    "credentials": "include",
                    "method": "POST",
                    "body": formData
                }).then((data) => {
                    console.log(data);  // maybe necessary to sync session.
                })
                IStorage.forceSyncSession();
            }

            reader.readAsArrayBuffer(file)
        })
    }, [])

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        maxFiles: 1,
        onDrop
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
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
    );
}