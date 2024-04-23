import { client } from "@/lib/http/axios";
import { useQuery } from "@tanstack/react-query";
import { Placeholder } from "../create-placeholder/types";

const LIST_POSTS_QUERY_KEY = ["posts"];

export function useListPosts() {
  const id = '12'
  return useQuery({
    queryKey: [LIST_POSTS_QUERY_KEY, id],
    queryFn: () => {
      return client.request<null, Placeholder>({
        method: "get",
        url: `/posts/${id}`,
      });
    },
  });
}
