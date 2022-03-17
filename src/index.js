
import app from './app.js';
import 'dotenv/config';
const port = process.env.port||5000;

app.listen(port, () => { console.log("Server listening on port " + port) });