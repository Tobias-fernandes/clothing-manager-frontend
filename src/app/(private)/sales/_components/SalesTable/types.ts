import type { Sale } from "../../types";

interface ISalesTable {
  data: Sale[];
  isLoading: boolean;
  isError: boolean;
  onViewDetail: (sale: Sale) => void;
}

export type { ISalesTable };
