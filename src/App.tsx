import {
  Box,
  Container,
  Stack,
  Typography,
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

type Project = {
  title: string;
  repoUrl: string;
  imageUrl: string;
  description?: string;
};

const projects: Project[] = [
  {
    title: "About",
    repoUrl: "https://github.com/your-username/project-three",
    imageUrl: "https://placehold.co/600x700",
    description: "Another cool thing you built.",
  },
  {
    title: "Weather App",
    repoUrl: "https://github.com/your-username/project-one",
    imageUrl: "https://placehold.co/600x500",
    description: "Short blurb about what this project does.",
  },
  {
    title: "To Do List",
    repoUrl: "https://github.com/your-username/project-two",
    imageUrl: "https://placehold.co/600x300",
    description: "Tech stack or highlight feature.",
  },
  {
    title: "Expense Tracker",
    repoUrl: "https://github.com/your-username/project-four",
    imageUrl: "https://placehold.co/600x400",
    description: "This one’s a bit taller with extra content!",
  },
  {
    title: "Restautrant Finder",
    repoUrl: "https://github.com/your-username/project-five",
    imageUrl: "https://placehold.co/600x600",
    description: "Dynamic layout—each box has a different height.",
  },
  {
    title: "Authentication with Firebase",
    repoUrl: "https://github.com/your-username/project-two",
    imageUrl: "https://placehold.co/600x300",
    description: "Tech stack or highlight feature.",
  },
  {
    title: "To Do List",
    repoUrl: "https://github.com/your-username/project-two",
    imageUrl: "https://placehold.co/600x300",
    description: "Tech stack or highlight feature.",
  },
  {
    title: "To Do List",
    repoUrl: "https://github.com/your-username/project-two",
    imageUrl: "https://placehold.co/600x300",
    description: "Tech stack or highlight feature.",
  },
];

export default function App() {
  return (
    <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={3} mb={6}>
          <Avatar
            alt="Avatar"
            src="https://placehold.co/200x200"
            sx={{ width: 120, height: 120 }}
          />
          <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
            Hi! I’m Tina
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            Here are a few of my projects — each box links to a GitHub
            repository.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Button>
            <Button
              variant="outlined"
              startIcon={<EmailIcon />}
              href="tinajannatifar22@gmail.com"
            >
              Email
            </Button>
          </Stack>
        </Stack>

        <Masonry
          columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          spacing={2}
          sx={{
            m: 0,
          }}
        >
          {projects.map((p) => (
            <Card
              key={p.title}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 3,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea
                component="a"
                href={p.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardMedia
                  component="img"
                  image={p.imageUrl}
                  alt={p.title}
                  sx={{
                    width: "100%",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
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
          color="text.secondary"
          sx={{ mt: 6 }}
        >
          © {new Date().getFullYear()} Your Name — Built with React + TypeScript
          + MUI
        </Typography>
      </Container>
    </Box>
  );
}
