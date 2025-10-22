// src/projects.tsx
export type Project = {
  title: string;
  slug: string; // used in /projects/:slug
  imageUrl: string; // imported local image
  description?: string;
  repoUrl?: string;
};

// import local images (paths relative to THIS file)
import aboutMe from "./images/aboutMe.png";
import weather from "./images/wheather.png"; // keep your filename
import toDoList from "./images/toDoList.png";
import expenseTracker from "./images/ExpenseTracker.png";
import restaurantFinder from "./images/restaurant-finder.jpg";
import bg from "./images/bg.jpg";

export const projects: Project[] = [
  {
    title: "About",
    slug: "about",
    imageUrl: aboutMe,
    description: "Who I am & what I do.",
  },
  {
    title: "Weather App",
    slug: "weather-app",
    imageUrl: weather,
    description: "Search current weather by city.",
  },
  {
    title: "To Do List",
    slug: "to-do-list",
    imageUrl: toDoList,
    description: "Add, check, and remove tasks.",
  },
  {
    title: "Expense Tracker",
    slug: "expense-tracker",
    imageUrl: expenseTracker,
    description: "Track income/expenses & balance.",
  },
  {
    title: "Restaurant Finder",
    slug: "restaurant-finder",
    imageUrl: restaurantFinder,
    description: "Coming soon!",
  },
  {
    title: "Authentication with Firebase",
    slug: "auth-with-firebase",
    imageUrl: bg,
    description: "Coming soon!",
  },
];
