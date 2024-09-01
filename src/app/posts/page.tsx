'use client'
import {useStore} from "@/app/store/store";
import {useEffect, useState} from "react";
import axios from "axios";
import {server} from "@/app/hardcodedValues";
import Image from "next/image";
import {useRouter} from "next/navigation";

export default () => {
    const token = useStore(state => state.token);
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    const fetchData = () => {
        axios.get(server + "posts/")
            .then(response => {
                console.log(response.data);
                setPosts(response.data.posts);
            })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return <>
        <h1 className="self-center default-h1 mb-3 mt-4">Статьи</h1>
        { posts.map((item, index) => {
            const max_length = 500;
            item.text = item.text.trim();
            if (item.text.length >= max_length)
                item.text = item.text.slice(0, max_length - 3) + "...";
            const id = item._id;

            return <article className="self-center flex flex-col bg-block mb-3 rounded-2xl w-6/12 pt-4 pr-5 pl-5 pb-2 text-pretty break-words min-w-96 relative" key={index}>
                <p className="self-center default-h2">{ item.title }</p>
                <p className="">{ item.text }</p>
                <button className="mt-3 text-textcolor2 bg-none border-none self-start" onClick={() => router.push("/users/" + item.author._id)}>{item.author.fullName}</button>
                <button className="default-button w-48 self-center p-1" onClick={() => { router.push("/posts/" + id) }}>Читать полностью</button>
            </article>
        }) }
    </>
}