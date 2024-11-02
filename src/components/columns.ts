import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "Date",
    header: "Data",
  },
  {
    accessorKey: "Time",
    header: "Hora",
  },
  {
    accessorKey: "League",
    header: "Liga",
  },
  {
    accessorKey: "Home",
    header: "Casa",
  },
  {
    accessorKey: "Away",
    header: "Fora",
  },
  {
    accessorKey: "FT_Odd_H",
    header: "Odd Casa",
  },
  {
    accessorKey: "FT_Odd_D",
    header: "Odd Empate",
  },
  {
    accessorKey: "FT_Odd_A",
    header: "Odd Fora",
  },
];