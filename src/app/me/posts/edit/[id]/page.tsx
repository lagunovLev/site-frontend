'use client'
import {useStore} from "@/app/store/store";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {server} from "@/app/hardcodedValues";

export default function Home({ params }: { params: { id: string } }) {
    const token = useStore(state => state.token);
    const router = useRouter();
    const [post, setPost] = useState({});
    const post_id = params.id;

    const fetchData = () => {
        axios.get(server + "posts/" + post_id)
            .then(response => {
                setPost(response.data.post);
                console.log(response);
            })
    }

    const saveChanges = () => {
        axios.put(server + "posts/" + post_id, { post: post }, { headers: { Authorization: token } })
            .then(response => {

            })
        router.back();
    }

    useEffect(fetchData, [post_id]);

    return <>
        <h1 className="self-center default-h1 mb-3 mt-4">Изменить пост</h1>
        <div className="self-center">
            <div className="flex flex-row mb-2 justify-between"><label>Заголовок:</label><input type="text" className="default-input-text-small w-96 ml-5" defaultValue={post.title} onChange={text => post.title = text.target.value}/></div>
            <div className="flex flex-row mb-2 justify-between"><label>Текст:</label><textarea rows={15} cols={40} className="default-textarea" defaultValue={post.text} onChange={text => post.text = text.target.value}/></div>
            <button className="default-button mt-9" onClick={saveChanges}>Сохранить</button>
        </div>
    </>
}