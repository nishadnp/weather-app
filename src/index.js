// src/index.js → Entry point

import "./styles/main.css";
import { initController } from "./ui/controller";

// Toggle between mock data and real API
let isMockMode = true;

// ----------------------
// 🔹 INIT APP
// ----------------------
initController(isMockMode);
