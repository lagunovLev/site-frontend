'use client'
import {useRouter} from "next/navigation";
import axios from "axios";
import {server} from "@/app/hardcodedValues";
import {useEffect, useState} from "react";
import {useStore} from "@/app/store/store";

export default ({ params }: { params: { id: string } }) => {
    const user_id = useStore(state => state.user_id);
    const router = useRouter();
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
                if (response.data.post.author._id == user_id)
                    router.replace("/me/posts/" + post_id);
                setPost(response.data.post);
            })
    }

    useEffect(fetchData, [post_id]);

    return <>
        <h1 className="self-center default-h1 mb-3 mt-4">{ post.title }</h1>
        <div className="self-center w-6/12 text-pretty break-words">
            <p className="">{ post.text }</p>
            <div className="mt-3"><label>Автор: </label><button className="bg-none border-none self-start text-textcolor2" onClick={() => router.push("/users/" + post.author._id)}>{post.author.fullName}</button></div>
        </div>
    </>
}