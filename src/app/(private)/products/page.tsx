"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Ban } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProducts, useDeactivateProduct } from "@/resources/products.resource";
import { useAuthStore } from "@/store/auth.store";
import { currency } from "@/lib/helpers";
import { useDebouce } from "@/hooks/useDebounce";

const CATEGORY_LABELS: Record<string, string> = {
  shirt: "Camiseta",
  pants: "Calça",
  dress: "Vestido",
  shoe: "Calçado",
  accessory: "Acessório",
  other: "Outro",
};

const ProductsPage = () => {
  const { isManager } = useAuthStore();
  const manager = isManager();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouce(search);

  const { data: products = [], isLoading, isError } = useProducts(
    debouncedSearch || undefined,
  );
  const deactivate = useDeactivateProduct();

  const handleDeactivate = async (id: string, name: string) => {
    if (!confirm(`Deseja inativar o produto "${name}"?`)) return;
    try {
      await deactivate.mutateAsync(id);
      toast.success("Produto inativado com sucesso.");
    } catch {
      toast.error("Erro ao inativar produto.");
    }
  };

  const colSpan = manager ? 8 : 7;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Produtos</h1>
        {manager && (
          <Button asChild>
            <Link href="/products/novo">
              <Plus className="size-4" />
              Novo produto
            </Link>
          </Button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-8"
          placeholder="Buscar por nome ou código..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Tamanho</TableHead>
              <TableHead>Cor</TableHead>
              <TableHead className="text-right">Preço venda</TableHead>
              <TableHead className="text-right">Estoque</TableHead>
              {manager && <TableHead />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: colSpan }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {!isLoading && isError && (
              <TableRow>
                <TableCell
                  colSpan={colSpan}
                  className="py-10 text-center text-destructive"
                >
                  Erro ao carregar produtos.
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && products.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={colSpan}
                  className="py-10 text-center text-muted-foreground"
                >
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              !isError &&
              products.map((product) => (
                <TableRow
                  key={product.id}
                  className={
                    product.quantity <= 5
                      ? "bg-red-50/60 dark:bg-red-950/20"
                      : ""
                  }
                >
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {product.code}
                  </TableCell>
                  <TableCell>
                    {CATEGORY_LABELS[product.category] ?? product.category}
                  </TableCell>
                  <TableCell>{product.size}</TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell className="text-right">
                    {currency(product.salePrice)}
                  </TableCell>
                  <TableCell className="text-right">
                    {product.quantity <= 5 ? (
                      <Badge variant="destructive">{product.quantity}</Badge>
                    ) : (
                      <span>{product.quantity}</span>
                    )}
                  </TableCell>
                  {manager && (
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/products/${product.id}/editar`}>
                            <Pencil className="size-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() =>
                            handleDeactivate(product.id, product.name)
                          }
                          disabled={deactivate.isPending}
                        >
                          <Ban className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsPage;
