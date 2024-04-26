"use client";

import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ColumnDef,
  PaginationState,
  StringOrTemplateHeader,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "../ui/input";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  pageSizeOptions?: number[];
  pageCount: number;
  loading: boolean;
}

function DataGrid<TData, TValue>({
  columns,
  data,
  searchKey,
  pageCount,
  loading = false,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("table");

  const page = searchParams.get("page") ?? "1";
  const pageAsNumber = Number(page);
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;

  // const limit = searchParams.get("limit") ?? "10";
  // const limitAsNumber = Number(limit);

  const limitPerPage = searchParams.get("limitPerPage") ?? "10";
  const limitPerPageAsNumber = Number(limitPerPage);
  const fallbackPerPage = isNaN(limitPerPageAsNumber)
    ? 10
    : limitPerPageAsNumber;

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: fallbackPage - 1,
    pageSize: fallbackPerPage,
  });

  /**
   * Creates a query string from the given parameters.
   * @param params - An object containing key-value pairs for the parameters.
   * @returns The generated query string.
   */
  const createQueryStringUrl = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return `${pathname}?${newSearchParams.toString()}`;
    },
    [pathname, searchParams],
  );

  useEffect(() => {
    /**
     * Constructs the URL with query parameters for pagination.
     *
     * @param {string} pathname - The current pathname.
     * @param {number} pageIndex - The current page index.
     * @param {number} pageSize - The number of items per page.
     * @returns {string} The constructed URL with query parameters.
     */
    const url = createQueryStringUrl({ page: pageIndex + 1, limit: pageSize });

    router.push(url, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize]);

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualFiltering: true,
    enableRowSelection: true,
    getRowId: (row) => (row as any).id,
  });

  const searchValue =
    (table.getColumn(searchKey)?.getFilterValue() as string) ?? "";
  const [hasBeenSearched, setHasBeenSearched] = useState<boolean>(false);

  useEffect(() => {
    if (!hasBeenSearched) return;
    if (searchValue.length > 0) {
      router.push(
        createQueryStringUrl({ page: null, limit: null, search: searchValue }),
        { scroll: false },
      );
    }

    if (searchValue?.length === 0 || searchValue === undefined) {
      router.push(
        createQueryStringUrl({ page: null, limit: null, search: null }),
        { scroll: false },
      );
    }

    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <>
      <Input
        placeholder={t("searchFor", { searchTerm: searchKey })}
        value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
        onChange={(event) => {
          setHasBeenSearched(true);
          table.getColumn(searchKey)?.setFilterValue(event.target.value);
        }}
        className="w-full md:max-w-sm"
      />

      <ScrollArea className="rounded-md border h-[calc(80vh-220px)]">
        <Table className="relative">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="relative">
            {loading && (
              <tr className="bg-gray-600/5 absolute w-full h-full flex items-center justify-center">
                <td>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </td>
              </tr>
            )}

            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t("noResults")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex flex-col gap-2 sm:flex-row items-center justify-end space-x-2 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex-1 text-sm text-muted-foreground">
            {t("rowsSelected", {
              count: Object.keys(table.getState().rowSelection).length,
            })}
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
              <p className="whitespace-nowrap text-sm font-medium">
                {t("rowsPerPage")}
              </p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value: any) => table.setPageSize(Number(value))}
                disabled={loading}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full">
          <div className="flex w-[120px] items-center justify-center text-sm font-medium">
            {t("pageCount", {
              currentPage: table.getState().pagination.pageIndex + 1,
              totalPages: table.getPageCount(),
            })}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              aria-label={t("goToFirstPage")}
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage() || loading}
            >
              <ArrowLeftToLine className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label={t("goToPreviousPage")}
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage() || loading}
            >
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label={t("goToNextPage")}
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage() || loading}
            >
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label={t("goToLastPage")}
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage() || loading}
            >
              <ArrowRightToLine className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DataGrid;
