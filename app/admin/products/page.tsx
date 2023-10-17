"use client";

import { ProductsTable } from './ProductsTable';
import { ProductForm } from './ProductForm';

export default function AdminPage() {
  return (
    <>
      <ProductForm />
      <ProductsTable />
    </>
  )
} 