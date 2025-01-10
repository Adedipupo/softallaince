import express from 'express';
import usersRoute from "./users";


const router = express.Router();

// controllers for users route
router.use("/users", usersRoute);


export default router;
