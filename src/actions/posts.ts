import { useQuery } from "@tanstack/react-query";
import { HttpClient, HttpRequest, HttpMethod } from '@/lib/http-client';
import {  httpClient } from '@/lib/axios';

const LIST_POSTS_QUERY_KEY = ["posts"];


export function useListPosts() {
    return useQuery({
        queryKey: LIST_POSTS_QUERY_KEY,
        queryFn: ()  => {
            const request: HttpRequest<null> = {
                method: 'get',
                url: '/posts/1',
            };
            return httpClient.request<null, any>(request);
        },
    })
}