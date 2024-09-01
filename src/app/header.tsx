'use client'
import Link from "next/link";
import { RegisteredMenu, UnregisteredMenu } from "./headerMenu.tsx";
import {useEffect, useState} from "react";
import {useStore} from "@/app/store/store";

export default () => {
    const [dropdownState, setDropdownState] = useState(false);

    const handleClick = () => {
        setDropdownState(!dropdownState);
    }

    const token = useStore(state => state.token);

    useEffect(() => {
        useStore.persist.rehydrate()
    }, [])

    const isLoggedIn = () => {
        return token !== "";
    }

    return <>
        <div className="h-12 flex-row flex justify-center bg-header z-30 mb-6">
            <div className="w-44 h-12 flex justify-center items-center flex-row bg-menu2 z-30"><Link href="/">Мой сайт</Link></div>
            <div className="w-44 h-12 flex justify-center items-center flex-row bg-menu2 z-30"><Link href="/posts/">Статьи</Link></div>
            <div className="w-44 h-12 flex justify-center items-center flex-row bg-menu2 z-30"><Link href="/users/">Пользователи</Link></div>
            <div className="w-44 flex flex-col bg-menu2 z-30">
                <button className="mb-3 mt-3 z-30" onClick={handleClick}>Профиль</button>
                {dropdownState && (isLoggedIn() ?
                    (<RegisteredMenu setDropdownState={setDropdownState}/>) :
                    (<UnregisteredMenu setDropdownState={setDropdownState}/>)
                )}
            </div>
        </div>
    </>;
}