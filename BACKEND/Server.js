import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import { connect_MONGO_DB} from "./db/connect_MONGO_DB.js";
const app = express();
dotenv.config ()
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.use("/api/auth",authRoutes)

// app.get("/",(req,res) =>{
// //  root route http://localhost:5000/
// res.send("hello wrold!") 
// })
app.listen(PORT,()=>{
     console.log(`Server Runing on port ${PORT}`);
     connect_MONGO_DB()
});

app.use("/api/auth",authRoutes)


