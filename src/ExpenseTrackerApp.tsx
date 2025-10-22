// import { useEffect, useMemo, useState } from "react";
// import {
//   Box,
//   Button,
//   Divider,
//   Grid,
//   Stack,
//   TextField,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

// type Tx = { id: string; label: string; amount: number }; // income positive, expense negative
// const STORAGE_KEY = "portfolio.expenses";

// export default function ExpenseTrackerApp() {
//   const [items, setItems] = useState<Tx[]>(() => {
//     try {
//       return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
//     } catch {
//       return [];
//     }
//   });
//   const [label, setLabel] = useState("");
//   const [amount, setAmount] = useState<string>("");

//   useEffect(() => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
//   }, [items]);

//   const totals = useMemo(() => {
//     const income = items
//       .filter((i) => i.amount > 0)
//       .reduce((s, i) => s + i.amount, 0);
//     const expense = items
//       .filter((i) => i.amount < 0)
//       .reduce((s, i) => s + i.amount, 0);
//     return { income, expense, balance: income + expense };
//   }, [items]);

//   const add = () => {
//     const amt = Number(amount);
//     if (!label.trim() || Number.isNaN(amt) || amt === 0) return;
//     setItems((prev) => [
//       {
//         id: crypto.randomUUID(),
//         label: label.trim(),
//         amount: Math.round(amt * 100) / 100,
//       },
//       ...prev,
//     ]);
//     setLabel("");
//     setAmount("");
//   };

//   const remove = (id: string) =>
//     setItems((prev) => prev.filter((i) => i.id !== id));

//   return (
//     <Stack spacing={2}>
//       <Typography variant="h6" sx={{ fontWeight: 700 }}>
//         Expense Tracker
//       </Typography>

//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <Stack direction="row" spacing={1}>
//             <TextField
//               fullWidth
//               size="small"
//               label="Label"
//               value={label}
//               onChange={(e) => setLabel(e.target.value)}
//             />
//             <TextField
//               size="small"
//               label="Amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               placeholder="+100 or -50"
//             />
//             <Button variant="contained" onClick={add}>
//               Add
//             </Button>
//           </Stack>

//           <List dense sx={{ mt: 2 }}>
//             {items.map((i) => (
//               <ListItem
//                 key={i.id}
//                 secondaryAction={
//                   <IconButton edge="end" onClick={() => remove(i.id)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 }
//               >
//                 <ListItemText
//                   primary={i.label}
//                   secondary={i.amount.toFixed(2)}
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Box sx={{ p: 2, borderRadius: 2, bgcolor: "background.paper" }}>
//             <Typography variant="subtitle2" color="text.secondary">
//               Income
//             </Typography>
//             <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
//               ${totals.income.toFixed(2)}
//             </Typography>
//             <Divider sx={{ my: 1 }} />
//             <Typography variant="subtitle2" color="text.secondary">
//               Expenses
//             </Typography>
//             <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
//               ${Math.abs(totals.expense).toFixed(2)}
//             </Typography>
//             <Divider sx={{ my: 1 }} />
//             <Typography variant="subtitle2" color="text.secondary">
//               Balance
//             </Typography>
//             <Typography variant="h4" sx={{ fontWeight: 900 }}>
//               ${totals.balance.toFixed(2)}
//             </Typography>
//           </Box>
//         </Grid>
//       </Grid>
//     </Stack>
//   );
// }
