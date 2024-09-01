import Link from "next/link";
import {useStore} from "@/app/store/store";
import {redirect} from "next/navigation";
import {useRouter} from "next/navigation";
import { motion } from 'framer-motion';

export function RegisteredMenu({ setDropdownState }) {
    const exit = useStore(state => state.exit);
    const router = useRouter()

    const exitFunc = () => {
        exit();
        router.push("/");
    }

    return <motion.div
        className="flex flex-col bg-menu z-20"
        onClick={() => setDropdownState(false)}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="z-20"><Link className="z-20" href="/me/posts/">Мои статьи</Link></div>
        <div className="z-20"><Link className="z-20" href="/me/">Мои данные</Link></div>
        <div className="z-20"><button className="z-20" onClick={exitFunc}>Выйти</button></div>
    </motion.div>;
}

export function UnregisteredMenu({ setDropdownState }) {
    return <motion.div
        className="flex flex-col bg-menu z-20"
        onClick={() => setDropdownState(false)}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="z-20"><Link className="z-20" href="/register/">Создать аккаунт</Link></div>
        <div className="z-20"><Link className="z-20" href="/login/">Войти</Link></div>
    </motion.div>;
}