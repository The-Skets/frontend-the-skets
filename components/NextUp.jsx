import {useCallback, useState} from "react";

export default function NextUp({data, currentVidObj, setCurrentVidObj}) {
    const [isShown, setIsShown] = useState(false);
    const [currentVid, setCurrentVid] = useState(data[currentVidObj]["name"]);

    const handleInputChange = useCallback(value => {
        setCurrentVidObj(value)
    }, [setCurrentVidObj]);

    const vidClick = (friendly_name) => {
        setCurrentVid(friendly_name);
        handleInputChange(data["friendly_name"].indexOf(friendly_name));
    }

    let next_up = [];

    data.forEach((element) => {
        // element = JSON.parse(element);
        next_up.push(
            <>
                <div key={element.url_name} onClick={() => vidClick(element.name)} onMouseEnter={() => setIsShown(element.name)} onMouseLeave={() => setIsShown("")} className='flex mt-5 pl-0 p-2 hover:bg-zinc-100'>
                    <img className='object-cover rounded w-16 h-16' src={"https://img.youtube.com/vi/"+element.src+"/mqdefault.jpg"} />
                    <div className='flex flex-col'>
                        <h3 className='ml-5 mmd:text-xs'>{element.name}</h3>
                        <p className='ml-5 mmd:text-xs italic'>The Skets</p>
                    </div>
                    <div className='mt-3.5 pl-3.5 ml-auto mr-0'>
                        {isShown != element.name && (
                            <p className='mmd:text-xs'>{element["length"]}</p>
                        )}

                        {isShown == element.name && (
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className='opacity-0'>{element["length"]}</p>
                            </button>
                        )}

                        {element == data[currentVidObj]["name"] && (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="animate-pulse h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                </svg>
                            </>
                        )}

                    </div>
                </div>
            </>
        )
    });

    return next_up;
}