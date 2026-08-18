import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { useNavigate } from "react-router-dom";

import api from "../api/api";
import type{ Product } from "../types/product";

interface Props {
  product: Product;
  refreshProducts: () => void;
}

function ProductCard({ product, refreshProducts }: Props) {
  const navigate = useNavigate();

  async function reserveProduct() {
    try {
      const response = await api.post("/reservations", {
        productId: product.id,
        quantity: 1,
      });

      refreshProducts();

      navigate(`/reservation/${response.data.id}`);
    } catch (error) {
      console.error(error);
      alert("Reservation failed");
    }
  }

  return (
    <Card
      elevation={4}
      sx={{
  borderRadius: 4,
  height: "100%",
  transition: "0.3s",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: 12,
  },
}}
    >
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5">
            {product.name}
          </Typography>

          <Typography color="text.secondary">
            {product.description}
          </Typography>

        <Typography
  variant="h5"
  sx={{
    color: "primary.main",
    fontWeight: "bold",
  }}
>
  € {product.price}
</Typography>

          <Chip
            icon={<Inventory2Icon />}
            label={`Stock : ${product.stock}`}
            color={product.stock > 0 ? "success" : "error"}
          />

          <Button
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            disabled={product.stock === 0}
            onClick={reserveProduct}
          >
            {product.stock === 0
  ? "Out of Stock"
  : "Reserve"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProductCard;