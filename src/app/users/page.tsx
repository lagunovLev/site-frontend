'use client'
import axios from "axios";
import {server} from "@/app/hardcodedValues";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
    const [users, setUsers] = useState([]);
    const router = useRouter();

    const fetchData = () => {
        axios.get(server + "users/")
            .then(response => {
                console.log(response.data);
                setUsers(response.data.users);
            })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return <>
        <h1 className="self-center default-h1 mb-3 mt-4">Пользователи</h1>
        { users.map((item, index) => {
            return <button className="self-center flex flex-col bg-block mb-3 rounded-2xl w-6/12 pt-4 pr-5 pl-5 pb-2 text-pretty break-words min-w-96 relative" key={index}
                           onClick={() => router.push("/users/" + item._id)}>
                <p className="">{ item.fullName }</p>
            </button>
        }) }
    </>
}