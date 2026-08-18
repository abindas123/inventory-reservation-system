import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import api from "../api/api";
import Timer from "../components/Timer";
import type { Reservation } from "../types/reservation";

function ReservationPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [reservation, setReservation] = useState<Reservation | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState("");
const [snackbarSeverity, setSnackbarSeverity] = useState<
  "success" | "error"
>("success");
 useEffect(() => {
  fetchReservation();

  const interval = setInterval(() => {
    fetchReservation();
  }, 5000);

  return () => clearInterval(interval);
}, []);

  async function fetchReservation() {
    const response = await api.get(`/reservations/${id}`);
    setReservation(response.data);
  }

 async function completeOrder() {
  try {
    await api.post("/orders", {
      reservationId: id,
    });

    setSnackbarMessage("Order confirmed successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);

    setTimeout(() => {
      navigate("/");
    }, 1500);
  } catch (error) {
    setSnackbarMessage("Failed to complete order.");
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  }
}

  if (!reservation)
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
<Card
  elevation={6}
  sx={{
    borderRadius: 4,
  }}
>
        <CardContent>
          <Stack spacing={3}>
            <Typography
              variant="h4"
              align="center"
            >
              Reservation
            </Typography>

            <Typography variant="h5">
              {reservation.product.name}
            </Typography>

            <Typography color="text.secondary">
              {reservation.product.description}
            </Typography>

            <Typography variant="h6">
              € {reservation.product.price}
            </Typography>

            <Typography>
              Quantity : {reservation.quantity}
            </Typography>

           <Box
  sx={{
    display: "flex",
    justifyContent: "center",
  }}
>
              <Chip
                icon={<CheckCircleIcon />}
                label={reservation.status}
                color={
                  reservation.status === "RESERVED"
                    ? "warning"
                    : reservation.status === "COMPLETED"
                    ? "success"
                    : "error"
                }
              />
            </Box>

            <Timer expiresAt={reservation.expiresAt} />

            {reservation.status === "RESERVED" ? (
  <Button
    size="large"
    variant="contained"
    startIcon={<ShoppingCartCheckoutIcon />}
    onClick={completeOrder}
  >
    Complete Order
  </Button>
) : (
  <Alert
    severity={
      reservation.status === "COMPLETED"
        ? "success"
        : "warning"
    }
  >
    {reservation.status === "COMPLETED"
      ? "Order completed successfully."
      : "Reservation has expired."}
  </Alert>
)}
          </Stack>
        </CardContent>
      </Card>
      <Snackbar
  open={snackbarOpen}
  autoHideDuration={3000}
  onClose={() => setSnackbarOpen(false)}
  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
>
  <Alert
    severity={snackbarSeverity}
    onClose={() => setSnackbarOpen(false)}
    variant="filled"
  >
    {snackbarMessage}
  </Alert>
</Snackbar>
    </Container>
  );
}

export default ReservationPage;