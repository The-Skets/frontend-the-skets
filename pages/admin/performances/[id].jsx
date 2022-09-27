import SideBar from "../../../components/admin/SideBar";
import { CheckCircleIcon, ChevronRightIcon, MailIcon } from '@heroicons/react/solid'

import useSWR from 'swr';
import PerformancesDetailed from "../../../components/admin/PerformancesDetailed";
import {useRouter} from "next/router";
import PerformanceInformation from "../../../components/admin/PerformanceInformation";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const applications = [
    {
        applicant: {
            name: 'Ricardo Cooper',
            email: 'ricardo.cooper@example.com',
            imageUrl:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        date: '2020-01-07',
        dateFull: 'January 7, 2020',
        stage: 'Completed phone screening',
        href: '#',
    },
    {
        applicant: {
            name: 'Kristen Ramos',
            email: 'kristen.ramos@example.com',
            imageUrl:
                'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        date: '2020-01-07',
        dateFull: 'January 7, 2020',
        stage: 'Completed phone screening',
        href: '#',
    },
    {
        applicant: {
            name: 'Ted Fox',
            email: 'ted.fox@example.com',
            imageUrl:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        date: '2020-01-07',
        dateFull: 'January 7, 2020',
        stage: 'Completed phone screening',
        href: '#',
    },
]

export default function ManagePerformance(context) {
    const router = useRouter()
    let { data, error } = useSWR('http://192.168.1.209:5000/v1/private/admin/get_performances?performance_id='+router.query.id+'&reversed=true', fetcher)

    return(
        <>
            <SideBar active={"Performances"}>
                <PerformanceInformation data={data} error={error} />
                <PerformancesDetailed data={data} error={error} />
            </SideBar>
        </>
    )
}