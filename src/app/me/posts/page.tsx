'use client'
import {useStore} from "@/app/store/store";
import axios from "axios";
import {server} from "@/app/hardcodedValues";
import {useEffect, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function Home() {
    const token = useStore(state => state.token);
    const [posts, setPosts] = useState([]);
    const router = useRouter()

    const fetchData = () => {
        axios.get(server + "auth/posts/", { headers: { Authorization: token } })
            .then(response => {
                setPosts(response.data.posts);
            })
    }

    useEffect(() => {
        fetchData();
    }, [token]);

    const deletePost = (id) => {
        axios.delete(server + "auth/posts/" + id, { headers: { Authorization: token } })
            .then(response => {

            })
        setTimeout(fetchData, 100);
    }

    return <>
        <h1 className="self-center default-h1 mb-3 mt-4">Мои статьи</h1>
        { posts.map((item, index) => {
            const max_length = 500;
            item.text = item.text.trim();
            if (item.text.length >= max_length)
                item.text = item.text.slice(0, max_length - 3) + "...";
            const id = item._id;

            return <article className="self-center flex flex-col bg-block mb-3 rounded-2xl w-6/12 pt-4 pr-5 pl-5 pb-2 text-pretty break-words min-w-96 relative" key={index}>
                <p className="self-center default-h2">{ item.title }</p>
                <p className="">{ item.text }</p>
                <button className="default-button w-48 self-center p-1" onClick={() => { router.push("/me/posts/" + id) }}>Читать полностью</button>
                <button className="absolute w-7 h-7 bg-button rounded right-3 top-3" onClick={() => router.push("/me/posts/edit/" + id)}>
                    <Image
                        alt="edit"
                        src="/edit.png"
                        fill
                        quality={100}
                    />
                </button>
                <button className="absolute w-7 h-7 bg-button rounded right-12 top-3" onClick={() => deletePost(id)}>
                    <Image
                        alt="edit"
                        src="/trash.png"
                        fill
                        quality={100}
                    />
                </button>
            </article>
        }) }
        <button className="default-button w-5/12 self-center min-w-96 mt-2" onClick={() => router.push("/me/posts/add/")}>Добавить статью</button>
    </>
}