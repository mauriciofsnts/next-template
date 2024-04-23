"use client";

import React from "react";
import { createPlaceholder } from "@/actions/create-placeholder";
import { useListPosts } from "@/actions/get-placeholder/posts";
import { useServerRequestAction } from "@/hooks/useServerRequestAction";

export default function PostPage() {
  const { data, error } = useListPosts();

  console.log(`error: `, error);
  console.log(`data: `, data);

  const { data: createdContent, execute } = useServerRequestAction(
    createPlaceholder,
    {
      onSuccess(data) {
        console.log(data);
      },
    }
  );

  const handleCreate = () => {
    execute({
      title: "title",
      body: "body",
      userId: 1,
    });
  };

  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <h1>Posts</h1>

      <div>
        <button onClick={handleCreate}>Create</button>
      </div>

      <div className="h-1/4 overscroll-y-auto w-[1000px] overflow-x-hidden">
        <pre>{JSON.stringify(error, null, 2)}</pre>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
