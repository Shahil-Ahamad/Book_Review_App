import cookieParser from "cookie-parser";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

const PORT = 4000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
); 


createDBConnection()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "Welcome To Book Review App",
    data: null,
    isSuccess: true,
  });
});

//Global Error Handlerer

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    message: "something went wrong",
  });
});


// app.use((error: APIError, req: Request, res: Response, next: NextFunction) => {
//   console.error(error);
//   if (error instanceof APIError) {
//     res.status(error.status).json({
//       message: error.message,
//       data: null,
//       isSuccess: false,
//     });
//     return;
//   }
//   res.status(500).json({
//     message: "Internal server error",
//     data: null,
//     isSuccess: false,
//   });
// });

app.listen(env.PORT, () =>
  console.log(`Server started on: http://localhost:${env.PORT}`)
);
