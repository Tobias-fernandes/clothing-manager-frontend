"use client";

import { useState } from "react";
import { AlertTriangle, Plus } from "lucide-react";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthStore } from "@/store/auth.store";
import { useProducts } from "@/resources/products.resource";
import {
  useStockMovements,
  useCreateMovement,
  type MovementType,
} from "@/resources/stock.resource";
import { formatDateTime } from "@/lib/helpers";

const MOVEMENT_LABELS: Record<MovementType, string> = {
  entry: "Entrada",
  exit: "Saída",
  adjustment: "Ajuste",
  loss: "Perda",
  sale: "Venda",
};

const MOVEMENT_BADGE: Record<MovementType, string> = {
  entry: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  exit: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  adjustment:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  loss: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  sale: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
};

const movementSchema = z.object({
  productId: z.string().min(1, "Produto obrigatório"),
  type: z.enum(["entry", "exit", "adjustment", "loss"], {
    required_error: "Tipo obrigatório",
  }),
  quantity: z.coerce.number().int().min(1, "Quantidade mínima: 1"),
  observation: z.string().optional(),
});

type MovementFormValues = z.infer<typeof movementSchema>;

const StockPage = () => {
  const { isManager } = useAuthStore();
  const manager = isManager();
  const [modalOpen, setModalOpen] = useState(false);
  const [filterProductId, setFilterProductId] = useState<string>("all");

  const { data: movements = [], isLoading: movementsLoading } =
    useStockMovements(filterProductId === "all" ? undefined : filterProductId);

  const { data: products = [], isLoading: productsLoading } = useProducts();

  const lowStockProducts = products.filter((p) => p.quantity <= 5 && p.isActive);

  const createMovement = useCreateMovement();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MovementFormValues>({
    resolver: zodResolver(movementSchema),
  });

  const handleClose = () => {
    reset();
    setModalOpen(false);
  };

  const onSubmit = async (values: MovementFormValues) => {
    try {
      await createMovement.mutateAsync({
        ...values,
        type: values.type as MovementType,
        observation: values.observation || undefined,
      });
      toast.success("Movimentação registrada com sucesso.");
      handleClose();
    } catch {
      toast.error("Erro ao registrar movimentação.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Estoque</h1>
        {manager && (
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="size-4" />
            Registrar movimentação
          </Button>
        )}
      </div>

      {/* Alertas de estoque baixo */}
      {lowStockProducts.length > 0 && (
        <div className="flex flex-col gap-3">
          <Alert variant="destructive">
            <AlertTriangle />
            <AlertTitle>Estoque baixo</AlertTitle>
            <AlertDescription>
              {lowStockProducts.length} produto(s) com estoque crítico (≤ 5
              unidades).
            </AlertDescription>
          </Alert>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {productsLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20" />
                ))
              : lowStockProducts.map((p) => (
                  <Card key={p.id} size="sm">
                    <CardHeader className="pb-1">
                      <CardTitle className="text-sm font-medium">
                        {p.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {p.code}
                      </span>
                      <Badge variant="destructive">{p.quantity} un</Badge>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      )}

      {/* Filtro por produto */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <Label className="shrink-0">Filtrar por produto</Label>
        <Select
          value={filterProductId}
          onValueChange={setFilterProductId}
        >
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="Todos os produtos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os produtos</SelectItem>
            {products.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name} ({p.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabela de movimentações */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data/hora</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Quantidade</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Observação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movementsLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {!movementsLoading && movements.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-muted-foreground"
                >
                  Nenhuma movimentação encontrada.
                </TableCell>
              </TableRow>
            )}

            {!movementsLoading &&
              movements.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatDateTime(m.createdAt)}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-sm">{m.product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {m.product.code}
                    </p>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${MOVEMENT_BADGE[m.type]}`}
                    >
                      {MOVEMENT_LABELS[m.type]}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {m.quantity}
                  </TableCell>
                  <TableCell className="text-sm capitalize">
                    {m.responsible.name}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                    {m.observation ?? "—"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal de movimentação */}
      <Dialog open={modalOpen} onOpenChange={(o) => !o && handleClose()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Registrar movimentação</DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Produto *</Label>
              <Controller
                control={control}
                name="productId"
                render={({ field }) => (
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o produto..." />
                    </SelectTrigger>
                    <SelectContent>
                      {products
                        .filter((p) => p.isActive)
                        .map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name} ({p.code})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.productId && (
                <p className="text-xs text-destructive">
                  {errors.productId.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Tipo *</Label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entrada</SelectItem>
                      <SelectItem value="exit">Saída</SelectItem>
                      <SelectItem value="adjustment">Ajuste</SelectItem>
                      <SelectItem value="loss">Perda</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && (
                <p className="text-xs text-destructive">{errors.type.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="quantity">Quantidade *</Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                step={1}
                placeholder="1"
                {...register("quantity")}
              />
              {errors.quantity && (
                <p className="text-xs text-destructive">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="observation">Observação (opcional)</Label>
              <textarea
                id="observation"
                rows={3}
                placeholder="Motivo ou detalhes..."
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                {...register("observation")}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={createMovement.isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={createMovement.isPending}>
                {createMovement.isPending ? "Registrando..." : "Confirmar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StockPage;
