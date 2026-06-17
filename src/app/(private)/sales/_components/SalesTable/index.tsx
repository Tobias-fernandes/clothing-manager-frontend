import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currency, formatDateTime } from "@/lib/helpers";
import { PAYMENT_LABELS, PAYMENT_BADGE_CLASS } from "../../constants";
import { ISalesTable } from "./types";

const SalesTable: React.FC<ISalesTable> = ({
  data,
  isLoading,
  isError,
  onViewDetail,
}) => {
  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data/hora</TableHead>
              <TableHead>Funcionário</TableHead>
              <TableHead>Forma de pagamento</TableHead>
              <TableHead>Parcelas</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-28 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="ml-auto h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="ml-auto h-7 w-24" />
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading && isError && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-12 text-center text-destructive"
                >
                  Não foi possível carregar as vendas. Tente novamente.
                </TableCell>
              </TableRow>
            )}
            {data.length === 0 && !isLoading && !isError && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-12 text-center text-muted-foreground"
                >
                  Nenhuma venda encontrada.
                </TableCell>
              </TableRow>
            )}
            {data.length > 0 &&
              !isLoading &&
              !isError &&
              data.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDateTime(sale.createdAt)}
                  </TableCell>
                  <TableCell>{sale.employee.name}</TableCell>
                  <TableCell>
                    <Badge
                      className={PAYMENT_BADGE_CLASS[sale.paymentMethod] ?? ""}
                      variant="outline"
                    >
                      {PAYMENT_LABELS[sale.paymentMethod] ?? sale.paymentMethod}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {sale.paymentMethod === "credit_card_installment" &&
                    sale.installments !== null
                      ? `${sale.installments}x`
                      : "—"}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {currency(sale.total)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetail(sale)}
                    >
                      Ver detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export { SalesTable };
