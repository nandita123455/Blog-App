import { useEffect, useState } from 'react';
import { formatISO9075 } from 'date-fns';

export default function Post() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/post') // Adjust with your backend URL
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                return response.json();
            })
            .then(data => setPosts(data))
            .catch(err => console.error('Error fetching posts:', err));
    }, []);

    return (
        <div className="posts">
            {posts.length === 0 && <p>No posts available.</p>}
            {posts.map(post => (
                <div key={post._id} className="post">
                    <div className="image">
                        <img
                            src={post.cover.startsWith('http') ? post.cover : `http://localhost:4000/${post.cover}`}
                            alt={post.title}
                        />
                    </div>
                    <div className="texts">
                        <h2>{post.title}</h2>
                        <p className="info">
                            <a className="author">@{post.author?.username || 'Unknown Author'}</a>
                            <time>{formatISO9075(new Date(post.createdAt))}</time>
                        </p>
                        <p className="summary">{post.summary}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

