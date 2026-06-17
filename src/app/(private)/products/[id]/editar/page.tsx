"use client";

import { use } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useProduct } from "@/resources/products.resource";
import { ProductForm } from "../../_components/ProductForm";

interface Props {
  params: Promise<{ id: string }>;
}

const EditProductPage = ({ params }: Props) => {
  const { id } = use(params);
  const { data: product, isLoading, isError } = useProduct(id);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 max-w-xl">
        <Skeleton className="h-8 w-48" />
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (isError || !product) {
    return (
      <Alert variant="destructive" className="max-w-xl">
        <AlertTriangle />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>Produto não encontrado.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">Editar produto</h1>
      <ProductForm product={product} />
    </div>
  );
};

export default EditProductPage;
