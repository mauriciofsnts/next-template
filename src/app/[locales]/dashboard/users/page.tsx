import React from "react";
import DataGrid from "@/components/tables/table";
import { columns } from "@/components/tables/users-table/columns";

type ParamsProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function TeamPage({ searchParams }: ParamsProps) {
  console.log(searchParams);
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
      (country ? `&search=${country}` : "")
  );
  const response = await res.json();
  const totalUsers = response.total_users; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const members: any[] = response.users;

  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <DataGrid
        searchKey="email"
        pageNo={page}
        columns={columns}
        totalUsers={totalUsers}
        data={members}
        pageCount={pageCount}
      />
    </div>
  );
}
