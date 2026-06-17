import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currency, formatDateTime } from "@/lib/helpers";
import { PAYMENT_LABELS } from "../../constants";
import { ISaleDetailModal } from "./types";
import { EPayments } from "../../enum";

const SaleDetailModal: React.FC<ISaleDetailModal> = ({ sale, onClose }) => {
  return (
    <Dialog open={sale !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes da venda</DialogTitle>
        </DialogHeader>

        {sale && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Funcionário</span>
                <p className="font-medium capitalize">{sale.employee.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Data/hora</span>
                <p className="font-medium">{formatDateTime(sale.createdAt)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">
                  Forma de pagamento
                </span>
                <p className="font-medium">
                  {PAYMENT_LABELS[sale.paymentMethod] ?? sale.paymentMethod}
                </p>
              </div>
              {sale.paymentMethod === EPayments.CREDIT_CARD_INSTALLMENT &&
                sale.installments !== null && (
                  <div>
                    <span className="text-muted-foreground">Parcelas</span>
                    <p className="font-medium">{sale.installments}x</p>
                  </div>
                )}
            </div>

            <Separator />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead className="text-right">Qtd</TableHead>
                  <TableHead className="text-right">Preço unit.</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sale.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {item.product.code}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {currency(item.unitPrice)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {currency(item.subtotal)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Separator />

            <div className="flex justify-end text-base font-semibold">
              <span className="text-muted-foreground mr-3">Total</span>
              <span>{currency(sale.total)}</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export { SaleDetailModal };
