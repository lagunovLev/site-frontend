'use client'
import {useStore} from "@/app/store/store";

export default () => {
    const state = useStore(state => state);

    return <>
        <p className="self-center">
            {JSON.stringify(state)}
        </p>
    </>;
}