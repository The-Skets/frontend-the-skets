import NavBar from '../../components/NavBar'
import PerformancesGrid from "../../components/PerformancesGrid";

export default function Page({data}) {
    return (
        <>
            <NavBar active={"Stream"} />

            <div className="mx-5 sm:mx-20 mt-10 pb-20 rounded-lg">
                <div className='p-8'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'>
                        <PerformancesGrid data={data} />
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getStaticProps(context) {
    const res = await fetch("http://127.0.0.1:5000/v1/get_performances?reversed=true")
    const data = await res.json()

    return {
        props: {data},
        revalidate: 30
    }
}