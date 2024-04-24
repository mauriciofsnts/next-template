"use client";
import DataGrid from "@/components/tables/table";
import { Member, columns } from "@/components/tables/users-table/columns";
import useSearchParamsPagination from "@/hooks/useSearchParamsPagination";
import { useEffect, useState } from "react";

export default function TeamPage() {
  const { limit, offset, page, query } = useSearchParamsPagination();

  const [members, setMembers] = useState<Member[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const res = await fetch(
        `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${limit}` +
          (query ? `&search=${query}` : "")
      );
      const response = await res.json();
      const totalUsers = response.total_users; //1000
      const pageCount = Math.ceil(totalUsers / limit);
      const members: Member[] = response.users;

      // Update state or do any other necessary operations with the fetched data
      setMembers(members);
      setPageCount(pageCount);
    };

    fetchData();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [limit, offset, page, query]);

  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <DataGrid
        searchKey="email"
        columns={columns}
        data={members}
        loading={loading}
        pageCount={pageCount}
      />
    </div>
  );
}
