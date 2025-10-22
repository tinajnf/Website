import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

const getWeatherIcon = (code: number) => {
  if ([0].includes(code)) return <WiDaySunny size={50} color="#fbc02d" />;
  if ([1, 2].includes(code)) return <WiCloud size={50} color="#90a4ae" />;
  if ([3].includes(code)) return <WiCloud size={50} color="#78909c" />;
  if ([45, 48].includes(code)) return <WiFog size={50} color="#9e9e9e" />;
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
    return <WiRain size={50} color="#42a5f5" />;
  if ([71, 73, 75, 77, 85, 86].includes(code))
    return <WiSnow size={50} color="#90caf9" />;
  if ([95, 96, 99].includes(code))
    return <WiThunderstorm size={50} color="#ef5350" />;
  return <WiCloud size={50} color="#90a4ae" />;
};

type WeatherData = {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    precipitation_probability: number;
    uv_index: number;
    weathercode: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    uv_index_max: number[];
    weathercode: number[];
  };
};

export default function WeatherApp() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lon: longitude });
      },
      () => setError("Unable to access your location.")
    );
  }, []);

  useEffect(() => {
    if (!location) return;
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://api.open-meteo.com/v1/forecast", {
          params: {
            latitude: location.lat,
            longitude: location.lon,
            current:
              "temperature_2m,apparent_temperature,precipitation_probability,uv_index,weathercode",
            daily:
              "temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,weathercode",
            timezone: "auto",
          },
        });
        setData(res.data);
      } catch {
        setError("Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [location]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return null;

  const { current, daily } = data;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        background: "linear-gradient(180deg, #e3f2fd 0%, #ffffff 100%)",
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight={800}
        gutterBottom
        color="#000080"
      >
        Weather Forecast
      </Typography>

      <Card
        sx={{
          mb: 4,
          mx: "auto",
          maxWidth: 400,
          textAlign: "center",
          boxShadow: 3,
          borderRadius: 3,
          py: 2,
          bgcolor: "#f9f9f9",
        }}
      >
        <CardContent>
          {getWeatherIcon(current.weathercode)}
          <Typography variant="h6" fontWeight={600} sx={{ color: "black" }}>
            Current Conditions
          </Typography>
          <Typography>Temperature: {current.temperature_2m}°C</Typography>
          <Typography>Feels Like: {current.apparent_temperature}°C</Typography>
          <Typography>UV Index: {current.uv_index}</Typography>
          <Typography>
            Chance of Rain: {current.precipitation_probability}%
          </Typography>
        </CardContent>
      </Card>

      <Typography
        variant="h5"
        textAlign="center"
        fontWeight={700}
        gutterBottom
        sx={{ color: "black" }}
      >
        7-Day Forecast
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {daily.time.map((day, i) => (
          <Grid key={day} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              sx={{
                textAlign: "center",
                py: 2,
                boxShadow: 2,
                borderRadius: 3,
                bgcolor: "#fff",
              }}
            >
              <CardContent>
                {getWeatherIcon(daily.weathercode[i])}
                <Typography fontWeight={600} sx={{ mb: 1 }}>
                  {new Date(day).toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
                <Typography>
                  High: {daily.temperature_2m_max[i]}°C / Low:{" "}
                  {daily.temperature_2m_min[i]}°C
                </Typography>
                <Typography>
                  Rain: {daily.precipitation_probability_max[i]}%
                </Typography>
                <Typography>UV: {daily.uv_index_max[i] ?? "N/A"}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
