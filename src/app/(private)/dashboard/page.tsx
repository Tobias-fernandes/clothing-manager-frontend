"use client";

import Link from "next/link";
import {
  RefreshCw,
  TrendingUp,
  ShoppingBag,
  Package,
  AlertTriangle,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currency, formatDate, formatTime } from "@/lib/helpers";
import useDashboardPage from "./hooks/useDashboardPage";
import { PAYMENT_LABELS } from "./constants";
import { MetricCard } from "./_components/MetricCard";

const DashboardPage = () => {
  const {
    user,
    isManager,
    data,
    isLoading,
    isError,
    error,
    lowStockColor,
    balanceColor,
    refetch,
  } = useDashboardPage();


  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          {isLoading && <Skeleton className="mt-1 h-4 w-52" />}
          {!isLoading && data && (
            <p className="mt-1 text-sm capitalize text-muted-foreground">
              {formatDate(data.today)}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {user && (
            <span className="text-sm text-muted-foreground">
              Olá,{" "}
              <span className="font-medium text-foreground capitalize">
                {user.name}
              </span>
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCw className={cn(isLoading && "animate-spin")} />
            Atualizar
          </Button>
        </div>
      </div>

      {isError && (
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertTitle>Erro ao carregar</AlertTitle>
          <AlertDescription>{error?.message}</AlertDescription>
        </Alert>
      )}

      {isManager && data && data.stock.lowStockProducts > 0 && (
        <Alert>
          <AlertTriangle />
          <AlertTitle>Atenção: estoque baixo</AlertTitle>
          <AlertDescription>
            {data.stock.lowStockProducts} produto(s) com estoque abaixo do
            mínimo.{" "}
            <Link
              href="/dashboard/stock/low-stock"
              className="font-medium underline"
            >
              Ver produtos
            </Link>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total vendido hoje"
          value={(data && currency(data.sales.totalToday)) ?? null}
          icon={<TrendingUp className="size-4" />}
          color="green"
          loading={isLoading}
        />
        <MetricCard
          title="Vendas realizadas"
          value={(data && String(data.sales.countToday)) ?? null}
          icon={<ShoppingBag className="size-4" />}
          color="purple"
          loading={isLoading}
        />
        <MetricCard
          title="Produtos cadastrados"
          value={(data && String(data.stock.totalProducts)) ?? null}
          icon={<Package className="size-4" />}
          color="blue"
          loading={isLoading}
        />
        <MetricCard
          title="Estoque baixo"
          value={(data && String(data.stock.lowStockProducts)) ?? null}
          icon={<AlertTriangle className="size-4" />}
          color={lowStockColor}
          loading={isLoading}
        />
      </div>

      {isManager && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricCard
            title="Entradas do dia"
            value={(data && currency(data.finance.totalIncomeToday)) ?? null}
            icon={<ArrowUpCircle className="size-4" />}
            color="green"
            loading={isLoading}
          />
          <MetricCard
            title="Saídas do dia"
            value={(data && currency(data.finance.totalExpenseToday)) ?? null}
            icon={<ArrowDownCircle className="size-4" />}
            color="red"
            loading={isLoading}
          />
          <MetricCard
            title="Saldo"
            value={(data && currency(data.finance.balance)) ?? null}
            icon={<Wallet className="size-4" />}
            color={balanceColor}
            loading={isLoading}
          />
        </div>
      )}

      {!isLoading &&
        data &&
        Object.keys(data.sales.byPaymentMethod).length > 0 && (
          <div>
            <h2 className="mb-3 text-base font-semibold text-foreground">
              Vendas por forma de pagamento
            </h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(data.sales.byPaymentMethod).map(
                ([method, total]) => (
                  <Card key={method} size="sm" className="min-w-40">
                    <CardHeader className="pb-1">
                      <CardTitle className="text-xs font-medium text-muted-foreground">
                        {PAYMENT_LABELS[method] ?? method}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-bold text-foreground">
                        {currency(total)}
                      </p>
                    </CardContent>
                  </Card>
                ),
              )}
            </div>
          </div>
        )}

      <div>
        <h2 className="mb-3 text-base font-semibold text-foreground">
          Últimas vendas
        </h2>
        <Card className="p-0">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Horário</TableHead>
                  <TableHead>Funcionário</TableHead>
                  <TableHead>Forma de pagamento</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading &&
                  Array.from({ length: 4 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-14" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="ml-auto h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="ml-auto h-7 w-24" />
                      </TableCell>
                    </TableRow>
                  ))}
                {!isLoading &&
                  data &&
                  data.sales.lastSales.length > 0 &&
                  data.sales.lastSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatTime(sale.createdAt)}
                      </TableCell>
                      <TableCell>{sale.employee.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {PAYMENT_LABELS[sale.paymentMethod] ??
                            sale.paymentMethod}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {currency(sale.total)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/sales/${sale.id}`}>
                            Ver detalhes
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                {!isLoading && (!data || data.sales.lastSales.length === 0) && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-10 text-center text-muted-foreground"
                    >
                      Nenhuma venda registrada hoje.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
