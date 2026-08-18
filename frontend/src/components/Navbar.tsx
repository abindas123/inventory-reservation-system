import { AppBar, Toolbar, Typography } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";

function Navbar() {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Inventory2Icon sx={{ mr: 2 }} />

        <Typography
  variant="h6"
  sx={{
    fontWeight: "bold",
  }}
>
  Inventory Reservation System
</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;