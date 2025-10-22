import { useState } from "react";
import {
  Alert,
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";

type Weather = { name: string; tempC: number; desc: string };

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);

  const key = import.meta.env.VITE_OPENWEATHER_KEY; // put your key in .env

  const search = async () => {
    setError(null);
    setData(null);
    const q = city.trim();
    if (!q) return;
    if (!key) {
      setError("Missing VITE_OPENWEATHER_KEY in .env");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          q
        )}&appid=${key}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const json = await res.json();
      setData({
        name: json.name,
        tempC: Math.round(json.main.temp),
        desc: json.weather?.[0]?.description ?? "",
      });
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Weather
      </Typography>
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search city…"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
        />
        <Button variant="contained" onClick={search} disabled={loading}>
          Go
        </Button>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
      {data && (
        <Card>
          <CardContent>
            <Typography variant="h6">{data.name}</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              {data.tempC}°C
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ textTransform: "capitalize" }}
            >
              {data.desc}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
