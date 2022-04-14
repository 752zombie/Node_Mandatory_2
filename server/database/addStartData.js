import { db } from "./createConnection.js";

await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    email VARCHAR(100) UNIQUE NOT NULL,
    password NOT NULL, 
    first_name NOT NULL, 
    last_name NOT NULL
    );`);

await db.close();