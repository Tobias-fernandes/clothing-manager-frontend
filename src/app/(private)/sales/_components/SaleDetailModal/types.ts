import type { Sale } from "../../types";

interface ISaleDetailModal {
  sale: Sale | null;
  onClose: () => void;
}

export type { ISaleDetailModal };
