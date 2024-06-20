import { setupDatabase } from "../database";

let db;

setupDatabase().then(database => {
    db = database;
}).catch(error => {
    console.error('Database setup failed:', error);
});

export const saveCategory = async (name,image) => {
    // console.log(values);
    // const { name, image } = values;
    try {
        if (!db) {
            throw new Error('Database is not initialized 3');
        }
        await db.runAsync('INSERT INTO Categories (name, image, createdBy, updatedBy) VALUES (?, ?, datetime("now"), datetime("now"))',
            [name, image]);
    } catch (error) {
        console.error("Error saving User", error);
    }
};

export const getCategory = async () => {
    console.log(db);
    try {
        if (!db) {
            throw new Error('Database is not initialized 2');
        }
        const user = await db.getAllAsync('SELECT * FROM Categories');
        return user;
    } catch (error) {
        console.error("Error checking User", error);
    }
};

export const saveCatItem = async (values) => {
    console.log(values);
    const { categoryId,name,description,quantity,image,extraImages} = values;
    try {
        if (!db) {
            throw new Error('Database is not initialized ');
        }
        await db.runAsync('INSERT INTO Items (categoryId, name, description, quantity, image, extraImages) VALUES (?, ?,?, ?,?,?)',
            [categoryId,name, description,quantity,image,extraImages]);
    } catch (error) {
        console.error("Error checking User", error);
    }
};

export const getCatItem = async (CategoryId) => {
    console.log('categoryId:',CategoryId)
    try {
        if (!db) {
            throw new Error('Database is not initialized');
        }
        const items = await db.getAllAsync('SELECT * FROM Items WHERE categoryId = ?', [CategoryId]);
        return items;
    } catch (error) {
        console.error("Error checking User", error);
    }
};