// SalesSummary.tsx
import { TrendingUp, ShoppingCart, Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { currency } from "@/lib/helpers";
import { PAYMENT_LABELS } from "../../constants";
import { ISalesSummary } from "./types";

const SalesSummary: React.FC<ISalesSummary> = ({
  data,
  isLoading,
  isError,
  countToday,
}) => {
  if (isError) return null;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total vendido hoje
            </CardTitle>
            <TrendingUp className="size-4 text-green-500" />
          </div>
        </CardHeader>
        <CardContent>
          {!isLoading && (
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {data ? currency(data.total) : "—"}
            </p>
          )}
          {isLoading && <Skeleton className="h-7 w-28" />}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Vendas hoje
            </CardTitle>
            <ShoppingCart className="size-4 text-purple-500" />
          </div>
        </CardHeader>
        <CardContent>
          {!isLoading && (
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {data ? countToday : "—"}
            </p>
          )}
          {isLoading && <Skeleton className="h-7 w-16" />}
        </CardContent>
      </Card>

      {!isLoading &&
        data &&
        Object.entries(data.byPaymentMethod).map(([method, amount]) => (
          <Card key={method}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {PAYMENT_LABELS[method] ?? method}
                </CardTitle>
                <Receipt className="size-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {currency(amount)}
              </p>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export { SalesSummary };
