import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        mt: 6,
        py: 3,
        textAlign: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Typography color="text.secondary">
        Inventory Reservation System
      </Typography>

     <Typography variant="body2" color="text.secondary">
  Built with React • NestJS • Prisma • PostgreSQL
</Typography>

<Typography
  variant="caption"
  sx={{
    display: "block",
    mt: 1,
  }}
>
  © 2026 Abin Das
</Typography>
    </Box>
  );
}

export default Footer;