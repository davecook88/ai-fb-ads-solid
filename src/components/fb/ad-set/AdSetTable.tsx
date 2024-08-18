import { createSignal, createResource, For } from "solid-js";
import {
  ColumnDef,
  createSolidTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/solid-table";
import clsx from "clsx";
import { fbStore } from "~/store/fb";
import { FacebookAdSet } from "~/fb/ad-sets";

export const AdSetTable = () => {
  const adSets = fbStore.store.adSets;

  const columns: ColumnDef<FacebookAdSet>[] = [
    {
      accessorKey: "status",
      header: "Status",
      // show a colored dot based on the status
      cell: (info) => {
        const status = info.getValue() as string;
        return (
          <div class="flex justify-center w-min">
            <div
              class={clsx(
                `w-4 h-4 rounded-full`,
                status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
              )}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      // truncate the name
      cell: (info) => {
        const name = info.getValue() as string;
        return (
          <div class="truncate w-64">
            <span>{name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "daily_budget",
      header: "Daily Budget",
      cell: (info) => {
        const budget = info.getValue() as number;
        const budgetCents = budget ? budget / 100 : 0;
        console.log(budget);
        return (
          <div>
            {budgetCents?.toLocaleString("en-US", {
              currency: "MXN",
              style: "currency",
            })}
          </div>
        );
      },
    },
  ];

  const table = createSolidTable({
    get data() {
      return adSets || [];
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table class="w-min divide-y divide-gray-200">
      <thead class="bg-black">
        <For each={table.getHeaderGroups()}>
          {(headerGroup) => (
            <tr>
              <For each={headerGroup.headers}>
                {(header) => (
                  <th class="py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                )}
              </For>
            </tr>
          )}
        </For>
      </thead>
      <tbody class="divide-y divide-gray-200 text-left">
        <For each={table.getRowModel().rows}>
          {(row) => (
            <tr
              class="cursor-pointer hover:bg-gray-200 hover:text-black"
              onClick={() => fbStore.selectAdSet(row.original.id)}
            >
              <For each={row.getVisibleCells()}>
                {(cell) => (
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};
