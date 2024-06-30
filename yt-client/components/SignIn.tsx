"use client"
import { signInWithGoogle, signOut} from "@/app/firebase/firebase";
import { Fragment } from "react";
import { User } from "firebase/auth";   

interface SignInProps {
    user: User | null;  
}

export default function SignIn({user}:SignInProps) { 
    return (
        <Fragment>
            {user ?(
                <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                    onClick={signOut}
                    >
                    Sign Out
                </button>
            ):(
                <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                        onClick={signInWithGoogle}
                    >
                    Sign In
                </button>
            )}
        </Fragment>
    )
}