"use client"

import React, { useState, useEffect } from "react";
import axios from 'axios';
import PostComponent from "@components/Post";
import PostForm from "@components/Form";
import { Post } from "@types";

const PostsPage: React.FC = () => {
  // State for posts and form visibility
  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch posts from the API when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await axios.get('http://localhost:3000/api/posts/get-posts');
        setPosts(posts.data);
        console.log("posts:"+  posts.data);
      } catch (error) {
        alert("error");
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Handle creating a new post
  const handleCreatePost = () => {
    setShowForm(true);
  };

  // Handle submission of a new post
  const handleSubmitPost = async (title: string, content: string) => {
    try {
      const response = await axios.post('http://localhost:3000/api/posts/create-post', {
        title,
        content,
      });

      const newPost: Post = response.data;
      setPosts(currentPosts => [...currentPosts, newPost]);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {showForm && <PostForm onSubmit={handleSubmitPost} />}
      <div className="grid grid-cols-1 gap-4 mt-4">
  {posts.map((post) => (
    <PostComponent key={post.id} post={post} />
  ))}
  <button
    onClick={handleCreatePost}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-12">
    Create Post
  </button>
</div>

    </div>
  );
};

export default PostsPage;
