
import app from './app';
import 'dotenv/config';
const port = process.env.port;

app.listen(port, () => { console.log("Server listening on port " + port) });