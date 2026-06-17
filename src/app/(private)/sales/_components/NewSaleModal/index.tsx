"use client";

import { Controller } from "react-hook-form";
import { Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { currency } from "@/lib/helpers";
import { INewSaleModal } from "./types";
import useNewSaleModal from "./hooks/useNewSaleModal";

const NewSaleModal: React.FC<INewSaleModal> = ({ open, onClose }) => {
  const {
    searchQuery,
    searchResults,
    searchLoading,
    cart,
    cartTotal,
    control,
    errors,
    canSubmit,
    paymentMethod,
    createSale,

    handleClose,
    handleSubmit,
    onSubmit,
    setSearchQuery,
    addToCart,
    updateQty,
    removeFromCart,
  } = useNewSaleModal(onClose);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova venda</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label>Buscar produto</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-8"
                placeholder="Nome ou código do produto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {searchLoading && (
              <div className="flex flex-col gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-lg" />
                ))}
              </div>
            )}

            {!searchLoading && searchResults.length > 0 && (
              <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-1">
                {searchResults.map((p) => {
                  const inCart = cart.find((c) => c.product.id === p.id);
                  return (
                    <div
                      key={p.id}
                      className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-muted/50"
                    >
                      <div className="text-sm">
                        <p className="font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {p.code} · {p.size} · {p.color} ·{" "}
                          {currency(p.salePrice)}
                        </p>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={p.quantity === 0}
                        onClick={() => addToCart(p)}
                      >
                        {inCart ? "Adicionar mais" : "Adicionar"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}

            {!searchLoading &&
              searchQuery.trim() !== "" &&
              searchResults.length === 0 && (
                <p className="py-2 text-center text-sm text-muted-foreground">
                  Nenhum produto encontrado.
                </p>
              )}
          </div>

          {cart.length > 0 && (
            <div className="flex flex-col gap-2">
              <Label>Itens da venda</Label>
              <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-1">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3 rounded-md px-3 py-2"
                  >
                    <div className="flex-1 text-sm">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.product.code} · {currency(item.product.salePrice)}{" "}
                        un · estoque: {item.product.quantity}
                      </p>
                    </div>
                    <Input
                      type="number"
                      min={1}
                      max={item.product.quantity}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQty(item.product.id, Number(e.target.value))
                      }
                      className="w-16 text-center"
                    />
                    <span className="w-24 text-right text-sm font-medium">
                      {currency(item.product.salePrice * item.quantity)}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pr-1 text-sm font-semibold">
                <span className="mr-3 text-muted-foreground">Total</span>
                <span>{currency(cartTotal)}</span>
              </div>
            </div>
          )}

          <Separator />

          <div className="flex flex-col gap-2">
            <Label>Forma de pagamento</Label>
            <Controller
              control={control}
              name="paymentMethod"
              render={({ field }) => (
                <Select
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pix">Pix</SelectItem>
                    <SelectItem value="cash">Dinheiro</SelectItem>
                    <SelectItem value="debit_card">Débito</SelectItem>
                    <SelectItem value="credit_card_cash">
                      Crédito à vista
                    </SelectItem>
                    <SelectItem value="credit_card_installment">
                      Crédito parcelado
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.paymentMethod && (
              <p className="text-xs text-destructive">
                {errors.paymentMethod.message}
              </p>
            )}
          </div>

          {paymentMethod === "credit_card_installment" && (
            <div className="flex flex-col gap-2">
              <Label>Número de parcelas</Label>
              <Controller
                control={control}
                name="installments"
                render={({ field }) => (
                  <Input
                    type="number"
                    min={2}
                    placeholder="Mínimo 2"
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? null : Number(e.target.value),
                      )
                    }
                  />
                )}
              />
              {errors.installments && (
                <p className="text-xs text-destructive">
                  {errors.installments.message}
                </p>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={createSale.isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={!canSubmit}>
              {createSale.isPending ? "Registrando..." : "Confirmar venda"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { NewSaleModal };
