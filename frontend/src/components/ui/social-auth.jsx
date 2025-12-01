import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {toast} from 'sonner';
import { auth } from "../../libs/firebaseConfig";
import useStore from "../../store";
import api from "../../libs/apiCall";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const SocialAuth = ({ isLoading, setLoadinng}) => {
    const {user} = useAuthState(auth);
    const [selectedProvider, setSelectedProvider] = useState("google");
    const {setCredentials} = useStore(state => state);
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        setSelectedProvider("google");
        try {
            const res = await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error during Google sign-in:", error);
        }
    }

    const signInWithGithub = async () => {
        const provider = new GithubAuthProvider();
        setSelectedProvider("github");
        try {
            const res = await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error during Github sign-in:", error);
        }
    }
    
    useEffect(() => {
        const saveUserToDb = async () => {
            try {
                const userData = {
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    provider: selectedProvider,
                };

                setLoadinng(true);
                const {data:res } = await api.post('/auth/sign-in', userData);
                console.log(res);
                if(res?.user) {
                    toast.success(res?.message)
                    const userInfo = { ...res?.user, token: res?.token  };
                    localStorage.setItem('user', JSON.stringify(userInfo));

                    setCredentials(userInfo);

                    setTimeout(() => {
                        navigate('/overview');
                    }, 1500)
                }
            } catch (error) {
                console.error("Something went wrong", error);
                toast.error(error?.response?.data?.message || error.message || "Failed to sign in");
                
            }finally{
                setLoadinng(false);
            }
        };

        if(user) {
            saveUserToDb();
        }
    }, [user?.uid])

    return (
        <div className="flex items-center gap-2">
            <Button
                onClick={signInWithGoogle}
                disabled={isLoading}
                variant="outline"
                type="button"
                className="w-full text-sm"
                style={{
                    fontWeight: "normal",
                    backgroundColor: "transparent",
                    color: "hsl(var(--muted-foreground))",
                    borderColor: "hsl(var(--border))",
               }}
            >
                <FcGoogle className='mr-2 size-5'/>
                Continue with Google
            </Button>

            <Button
                onClick={signInWithGithub}
                disabled={isLoading}
                variant="outline"
                type="button"
                className="w-full text-sm"
                style={{
                    fontWeight: "normal",
                    backgroundColor: "transparent",
                    color: "hsl(var(--muted-foreground))",
                    borderColor: "hsl(var(--border))",
               }}

            >
                <FaGithub className='mr-2 size-5'/>
                Continue with Github
            </Button>
        </div>
    )
}