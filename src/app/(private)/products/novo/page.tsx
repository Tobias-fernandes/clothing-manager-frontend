"use client";

import { ProductForm } from "../_components/ProductForm";

const NewProductPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">Novo produto</h1>
      <ProductForm />
    </div>
  );
};

export default NewProductPage;
