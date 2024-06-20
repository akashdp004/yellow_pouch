import { setupDatabase } from "../database";

let db;

setupDatabase().then(database => {
    db = database;
}).catch(error => {
    console.error('Database setup failed:', error);
});


export const saveUserList = async (values) => {
    console.log(values);
    const { userId, categoryId, itemId, itemName, status } = values;
    try {
        if (!db) {
            throw new Error('Database is not initialized');
        }
        await db.runAsync('INSERT INTO userList (userId, categoryId, itemId, itemName, status, createdBy, updateBy) VALUES (?, ?, ?, ?, ?, datetime("now"), datetime("now"))',
            [userId, categoryId, itemId, itemName, status]);
            return true;
            console.log(`Item ${itemId} updated successfully`);
    } catch (error) {
        console.error("Error saving userList", error);
    }
};

export const getAllUserList = async (userId) => {
    console.log(db);
    try {
        if (!db) {
            throw new Error('Database is not initialized 2');
        }
        const userList = await db.getAllAsync('SELECT * FROM userList WHERE userId = ? AND status = ?', [userId, 0]);
        return userList;
    } catch (error) {
        console.error("Error checking userList", error);
    }
};

export const isItemInUserList = async (userId, itemId) => {
    try {
        if (!db) {
            throw new Error('Database is not initialized');
        }
        const result = await db.getFirstAsync('SELECT * FROM userList WHERE userId = ? AND itemId = ? AND status = ?', [userId, itemId, 0]);
        return !!result; // Return true if the item is found, otherwise false
    } catch (error) {
        console.error('Error checking if item is in user list:', error);
        throw error;
    }
};

export const RemoveUserListItem = async (itemId, status) => {
    try {
      if (!db) {
        throw new Error('Database is not initialized');
      }
  
      await db.runAsync(
        'UPDATE userList SET status = ?, updateBy = datetime("now") WHERE id = ?',
        [status, itemId]
      );
      
      console.log(`Item ${itemId} updated successfully`);
      
    } catch (error) {
      console.error('Error updating user list item:', error);
      throw error; // Optionally rethrow the error to handle it in the component
    }
  };