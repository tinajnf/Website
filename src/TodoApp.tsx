import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Todo = { id: string; text: string; done: boolean };
const STORAGE_KEY = "portfolio.todo";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const remaining = useMemo(() => todos.filter((t) => !t.done).length, [todos]);

  const add = () => {
    const t = text.trim();
    if (!t) return;
    setTodos((prev) => [
      { id: crypto.randomUUID(), text: t, done: false },
      ...prev,
    ]);
    setText("");
  };

  const toggle = (id: string) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  const remove = (id: string) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));
  const clearDone = () => setTodos((prev) => prev.filter((t) => !t.done));

  return (
    <Stack spacing={2}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        To-Do
      </Typography>
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          size="small"
          placeholder="Add a task…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
        />
        <Button variant="contained" onClick={add}>
          Add
        </Button>
      </Stack>

      <Box>
        <Typography variant="caption" color="text.secondary">
          {remaining} remaining • {todos.length} total
        </Typography>
      </Box>

      <List dense>
        {todos.map((t) => (
          <ListItem
            key={t.id}
            secondaryAction={
              <IconButton
                edge="end"
                onClick={() => remove(t.id)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <Checkbox checked={t.done} onChange={() => toggle(t.id)} />
            <ListItemText
              primary={t.text}
              sx={{
                textDecoration: t.done ? "line-through" : "none",
                color: t.done ? "text.disabled" : "inherit",
              }}
            />
          </ListItem>
        ))}
      </List>

      <Button variant="text" onClick={clearDone}>
        Clear completed
      </Button>
    </Stack>
  );
}
