'use client'

import { useListPosts } from '@/actions/posts'
import React from 'react'

export default function PostPage() {
    const {data, error} = useListPosts();
  return (
    <div>
        <h1>Posts</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
