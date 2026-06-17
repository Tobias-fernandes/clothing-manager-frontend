import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COLOR_MAP } from "../../constants";
import { Skeleton } from "@/components/ui/skeleton";
import { MetricCardProps } from "./types";

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  color,
  loading,
}) => {
  const { icon: iconColor, value: valueColor } = COLOR_MAP[color];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <span className={iconColor}>{icon}</span>
        </div>
      </CardHeader>
      <CardContent>
        {loading && <Skeleton className="h-7 w-28" />}
        {!loading && (
          <p className={`text-2xl font-bold whitespace-nowrap ${valueColor}`}>{value}</p>
        )}
      </CardContent>
    </Card>
  );
};

export { MetricCard };
