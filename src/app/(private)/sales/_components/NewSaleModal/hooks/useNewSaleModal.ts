import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useProducts } from "@/resources/products.resource";
import { useCreateSale } from "@/resources/sales.resource";
import { newSaleSchema } from "@/lib/validations/new-sale.schema";
import type { CartItem, NewSaleFormValues } from "../../../types";
import type { Product } from "@/resources/products.resource";
import { useDebouce } from "@/hooks/useDebounce";

const useNewSaleModal = (onClose: () => void) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const createSale = useCreateSale();

  const debouncedSearch = useDebouce(searchQuery);

  const { data: searchResults = [], isFetching: searchLoading } = useProducts(
    debouncedSearch || undefined,
  );

  const activeResults = searchResults.filter((product) => product.isActive);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewSaleFormValues>({
    resolver: zodResolver(newSaleSchema),
    defaultValues: { paymentMethod: undefined, installments: null },
  });

  const paymentMethod = useWatch({ control, name: "paymentMethod" });

  const canSubmit =
    cart.length > 0 && paymentMethod !== undefined && !createSale.isPending;

  const handleClose = () => {
    reset({ paymentMethod: undefined, installments: null });
    setCart([]);
    setSearchQuery("");
    onClose();
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((card) => card.product.id === product.id);
      if (existing) {
        return prev.map((card) =>
          card.product.id === product.id
            ? {
                ...card,
                quantity: Math.min(card.quantity + 1, product.quantity),
              }
            : card,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQty = (productId: string, qty: number) => {
    setCart((prev) =>
      prev.map((card) => {
        if (card.product.id !== productId) return card;
        const clamped = Math.max(1, Math.min(qty, card.product.quantity));
        return { ...card, quantity: clamped };
      }),
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((card) => card.product.id !== productId));
  };

  const cartTotal = cart.reduce(
    (sum, card) => sum + card.product.salePrice * card.quantity,
    0,
  );

  const onSubmit = async (values: NewSaleFormValues) => {
    if (cart.length === 0) return;
    try {
      await createSale.mutateAsync({
        ...values,
        installments:
          values.paymentMethod === "credit_card_installment"
            ? (values.installments ?? null)
            : null,
        items: cart.map((card) => ({
          productId: card.product.id,
          quantity: card.quantity,
        })),
      });
      toast.success("Venda registrada com sucesso!");
      handleClose();
    } catch {
      toast.error("Erro ao registrar venda. Tente novamente.");
    }
  };

  return {
    searchQuery,
    searchResults: activeResults,
    searchLoading,
    cart,
    cartTotal,
    control,
    errors,
    canSubmit,
    paymentMethod,
    createSale,

    setSearchQuery,
    handleSubmit,
    onSubmit,
    handleClose,
    addToCart,
    updateQty,
    removeFromCart,
  };
};

export default useNewSaleModal;
