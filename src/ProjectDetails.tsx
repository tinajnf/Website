import { useParams, Link as RouterLink } from "react-router-dom";
import { projects } from "./projects";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Chip,
  Card,
  CardMedia,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
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

          <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
            <CardMedia
              component="img"
              src={project.imageUrl}
              alt={project.title}
              sx={{ maxHeight: 480, objectFit: "cover" }}
            />
          </Card>

          <Typography variant="body1" color="text.secondary">
            {project.description ?? "Project description coming soon."}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip label="React" />
            <Chip label="TypeScript" />
            <Chip label="MUI" />
          </Stack>

          {/* optional repo button */}
          {project.repoUrl && (
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ alignSelf: "flex-start" }}
            >
              View Repository
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
