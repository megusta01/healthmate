"use client"


import Image from 'next/image';
import styles from '../styles/Login.module.css'
import { signIn } from 'next-auth/react';

const GoogleLogin = () => {
    return (
        <>
            <button onClick={() => signIn("google", {callbackUrl: "/dashboard"})} type="button" className={styles.googleButton}>
                <Image src="/google.png" alt="Google" width={25} height={25}/>
                Login com o Google
            </button>
        </>
    )
}

export default GoogleLogin;