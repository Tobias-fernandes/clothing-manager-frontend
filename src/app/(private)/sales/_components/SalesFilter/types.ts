interface ISalesFilter {
  startDate: string;
  endDate: string;
  activeFilter: { start: string; end: string } | null;
  onStartDateChange: (v: string) => void;
  onEndDateChange: (v: string) => void;
  onApply: () => void;
  onClear: () => void;
}

export type { ISalesFilter };
