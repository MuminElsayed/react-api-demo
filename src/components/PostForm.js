import { useEffect, useState } from "react";
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
      updatePost(editingPost.id, editingPost);
      setEditingPost(null);
    } else {
      handleCreate();
    }

    setTitle("");
    setBody("");
  };

  const handleCreate = () => {
    createPost({ title, body })
      .then((response) => {
        setPosts([...posts, response.data]);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Post</h1>
      <div>Title</div>
      <input
        value={title}
        type="text"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <div>Body</div>
      <textarea
        value={body}
        type="text"
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <div>
        <button type="submit">{editingPost ? "Edit Post" : "Add Post"}</button>
        {editingPost ? (
          <button onClick={handleCancelEdit}>Cancel</button>
        ) : (
          <></>
        )}
      </div>
    </form>
  );
}
