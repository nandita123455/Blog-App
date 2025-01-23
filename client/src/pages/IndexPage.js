import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/post') // Correct endpoint
            .then(response => response.json())
            .then(posts => {
                console.log('Fetched posts:', posts);
                setPosts(posts);
            })
            .catch(err => console.error('Error fetching posts:', err));
    }, []);


    return (
        <div>
            {posts.length > 0 ? (
                posts.map(post => <Post
                    key={post._id}
                    title={post.title}
                    summary={post.summary}
                    content={post.content}
                    cover={post.cover}
                    author={post.author?.username || 'Unknown'}
                    date={post.createdAt}
                />)
            ) : (
                <p>No posts to display</p> // Debugging fallback
            )}
        </div>
    );

}