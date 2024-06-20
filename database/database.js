import * as SQLite from 'expo-sqlite';

export const setupDatabase = async () => {
    const db = await SQLite.openDatabaseAsync('Yellow-pouch.db');

    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            mobile TEXT NOT NULL,
            dob TEXT NOT NULL,
            password TEXT NOT NULL,
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL
        );
    `);

    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS Categories (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              image TEXT NOT NULL,
              createdBy TEXT NOT NULL,
              updatedBy TEXT NOT NULL
            );
    `);

    

    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS Items (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              categoryId INTEGER NOT NULL,
              name TEXT NOT NULL,
              description TEXT NOT NULL,
              quantity INTEGER NOT NULL,
              image TEXT NOT NULL,
              extraImages TEXT NOT NULL,
              FOREIGN KEY(categoryId) REFERENCES Categories(id)
            );
    `);

    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS userList (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              userId INTEGER NOT NULL,
              categoryId INTEGER NOT NULL,
              itemId INTEGER NOT NULL,
              itemName TEXT NOT NULL,
              status TEXT NOT NULL,
              createdBy INTEGER NOT NULL,
              updateBy TEXT NOT NULL,
              FOREIGN KEY(categoryId) REFERENCES Categories(id)
            );
    `);
    
    // ALTER TABLE userList ADD COLUMN itemName TEXT  NOT NULL;

    return db;
};