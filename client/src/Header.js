import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:4000/profile', { // Ensure no trailing spaces
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    response.json().then(userInfo => {
                        setUserInfo(userInfo);
                    });
                } else {
                    console.error('Unauthorized or other error:', response.status);
                    setUserInfo(null);
                }
            })
            .catch(err => console.error('Error fetching profile:', err));
    }, []);



    function logout() {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">MyBlog</Link>
            <nav>
                {username && (
                    <>
                        <Link to="/create">Create new post</Link>
                        <a onClick={logout}>Logout ({username})</a>
                    </>
                )}
                {!username && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
