import express from 'express';
const app = express();
app.use(express.static('client'));
app.listen(2500);
