import {useState} from "react";

export default function InformationRowReadOnly({title, description}) {
    return(
        <>
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">{title}</dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">{description}</span>
                        <span className="ml-4 flex-shrink-0">
                                <button
                                    type="button"
                                    disabled
                                    className="bg-white rounded-md font-medium text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => setChangeValues(!changeValues)}
                                >
                                  Edit
                                </button>
                            </span>
                    </dd>
            </div>
        </>
    )
}