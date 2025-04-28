import express from "express";
import cors from "cors";
import countryRoutes from "./routes/countryRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use("/countries", countryRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
