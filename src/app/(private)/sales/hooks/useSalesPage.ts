import { useSales, useDailySummary } from "@/resources/sales.resource";
import type { Sale, ActiveFilter } from "../types";
import { useState } from "react";

const useSalesPage = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<ActiveFilter | null>(null);
  const [detailSale, setDetailSale] = useState<Sale | null>(null);
  const [newSaleOpen, setNewSaleOpen] = useState<boolean>(false);

  const applyFilter = () => {
    setActiveFilter({ start: startDate, end: endDate });
  };

  const clearFilter = () => {
    setStartDate("");
    setEndDate("");
    setActiveFilter(null);
  };

  const salesQuery = useSales(
    activeFilter
      ? { startDate: activeFilter.start, endDate: activeFilter.end }
      : undefined,
  );

  const summaryQuery = useDailySummary();

  const sales = salesQuery.data ?? [];
  const countToday = sales.filter(
    (s) => new Date(s.createdAt).toDateString() === new Date().toDateString(),
  ).length;
  return {
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
  };
};

export default useSalesPage;
