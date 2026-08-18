import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";

import api from "../api/api";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/product";

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
      >
        Inventory Reservation System
      </Typography>
      <Typography
  color="text.secondary"
  align="center"
  sx={{ mb: 4 }}
>
  {products.length} Products Available
</Typography>
        {products.length === 0 && (
  <Typography
    variant="h5"
    align="center"
    sx={{ mt: 8 }}
  >
    No products available.
  </Typography>
)}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid
            key={product.id}
            size={{ xs: 12, md: 6, lg: 4 }}
          >
            <ProductCard
              product={product}
              refreshProducts={fetchProducts}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProductsPage;