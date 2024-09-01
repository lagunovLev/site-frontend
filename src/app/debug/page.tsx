'use client'
import {useStore} from "@/app/store/store";

export default function Home() {
    const state = useStore(state => state);

    return <>
        <p className="self-center">
            {JSON.stringify(state)}
        </p>
    </>;
}