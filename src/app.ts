import createError, { HttpError } from 'http-errors';
import express,{ Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import logger from 'morgan'
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import indexRouter from "./routes/index";
import connectDB from "./config/db";


dotenv.config();

connectDB();


const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["*"],
    optionsSuccessStatus: 200,
    credentials: true,
  }),
)
app.use(express.static(path.join(__dirname, 'public')));

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// if (process.env.NODE_ENV === 'production') {
//   app.use(morgan('combined', { stream: accessLogStream }))
// } else {
  app.use(morgan('dev'))
// }

app.get("/", (_req: Request, res: Response) => {
  res.redirect("/api/v1/softallaince-api");
});

//= = Root Route ==============
app.use("/api/v1", indexRouter);

// catch 404 and forward to error handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
// error handler
app.use((err: HttpError, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
