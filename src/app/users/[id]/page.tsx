'use client'
import axios from "axios";
import {server} from "@/app/hardcodedValues";
import {useEffect, useState} from "react";
import {useStore} from "@/app/store/store";
import {useRouter} from "next/navigation";

export default function Home({ params }: { params: { id: string } }) {
    const me_id = useStore(state => state.user_id);
    const router = useRouter();
    const user_id = params.id;
    const [user, setUser] = useState({
        fullName: "",
        email: ""
    });

    const fetchData = () => {
        axios.get(server + "users/" + user_id)
            .then(response => {
                console.log(response.data);
                if (response.data.user._id == me_id)
                    router.replace("/me");
                setUser(response.data.user);
            })
    }

    useEffect(fetchData, [user_id]);

    return <>
        <h1 className="self-center default-h1 mb-3 mt-4">Информация о пользователе</h1>
        <div className="self-center w-6/12 text-pretty break-words">
            <p className="">Имя: { user.fullName }</p>
            <p className="">Почта: { user.email }</p>
        </div>
    </>
}