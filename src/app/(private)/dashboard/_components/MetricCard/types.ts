import { ColorVariant } from "../../types";

interface MetricCardProps {
  title: string;
  value: string | null;
  icon: React.ReactNode;
  color: ColorVariant;
  loading: boolean;
}

export type { MetricCardProps };
