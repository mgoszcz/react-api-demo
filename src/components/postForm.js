import React, { useState, useEffect } from "react";
import { createPost, updatePost } from "../services/postService";

export default function PostForm({
  posts,
  setPosts,
  editingPost,
  setEditingPost,
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [editingPost]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingPost) {
      editPost();
    } else {
      addPost();
    }
    setTitle("");
    setBody("");
    setEditingPost(null);
  };

  const addPost = () => {
    createPost({ title, body })
      .then((response) => {
        console.log("Post added successfully!");
        setPosts([...posts, response.data]);
      })
      .catch((error) => {
        console.error("Failed to add post: ", error);
      });
  };

  const editPost = () => {
    updatePost(editingPost.id, { title, body })
      .then((response) => {
        console.log("Post edited successfully!");
        setPosts(
          posts.map((post) =>
            post.id === editingPost.id ? response.data : post,
          ),
        );
      })
      .catch((error) => {
        console.error("Failed to add post: ", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>Title:</div>
      <input
        type={"text"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>Body</div>
      <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      <div>
        <button type={"submit"}>
          {editingPost ? "Edit Post" : "Add Post"}
        </button>
      </div>
    </form>
  );
}
