'use client'
import axios from "axios";
import {server} from "@/app/hardcodedValues";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useStore} from "@/app/store/store";


export default function Home({ params }: { params: { id: string } }) {
    const router = useRouter();
    const token = useStore(state => state.token);
    const post_id = params.id;
    const [post, setPost] = useState({
        title: "",
        text: "",
        author: {
            _id: "",
            fullName: ""
        }
    });

    const fetchData = () => {
        axios.get(server + "posts/" + post_id)
            .then(response => {
                setPost(response.data.post);
            })
    }

    const deletePost = () => {
        axios.delete(server + "auth/posts/" + post_id, { headers: { Authorization: token } })
            .then(response => {

            })
        router.back();
    }

    useEffect(fetchData, [post_id]);

    return <>
        <h1 className="self-center default-h1 mb-3 mt-4">{ post.title }</h1>
        <div className="self-center w-6/12 text-pretty break-words">
            <p className="">{ post.text }</p>
            <div className="mt-9">
                <button className="default-button mr-4" onClick={() => router.push("/me/posts/edit/" + post_id)}>Изменить</button>
                <button className="default-button" onClick={deletePost}>Удалить</button>
            </div>
        </div>
    </>
}