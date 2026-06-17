"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateProduct,
  useUpdateProduct,
  type Product,
} from "@/resources/products.resource";

const productSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  code: z.string().min(1, "Código obrigatório"),
  category: z.enum(["shirt", "pants", "dress", "shoe", "accessory", "other"], {
    required_error: "Categoria obrigatória",
  }),
  size: z.string().min(1, "Tamanho obrigatório"),
  color: z.string().min(1, "Cor obrigatória"),
  costPrice: z.coerce.number({ invalid_type_error: "Valor inválido" }).min(0),
  salePrice: z.coerce
    .number({ invalid_type_error: "Valor inválido" })
    .min(0.01, "Preço de venda obrigatório"),
  quantity: z.coerce.number().int().min(0).optional(),
  description: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
  const router = useRouter();
  const isEditing = !!product;

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          code: product.code,
          category: product.category as ProductFormValues["category"],
          size: product.size,
          color: product.color,
          costPrice: product.costPrice,
          salePrice: product.salePrice,
          description: product.description ?? "",
        }
      : { costPrice: 0, quantity: 0 },
  });

  const categoryValue = watch("category");

  useEffect(() => {
    if (product) {
      setValue(
        "category",
        product.category as ProductFormValues["category"],
      );
    }
  }, [product, setValue]);

  const onSubmit = async (values: ProductFormValues) => {
    try {
      if (isEditing) {
        const { quantity: _q, ...rest } = values;
        await updateProduct.mutateAsync({ id: product.id, ...rest });
        toast.success("Produto atualizado com sucesso.");
      } else {
        await createProduct.mutateAsync({
          ...values,
          quantity: values.quantity ?? 0,
          description: values.description || undefined,
        });
        toast.success("Produto cadastrado com sucesso.");
      }
      router.push("/products");
    } catch (err: unknown) {
      const msg =
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data
          ? String(err.response.data.message)
          : "Erro ao salvar produto.";
      toast.error(msg);
    }
  };

  const isPending = createProduct.isPending || updateProduct.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-xl">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Nome *</Label>
        <Input id="name" placeholder="Ex: Camiseta Básica" {...register("name")} />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="code">Código *</Label>
        <Input id="code" placeholder="Ex: CAM-001" {...register("code")} />
        {errors.code && (
          <p className="text-xs text-destructive">{errors.code.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Categoria *</Label>
        <Select
          value={categoryValue ?? ""}
          onValueChange={(v) =>
            setValue("category", v as ProductFormValues["category"], {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="shirt">Camiseta</SelectItem>
            <SelectItem value="pants">Calça</SelectItem>
            <SelectItem value="dress">Vestido</SelectItem>
            <SelectItem value="shoe">Calçado</SelectItem>
            <SelectItem value="accessory">Acessório</SelectItem>
            <SelectItem value="other">Outro</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-xs text-destructive">{errors.category.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="size">Tamanho *</Label>
          <Input id="size" placeholder="Ex: M, G, 38" {...register("size")} />
          {errors.size && (
            <p className="text-xs text-destructive">{errors.size.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="color">Cor *</Label>
          <Input id="color" placeholder="Ex: Azul" {...register("color")} />
          {errors.color && (
            <p className="text-xs text-destructive">{errors.color.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="costPrice">Preço de custo (R$)</Label>
          <Input
            id="costPrice"
            type="number"
            step="0.01"
            min={0}
            placeholder="0,00"
            {...register("costPrice")}
          />
          {errors.costPrice && (
            <p className="text-xs text-destructive">{errors.costPrice.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="salePrice">Preço de venda (R$) *</Label>
          <Input
            id="salePrice"
            type="number"
            step="0.01"
            min={0}
            placeholder="0,00"
            {...register("salePrice")}
          />
          {errors.salePrice && (
            <p className="text-xs text-destructive">{errors.salePrice.message}</p>
          )}
        </div>
      </div>

      {!isEditing && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="quantity">Estoque inicial</Label>
          <Input
            id="quantity"
            type="number"
            min={0}
            step={1}
            placeholder="0"
            {...register("quantity")}
          />
          {errors.quantity && (
            <p className="text-xs text-destructive">{errors.quantity.message}</p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Descrição (opcional)</Label>
        <textarea
          id="description"
          rows={3}
          placeholder="Observações sobre o produto..."
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
          {...register("description")}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/products")}
          disabled={isPending}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Salvando..."
            : isEditing
              ? "Salvar alterações"
              : "Cadastrar produto"}
        </Button>
      </div>
    </form>
  );
};

export { ProductForm };
