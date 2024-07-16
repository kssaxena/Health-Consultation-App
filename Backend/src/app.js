import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// routers
import userRouter from "./routes/patient.routes.js";
import doctorRouter from "./routes/doctor.routes.js";

app.use("/api/v1/patient", userRouter);
app.use("/api/v1/doctor", doctorRouter);

export { app };
