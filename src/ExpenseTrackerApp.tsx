import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  MenuItem,
} from "@mui/material";
// If you're on MUI v7 Grid2:
import Grid from "@mui/material/Grid";
// If using legacy Grid, switch to: import Grid from "@mui/material/Grid";
// and change `size={{ xs: 12, md: 6 }}` to `item xs={12} md={6}` below.
import DeleteIcon from "@mui/icons-material/Delete";

type Tx = { id: string; label: string; amount: number }; // income > 0, expense < 0
const STORAGE_KEY = "portfolio.expenses.v2";

// Parse amounts like "$1,234.56", "+100", "-50", etc.
const parseAmount = (raw: string) => {
  const cleaned = raw.replace(/[^0-9.+-]/g, "");
  const val = parseFloat(cleaned);
  return Number.isFinite(val) ? Math.round(val * 100) / 100 : NaN;
};

export default function ExpenseTrackerApp() {
  const [items, setItems] = useState<Tx[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const [kind, setKind] = useState<"income" | "expense">("expense");
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState<string>("");

  const [labelErr, setLabelErr] = useState<string | null>(null);
  const [amountErr, setAmountErr] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Totals
  const totals = useMemo(() => {
    const income = items
      .filter((i) => i.amount > 0)
      .reduce((s, i) => s + i.amount, 0);
    const expenseSum = items
      .filter((i) => i.amount < 0)
      .reduce((s, i) => s + i.amount, 0); // negative
    const totalExpensesAbs = Math.abs(expenseSum);
    const left = income - totalExpensesAbs;
    return { income, totalExpensesAbs, left };
  }, [items]);

  const add = () => {
    const trimmed = label.trim();
    const parsed = parseAmount(amount);

    let ok = true;

    // Require a label for both; change to (kind==="expense") if you only want label for expenses
    if (!trimmed) {
      setLabelErr("Enter a label");
      ok = false;
    } else setLabelErr(null);

    if (Number.isNaN(parsed) || parsed === 0) {
      setAmountErr("Enter a non-zero number");
      ok = false;
    } else setAmountErr(null);

    if (!ok) return;

    // Force sign by type; DO NOT auto-switch kind afterward
    const signed = kind === "expense" ? -Math.abs(parsed) : Math.abs(parsed);

    setItems((prev) => [
      {
        id: crypto?.randomUUID?.() ?? String(Date.now() + Math.random()),
        label: trimmed,
        amount: signed,
      },
      ...prev,
    ]);

    setLabel("");
    setAmount("");
    // ❌ removed: setKind("expense");
  };

  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const resetAll = () => setItems([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") add();
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
        Expense Tracker
      </Typography>

      <Grid container spacing={2}>
        {/* LEFT: input + history */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, borderRadius: 2, bgcolor: "background.paper" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              alignItems={{ xs: "stretch", sm: "flex-start" }}
            >
              <TextField
                select
                size="small"
                label="Type"
                value={kind}
                onChange={(e) =>
                  setKind(e.target.value as "income" | "expense")
                }
                sx={{ minWidth: 130 }}
              >
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </TextField>

              <TextField
                fullWidth
                size="small"
                label="Label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                onKeyDown={onKeyDown}
                error={!!labelErr}
                helperText={labelErr || " "}
              />

              <TextField
                size="small"
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={kind === "expense" ? "e.g. 50" : "e.g. 2000"}
                error={!!amountErr}
                helperText={
                  amountErr ||
                  (kind === "expense"
                    ? "Saved as negative (expense)"
                    : "Saved as positive (income)")
                }
                inputMode="decimal"
              />

              <Button variant="contained" onClick={add}>
                Add
              </Button>
            </Stack>

            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mt: 2 }}
            >
              History
            </Typography>

            <Paper variant="outlined" sx={{ mt: 1, borderRadius: 2 }}>
              <List dense>
                {items.map((i) => {
                  const sign = i.amount > 0 ? "+" : "-";
                  const abs = Math.abs(i.amount).toFixed(2);
                  return (
                    <ListItem
                      key={i.id}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => remove(i.id)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primaryTypographyProps={{
                          color: "text.primary",
                          fontWeight: 600,
                        }}
                        secondaryTypographyProps={{
                          sx: {
                            color: i.amount < 0 ? "error.main" : "success.main",
                            fontWeight: 700,
                          },
                        }}
                        primary={i.label}
                        secondary={`${sign}${abs}`}
                      />
                    </ListItem>
                  );
                })}
                {items.length === 0 && (
                  <ListItem>
                    <ListItemText
                      primary="No entries yet"
                      primaryTypographyProps={{ color: "text.secondary" }}
                    />
                  </ListItem>
                )}
              </List>
            </Paper>

            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1 }}>
              <Button size="small" variant="text" onClick={resetAll}>
                Reset all
              </Button>
            </Stack>
          </Paper>
        </Grid>

        {/* RIGHT: totals */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, borderRadius: 2, bgcolor: "background.paper" }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Income
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: "success.main" }}
              >
                ${totals.income.toFixed(2)}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle2" color="text.secondary">
                Total Expenses
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: "error.main" }}
              >
                ${totals.totalExpensesAbs.toFixed(2)}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle2" color="text.secondary">
                Left
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  color: totals.left >= 0 ? "success.main" : "error.main",
                }}
              >
                ${totals.left.toFixed(2)}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
