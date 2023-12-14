"use client";

import React from "react";
import { Post } from "@types";

const PostComponent: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-bold">{post.title}</h2>
      <p className="text-gray-600">{post.content}</p>
    </div>
  );
};

export default PostComponent;
