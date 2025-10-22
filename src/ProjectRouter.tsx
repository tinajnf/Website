// src/pages/ProjectRouter.tsx
import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { projects } from "./projects";
import { Box, Container, Stack, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Mini apps
import AboutPage from "./AboutPage";
import WeatherApp from "./WeatherApp";
import TodoApp from "./TodoApp";
// import ExpenseTrackerApp from "./ExpenseTrackerApp";

const componentsBySlug: Record<string, React.ComponentType> = {
  about: AboutPage,
  "weather-app": WeatherApp,
  "to-do-list": TodoApp,
  // "expense-tracker": ExpenseTrackerApp,
  // add more as you build them:
  // "restaurant-finder": RestaurantFinderApp,
  // "auth-with-firebase": AuthWithFirebasePage,
};

export default function ProjectRouter() {
  const { slug = "" } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h5" gutterBottom>
          Project not found
        </Typography>
        <Button component={RouterLink} to="/" startIcon={<ArrowBackIcon />}>
          Back to Projects
        </Button>
      </Container>
    );
  }

  const Component = componentsBySlug[slug];

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Button
            component={RouterLink}
            to="/"
            startIcon={<ArrowBackIcon />}
            sx={{ alignSelf: "flex-start" }}
          >
            Back to Projects
          </Button>

          <Typography variant="h4" sx={{ fontWeight: 800, color: "#000080" }}>
            {project.title}
          </Typography>

          {/* Each mini-app renders its own banner or layout now */}
          {Component ? (
            <Component />
          ) : (
            <Typography color="text.secondary">
              This project is coming soon.
            </Typography>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
