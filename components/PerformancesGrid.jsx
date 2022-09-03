import Link from "next/link";

import styles from '../styles/Stream.module.css'

export default function PerformancesGrid({data}) {
    let performancesGrid = [];

    data.forEach((element) => {
        performancesGrid.push(
            <div key={element["url_name"]}>
                <div className='rounded-lg w-full bg-white px-4 py-5'>
                    <div className='bg-white rounded-xl shadow-template p-3 mb-5 relative'>

                        <Link href={'/stream/'+element["url_name"]}>
                            <a>
                                <span className={styles.perfImageContainer}>
                                    <img alt={element["name"]} className={'rounded w-full ' + styles.perfImg} src={element["thumbnail_url"]} decoding="async"></img>
                                </span>
                            </a>
                        </Link>

                        <div className='pt-4 pb-6 px-3 sm:px-4 md:px-2 xl:px-[15px]'>

                            <div className='flex flex-wrap space-x-3 items-center mb-2'>
                                <button className='flex items-center text-base font-semibold text-blue-500 capitalize'>

                                    <span className='pr-1'>
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                      </svg>
                                    </span>

                                    {element["quality"]}

                                </button>
                            </div>

                            <Link href={'/stream/'+element["url_name"]}>
                                <a>
                                    <h3 className='font-semibold text-xl text-black hover:text-blue-500 mb-2'>{element["name"]}</h3>
                                </a>
                            </Link>

                            <p className='italic font-400 text-base text-body-color mb-5'>{element["date"]}</p>

                        </div>

                    </div>
                </div>
            </div>
        )
    });

    return (performancesGrid);
}