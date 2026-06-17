"use client";

import { useState } from "react";
import { Plus, ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
import {
  useFinanceEntries,
  useFinanceSummary,
  useCreateFinanceEntry,
  type EntryType,
  type EntryCategory,
} from "@/resources/finance.resource";
import { currency, formatDateTime } from "@/lib/helpers";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<EntryCategory, string> = {
  sale: "Venda",
  supplier: "Fornecedor",
  maintenance: "Manutenção",
  salary: "Salário",
  other: "Outro",
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function firstOfMonthISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
}

const entrySchema = z.object({
  type: z.enum(["income", "expense"], { required_error: "Tipo obrigatório" }),
  category: z.enum(["supplier", "maintenance", "salary", "other"], {
    required_error: "Categoria obrigatória",
  }),
  description: z.string().min(1, "Descrição obrigatória"),
  amount: z.coerce
    .number({ invalid_type_error: "Valor inválido" })
    .min(0.01, "Valor deve ser maior que zero"),
});

type EntryFormValues = z.infer<typeof entrySchema>;

const FinancePage = () => {
  const [startDate, setStartDate] = useState(firstOfMonthISO());
  const [endDate, setEndDate] = useState(todayISO());
  const [typeFilter, setTypeFilter] = useState<"all" | EntryType>("all");
  const [modalOpen, setModalOpen] = useState(false);

  const filters = {
    startDate,
    endDate,
    type: typeFilter === "all" ? undefined : typeFilter,
  };

  const { data: summary, isLoading: summaryLoading } =
    useFinanceSummary({ startDate, endDate });
  const { data: entries = [], isLoading: entriesLoading } =
    useFinanceEntries(filters);

  const createEntry = useCreateFinanceEntry();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EntryFormValues>({
    resolver: zodResolver(entrySchema),
  });

  const handleClose = () => {
    reset();
    setModalOpen(false);
  };

  const onSubmit = async (values: EntryFormValues) => {
    try {
      await createEntry.mutateAsync({
        ...values,
        category: values.category as EntryCategory,
      });
      toast.success("Lançamento registrado com sucesso.");
      handleClose();
    } catch {
      toast.error("Erro ao registrar lançamento.");
    }
  };

  const balanceColor =
    !summary || summary.balance >= 0 ? "text-green-600" : "text-destructive";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Financeiro</h1>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="size-4" />
          Novo lançamento
        </Button>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card size="sm">
          <CardHeader className="pb-1 flex flex-row items-center gap-2">
            <ArrowUpCircle className="size-4 text-green-600" />
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total entradas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {summaryLoading ? (
              <Skeleton className="h-7 w-32" />
            ) : (
              <p className="text-2xl font-bold text-green-600">
                {currency(summary?.totalIncome ?? 0)}
              </p>
            )}
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader className="pb-1 flex flex-row items-center gap-2">
            <ArrowDownCircle className="size-4 text-destructive" />
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total saídas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {summaryLoading ? (
              <Skeleton className="h-7 w-32" />
            ) : (
              <p className="text-2xl font-bold text-destructive">
                {currency(summary?.totalExpense ?? 0)}
              </p>
            )}
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader className="pb-1 flex flex-row items-center gap-2">
            <Wallet className="size-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Saldo do período
            </CardTitle>
          </CardHeader>
          <CardContent>
            {summaryLoading ? (
              <Skeleton className="h-7 w-32" />
            ) : (
              <p className={cn("text-2xl font-bold", balanceColor)}>
                {currency(summary?.balance ?? 0)}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex flex-col gap-1">
          <Label htmlFor="startDate">De</Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-40"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="endDate">Até</Label>
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-40"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Tipo</Label>
          <Select
            value={typeFilter}
            onValueChange={(v) => setTypeFilter(v as "all" | EntryType)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="income">Entradas</SelectItem>
              <SelectItem value="expense">Saídas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabela de lançamentos */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data/hora</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entriesLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {!entriesLoading && entries.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-muted-foreground"
                >
                  Nenhum lançamento no período.
                </TableCell>
              </TableRow>
            )}

            {!entriesLoading &&
              entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatDateTime(entry.createdAt)}
                  </TableCell>
                  <TableCell>
                    {entry.type === "income" ? (
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
                        Entrada
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">
                        Saída
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">
                    {CATEGORY_LABELS[entry.category]}
                  </TableCell>
                  <TableCell className="text-sm">
                    <span>{entry.description}</span>
                    {entry.saleId && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Automático
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm capitalize">
                    {entry.responsible.name}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right font-medium",
                      entry.type === "income"
                        ? "text-green-600"
                        : "text-destructive",
                    )}
                  >
                    {entry.type === "expense" ? "- " : ""}
                    {currency(entry.amount)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal novo lançamento */}
      <Dialog open={modalOpen} onOpenChange={(o) => !o && handleClose()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Novo lançamento</DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Tipo *</Label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Entrada</SelectItem>
                      <SelectItem value="expense">Saída</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && (
                <p className="text-xs text-destructive">{errors.type.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Categoria *</Label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supplier">Fornecedor</SelectItem>
                      <SelectItem value="maintenance">Manutenção</SelectItem>
                      <SelectItem value="salary">Salário</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-xs text-destructive">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Descrição *</Label>
              <Input
                id="description"
                placeholder="Ex: Pagamento fornecedor X"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="amount">Valor (R$) *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min={0.01}
                placeholder="0,00"
                {...register("amount")}
              />
              {errors.amount && (
                <p className="text-xs text-destructive">
                  {errors.amount.message}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={createEntry.isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={createEntry.isPending}>
                {createEntry.isPending ? "Salvando..." : "Confirmar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinancePage;
