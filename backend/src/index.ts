import express from 'express';
import cors from "cors";
import { NODE_ENV, HOST,PORT, baseUrl, prisma } from "./config";
import routes from "../src/routes/Index";
import { validateLanguageParam } from '../../backend/src/middlewares/v1/validationMiddleware';

export const app = express();
app.use(cors());
app.use(express.json({limit:"10kb"}));

//Welcome Route
app.get('/', (req, res) => {
  res.status(200).json({message:'Hello to AV-Invoice!'});
});

app.get('/health', async (req, res) => {
    try{
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({message:"Healthy Instance"});
    }catch(error){
        console.error("Database Error:",error);
        res.status(500).json({message:"Database connection Error"});
    }
});

app.use("/api",validateLanguageParam, routes);

// app.use("/docs",swaggerRouter);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at ${baseUrl}`);
});


