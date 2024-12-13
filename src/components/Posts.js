import React, { useState, useEffect } from "react";
import { getPosts, deletePost, updatePost } from "../services/postService";
import PostForm from "./postForm";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    console.log("Fetching posts...");
    getPosts()
      .then((response) => {
        console.log("Posts fetched successfully!");
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch posts: ", error);
      });
  }, []);

  const handleDelete = (id) => {
    deletePost(id)
      .then(() => {
        console.log("Post deleted successfully!");
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((error) => {
        console.error("Failed to delete post: ", error);
      });
  };

  const startEditing = (post) => {
    setEditingPost(post);
  };

  return (
    <div>
      <h1>Posts</h1>
      <PostForm
        posts={posts}
        setPosts={setPosts}
        editingPost={editingPost}
        setEditingPost={setEditingPost}
      />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button onClick={() => startEditing(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
