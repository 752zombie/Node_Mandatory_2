import { db } from "./createConnection.js";

await db.run("DELETE FROM courses");

await db.run("INSERT INTO courses (title, description, price) VALUES ('Javascript', 'In this course you will learn Javascript', 50)");
await db.run("INSERT INTO courses (title, description, price) VALUES ('Python', 'In this course you will learn Python', 50)");
await db.run("INSERT INTO courses (title, description, price) VALUES ('Web development', 'In this course you will learn about web development', 100)");
await db.run("INSERT INTO courses (title, description, price) VALUES ('Cooking', 'In this course you will how to cook great meals', 20)");
await db.run("INSERT INTO courses (title, description, price) VALUES ('Video editing', 'In this course you will to how make cool videos', 60)");
await db.run("INSERT INTO courses (title, description, price) VALUES ('Linear algebra', 'In this course you will linear algebra', 70)");
await db.run("INSERT INTO courses (title, description, price) VALUES ('3D rendering', 'In this course you will how modern 3D rendering works', 150)");

await db.close();