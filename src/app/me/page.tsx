'use client'
import {useEffect, useState} from "react";
import axios from "axios";
import {server} from "@/app/hardcodedValues";
import {useStore} from "@/app/store/store";

export default function Home() {
    //interface UserData {
    //    fullName: string,
    //    email: string,
    //    avatarUrl: string,
    //    password?: string,
    //}

    const token = useStore(state => state.token);

    const [state, setState] = useState("view");
    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        avatarUrl: "",
        password: "",
    });

    const setFullName = (name) => setUserData({...userData, fullName: name})
    const setEmail = (email) => setUserData({ ...userData, email: email })
    const setAvatarUrl = (url) => setUserData({ ...userData, avatarUrl: url })
    const setPassword = (pswrd) => setUserData({ ...userData, password: pswrd })

    const fetchData = tok => {
        axios.get(server + 'auth/me/', { headers: { Authorization: tok } })
            .then(response => {
                setUserData({
                    fullName: response.data.fullName,
                    email: response.data.email,
                    avatarUrl: response.data.avatarUrl,
                    password: "",
                });
            })
    }

    const cancelEditing = () => {
        setState("view");
        fetchData(token);
    }

    const saveChanges = () => {
        setState("view");

        const data = userData;
        if (data.password === "")
            delete data.password;

        axios.put(server + 'auth/update/', data, { headers: { Authorization: token } })
            .then(response => {
                if (response.data.success) {

                }
            })

        setTimeout(fetchData, 100, token);
    }

    useEffect(() => {
        fetchData(token);
    }, [token])
    return <>
        <h1 className="self-center default-h1 mb-3 mt-4">Информация о пользователе</h1>
        <div className="flex flex-col w-1/2 self-center min-w-80">
            { state === "view" ? (<>
                <div className="flex flex-row mb-2 justify-between"><label className="">Имя: </label><label>{userData.fullName}</label></div>
                <div className="flex flex-row mb-2 justify-between"><label className="">Почта: </label><label>{userData.email}</label></div>
                <div className="flex flex-row mb-2 justify-between"><label className="">Аватарка: </label><label>{userData.avatarUrl}</label></div>
                <div>
                    <button className="default-button mt-9" onClick={() => setState("edit")}>Изменить данные</button>
                </div>
            </>) : state === "edit" ? (<>
                    <div className="flex flex-row mb-2 justify-between"><label>Имя:</label><input type="text" className="default-input-text-small w-64" defaultValue={userData.fullName} onChange={text => setFullName(text.target.value)}/></div>
                    <div className="flex flex-row mb-2 justify-between"><label>Почта:</label><input type="text" className="default-input-text-small w-64" defaultValue={userData.email} onChange={text => setEmail(text.target.value)}/></div>
                    <div className="flex flex-row mb-2 justify-between"><label>Аватарка:</label><input type="text" className="default-input-text-small w-64" defaultValue={userData.avatarUrl} onChange={text => setAvatarUrl(text.target.value)}/></div>
                    <div className="mt-9">
                        <button className="default-button mr-4" onClick={() => setState("edit password")}>Изменить пароль</button>
                        <button className="default-button mr-4" onClick={saveChanges}>Сохранить</button>
                        <button className="default-button" onClick={cancelEditing}>Отменить</button>
                    </div>
                </>) : (<>
                    <div className="flex flex-row mb-2 justify-between"><label>Имя:</label><input type="text" className="default-input-text-small w-64" defaultValue={userData.fullName} onChange={text => setFullName(text.target.value)}/></div>
                    <div className="flex flex-row mb-2 justify-between"><label>Почта:</label><input type="text" className="default-input-text-small w-64" defaultValue={userData.email} onChange={text => setEmail(text.target.value)}/></div>
                    <div className="flex flex-row mb-2 justify-between"><label>Аватарка:</label><input type="text" className="default-input-text-small w-64" defaultValue={userData.avatarUrl} onChange={text => setAvatarUrl(text.target.value)}/></div>
                    <div className="flex flex-row mb-2 justify-between"><label>Пароль</label><input type="text" className="default-input-text-small w-64" defaultValue={userData.password} onChange={text => setPassword(text.target.value)}/></div>
                    <div className="mt-9">
                        <button className="default-button mr-4" onClick={saveChanges}>Сохранить</button>
                        <button className="default-button" onClick={cancelEditing}>Отменить</button>
                    </div>
                </>)
            }
        </div>
    </>;
}