import { useEffect, useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

interface Props {
  expiresAt: string;
}

function Timer({ expiresAt }: Props) {
  const TOTAL_SECONDS = 600; // 10 minutes

  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    function updateTimer() {
      const difference = Math.floor(
        (new Date(expiresAt).getTime() - Date.now()) / 1000
      );

      setSecondsLeft(Math.max(0, difference));
    }

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const progress = (secondsLeft / TOTAL_SECONDS) * 100;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">
        Time Remaining
      </Typography>

      <Typography
        variant="h4"
        color={secondsLeft > 60 ? "primary" : "error"}
      >
        {minutes}:{seconds.toString().padStart(2, "0")}
      </Typography>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ mt: 2, height: 10, borderRadius: 5 }}
      />
    </Box>
  );
}

export default Timer;