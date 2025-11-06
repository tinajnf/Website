// src/pages/ProjectsGrid.tsx
import {
  Box,
  Container,
  Stack,
  Typography,
  // Avatar,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";
import { projects } from "./projects";

// (optional) local avatar
// import avatarImg from "../images/avatar.jpg";

export default function ProjectsGrid() {
  return (
    <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={3} mb={6}>
          {/* <Avatar
            alt="Avatar"
            src={avatarImg}
            sx={{ width: 120, height: 120 }}
          /> */}
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: "bold", color: "#000080" }}
          >
            Hi! I’m Tina
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            Here are a few of my projects — click a card to see details.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              href="https://github.com/tinajnf/Website"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Button>
            <Button
              variant="outlined"
              startIcon={<EmailIcon />}
              href="mailto:tinajannatifar22@gmail.com"
            >
              Email
            </Button>
          </Stack>
        </Stack>

        <Masonry
          columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          spacing={2}
          sx={{ m: 0 }}
        >
          {projects.map((p) => (
            <Card
              key={p.slug}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 3,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
              }}
            >
              {/* 👇 INTERNAL NAVIGATION */}
              <CardActionArea
                component={Link}
                to={`/projects/${p.slug}`}
                sx={{ display: "block" }}
              >
                <CardMedia
                  component="img"
                  image={p.imageUrl} // local imported image
                  alt={p.title}
                  sx={{ width: "100%", display: "block", objectFit: "cover" }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                    color="#000080"
                  >
                    {p.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {p.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Masonry>

        <Typography
          variant="caption"
          display="block"
          align="center"
          color="#000080"
          sx={{ mt: 6 }}
        >
          © {new Date().getFullYear()} Tina Jannatifar — Built with React +
          TypeScript + MUI
        </Typography>
      </Container>
    </Box>
  );
}
