import { setupDatabase } from "../database";

let db;

setupDatabase().then(database => {
    db = database;
}).catch(error => {
    console.error('Database setup failed:', error);
});

export const saveUser = async (values) => {
    console.log(values);
    const { fullName, email, mobile, dob, password } = values;
    try {
        if (!db) {
            throw new Error('Database is not initialized');
        }
        await db.runAsync('INSERT INTO user (name, email, mobile, dob, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, datetime("now"), datetime("now"))',
            [fullName, email, mobile, dob, password]);
    } catch (error) {
        console.error("Error saving User", error)
    }
};

export const checkUser = async (values) => {
    const { email, mobile } = values;
    try {
        if (!db) {
            throw new Error('Database is not initialized');
        }
        const user = await db.getFirstAsync('SELECT * FROM user WHERE email = ? OR mobile = ?', [email, mobile]);
        return user;
    } catch (error) {
        console.error("Error checking User", error);
    }
};

export const updateUser = async (values) => {
    console.log('Updating user with values:', values);
    const { id,fullName, mobile, dob } = values;
    try {
        if (!db) {
            throw new Error('Database is not initialized');
        }
        await db.runAsync(
            'UPDATE user SET name = ?, mobile = ?, dob = ?, updatedAt = datetime("now") WHERE id = ?',
            [fullName, mobile, dob, id]
        );
    } catch (error) {
        console.error("Error updating User", error);
    }
};

export const userLogin = async (values) => {
    const { email} = values;
    try {
        if (!db) {
            throw new Error('Database is not initialized');
        }
        const user = await db.getFirstAsync('SELECT * FROM user WHERE email = ?', [email]);
        return user;
    } catch (error) {
        console.error("Error checking User", error);
    }
};