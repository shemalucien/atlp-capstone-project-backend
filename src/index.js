
import app from './app.js';
import 'dotenv/config';
const PORT = process.env.PORT || 5000;

app.listen(port, () => { console.log("Server listening on port " + port) });