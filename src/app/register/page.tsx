'use client'
import {useState} from "react";
import axios from "axios";
import {server} from "@/app/hardcodedValues";
import {useStore} from "@/app/store/store";
import {redirect} from "next/navigation";
import {useRouter} from "next/navigation";

export default () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("");

    const register = useStore(state => state.register);
    const router = useRouter()

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(server + 'auth/register/', {
                password: password,
                fullName: name,
                email: email
            })
            .then(function (response) {
                    if (response.data.success) {
                        setResult("Пользователь зарегистрирован.");
                        const token: string = response.data.token;
                        const id: string = response.data._id;
                        register(token, id);
                        console.log(token);
                    } else {
                        setResult("Не удалось зарегистрировать пользователя.");
                    }
                    router.push("/");
                })
            .catch(error => {
                console.log(error);
            })
    }

    return <>
        <h1 className="self-center default-h1 mb-3 mt-4">Регистрация</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-1/4 self-center min-w-80">
            <input type="text" placeholder="Логин"
                   onChange={(evt) => setName(evt.target.value)}
                   className="default-input-text mb-2"/>
            <input type="text" placeholder="Почта"
                   onChange={(evt) => setEmail(evt.target.value)}
                   className="default-input-text mb-2"/>
            <input type="text" placeholder="Пароль"
                   onChange={(evt) => setPassword(evt.target.value)}
                   className="default-input-text mb-2"/>
            <button type="submit" className="default-button mb-2">Зарегистрироваться</button>
            {(result != "") && (
                <label className="self-center text-textcolor2">{result}</label>
            )}
        </form>
    </>;
}