import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";       // to take dynamic inputs from users
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {                 // handle the creation of a new post by rendering a form and managing its state.
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null);
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(ev) {
        ev.preventDefault(); // to Make sure to prevent default form submission

        // Only proceed if file(s) and content are valid
        if (!files || !title || !summary || !content) {
            alert("Please fill in all fields including the image upload.");
            return;
        }

        const data = new FormData();   //instance of FormData object
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);

        // Set the first file (if it exists)
        if (files && files[0]) {
            data.set('file', files[0]);
        }

        // Sending form data to the backend
        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });

        if (response.ok) {
            setRedirect(true);  // Redirect on success
        } else {
            console.log('Failed to create post');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />;  // Redirect to homepage on successful post creation
    }

    return (
        <form onSubmit={createNewPost}>
            <input
                type="text"
                placeholder={'Title'}
                value={title}
                onChange={ev => setTitle(ev.target.value)}
                required
            />
            <input
                type="text"
                placeholder={'Summary'}
                value={summary}
                onChange={ev => setSummary(ev.target.value)}
                required
            />
            <input
                type="file"
                onChange={ev => setFiles(ev.target.files)}
                required
            />
            <Editor
                value={content}
                onChange={setContent}
            />
            <button type="submit" style={{ marginTop: '5px' }}>Create post</button>
        </form>
    );
}
