import Express from "express";
import cors from 'cors';

const app = Express();

const PORT = 3000;

app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});