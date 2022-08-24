import express from "express"
import userRouter from "./routes/userRouters.js"
import boardRouter from "./routes/boardRouter.js"
import sectionRouter from "./routes/sectionRouter.js"
import taskRouter from "./routes/taskRouter.js";

import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("MongoDb is Connecting...")
    })
    .catch((err) => {
        console.log("err > ",err)
    })





app.use("/api", userRouter)
app.use("/api", boardRouter )
app.use("/api", sectionRouter)
app.use("/api", taskRouter)


app.listen(5000, () => {
    console.log("server is running...")
})