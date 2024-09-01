'use client'
import {useStore} from "@/app/store/store";
import {useRouter} from "next/navigation";
import {useState} from "react";
import axios from "axios";
import {server} from "@/app/hardcodedValues";

export default function Home() {
    const token = useStore(state => state.token);
    const router = useRouter();
    const [post, setPost] = useState({});

    const sendPost = () => {
        axios.post(server + "posts/", post, { headers: { Authorization: token } })
            .then(response => {

            })
        router.back();
    }

    const setTitle = (value) => {
        setPost({ ...post, title: value })
    }

    const setText = (value) => {
        setPost({ ...post, text: value })
    }

    return <>
        <h1 className="self-center default-h1 mb-3 mt-4">Добавить статью</h1>
        <div className="self-center">
            <div className="flex flex-row mb-2 justify-between"><label>Заголовок:</label><input type="text" className="default-input-text-small w-80 ml-5" onChange={text => setTitle(text.target.value)}/></div>
            <div className="flex flex-row mb-2 justify-between"><label>Текст:</label><textarea rows={15} cols={40} className="default-textarea" onChange={text => setText(text.target.value)}/></div>
            <button className="default-button mt-9" onClick={sendPost}>Создать</button>
        </div>
    </>
}