"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SaleDetailModal } from "./_components/SaleDetailModal";
import { NewSaleModal } from "./_components/NewSaleModal";
import { SalesFilter } from "./_components/SalesFilter";
import { SalesSummary } from "./_components/SalesSummary";
import { SalesTable } from "./_components/SalesTable";
import useSalesPage from "./hooks/useSalesPage";

const SalesPage = () => {
  const {
    startDate,
    endDate,
    activeFilter,
    summaryQuery,
    countToday,
    sales,
    salesQuery,
    detailSale,
    newSaleOpen,

    setNewSaleOpen,
    setDetailSale,
    setStartDate,
    setEndDate,
    applyFilter,
    clearFilter,
  } = useSalesPage();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Vendas</h1>
        <Button onClick={() => setNewSaleOpen(true)}>
          <Plus className="size-4" />
          Nova venda
        </Button>
      </div>

      <SalesFilter
        startDate={startDate}
        endDate={endDate}
        activeFilter={activeFilter}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onApply={applyFilter}
        onClear={clearFilter}
      />

      <SalesSummary
        data={summaryQuery.data}
        isLoading={summaryQuery.isLoading}
        isError={summaryQuery.isError}
        countToday={countToday}
      />

      <SalesTable
        data={sales}
        isLoading={salesQuery.isLoading}
        isError={salesQuery.isError}
        onViewDetail={setDetailSale}
      />

      <SaleDetailModal sale={detailSale} onClose={() => setDetailSale(null)} />

      <NewSaleModal open={newSaleOpen} onClose={() => setNewSaleOpen(false)} />
    </div>
  );
};

export default SalesPage;
