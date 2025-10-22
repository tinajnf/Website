// src/pages/projects/AboutPage.tsx
import {
  //   Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid"; // ✅ v7 Grid
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolIcon from "@mui/icons-material/School";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import AboutMe from "./images/aboutMe.png";
// import avatar from "../../images/avatar.jpg";

export default function AboutPage() {
  return (
    <Stack spacing={4}>
      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
          height: { xs: 220, sm: 280, md: 320 },
          boxShadow: 3,
        }}
      >
        <Box
          component="img"
          src={AboutMe}
          alt="About hero"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(20%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            position: "absolute",
            left: { xs: 16, sm: 24, md: 32 },
            bottom: { xs: 16, sm: 24, md: 32 },
          }}
        >
          {/* <Avatar
            src={avatar}
            alt="Tina Jannatifar"
            sx={{
              width: 72,
              height: 72,
              border: "2px solid white",
              boxShadow: 2,
            }}
          /> */}
          <Stack spacing={0.5}>
            <Typography variant="h5" sx={{ color: "white", fontWeight: 800 }}>
              Tina Jannatifar
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,.9)" }}>
              Front-end Engineer • React • TypeScript • MUI
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* INTRO + QUICK FACTS */}
      <Grid container spacing={3}>
        {/* Left column */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, color: "#000080", mb: 1 }}
              >
                Hi, I’m Tina 👋
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8, maxWidth: 70 / 0.0625 /* ~70ch */ }}
              >
                I’m Tina — a front-end engineer who loves React, TypeScript, and
                MUI. After high school, I enrolled at Los Angeles Pierce College
                in 2019 and transferred to the University of Southern California
                (USC), earning my B.S. in Computer Science in 2024. I started at
                EPCVIP as a software engineering intern in March 2024 and became
                a junior software engineer after graduation.
                <br />
                <br />
                In my free time I enjoy reading fantasy novels, building LEGO
                sets, and listening to true-crime podcasts. The most recent
                fantasy book I read was <em>Fourth Wing</em>.
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 2 }}>
                <Chip label="React" />
                <Chip label="TypeScript" />
                <Chip label="MUI" />
                <Chip label="Next.js (learning)" />
                <Chip label="Vite" />
                <Chip label="Node.js" />
                <Chip label="Javascript" />
                <Chip label="iOS" />
                <Chip label="Andriod" />
                <Chip label="Java" />
              </Stack>

              <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<EmailIcon />}
                  href="mailto:tinajannatifar22@gmail.com"
                >
                  Email
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  href="https://github.com/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Right column */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={3}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <WorkOutlineIcon color="primary" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Work
                  </Typography>
                </Stack>
                <Typography variant="body2">
                  <strong>EPCVIP</strong> — Junior Software Engineer
                  <br />
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                  >
                    2024 — Present
                  </Typography>
                </Typography>
                <Divider sx={{ my: 1.5 }} />
                <Typography variant="body2" color="text.secondary">
                  Building internal dashboards and data-heavy UIs using React,
                  TypeScript, React Query, and MUI Data Grid.
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <SchoolIcon color="primary" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Education
                  </Typography>
                </Stack>
                <Typography variant="body2">
                  <strong>USC</strong> — B.S. Computer Science
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  2022 — 2024
                </Typography>
                <Divider sx={{ my: 1.5 }} />
                <Typography variant="body2">
                  <strong>Los Angeles Pierce College</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  2019 — 2022
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <FavoriteBorderIcon color="primary" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Interests
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip label="Fantasy novels" size="small" />
                  <Chip label="LEGO" size="small" />
                  <Chip label="True-crime podcasts" size="small" />
                  <Chip label="UI/UX" size="small" />
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
