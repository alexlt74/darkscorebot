import { useQuery } from "@tanstack/react-query";
import { fetchHistoricalData } from "@/services/apiService";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/columns";
import { Loader2 } from "lucide-react";

const Historical = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["historical"],
    queryFn: fetchHistoricalData,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="section-title">Dados Históricos</h1>
      <DataTable columns={columns} data={data || []} />
    </div>
  );
};

export default Historical;