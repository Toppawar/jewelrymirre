import { useEffect, useState } from 'react';
import { useRouter } from "next/router"

import { onAuthStateChanged } from '../../firebase/client';


export const USER_STATES = {
    NOT_LOGGED: null,
    NOT_KNOWN: undefined,
}

const UserProvider = ({
    onChange,
    children,
}) => {
    const [user, setUser] = useState(USER_STATES.NOT_KNOWN);
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(setUser)
    }, []);

    useEffect(() => {
        onChange(user);
        if (user === USER_STATES.NOT_LOGGED || USER_STATES.NOT_KNOWN === user) {
            router.push("/")
        }
        if (user && user.email && user.uid) {
            router.push("/clients")
        }
    }, [user])

    return children;

};

export default UserProvider;