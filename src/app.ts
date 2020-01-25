import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
	res.send('Hello, World!');
});

const PORT: number | null = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Currently listening in PORT ${PORT}`));
