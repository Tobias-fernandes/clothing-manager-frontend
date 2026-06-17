import type { DailySummary } from "../../types";

interface ISalesSummary {
  data: DailySummary | undefined;
  isLoading: boolean;
  isError: boolean;
  countToday: number;
}

export type { ISalesSummary };
