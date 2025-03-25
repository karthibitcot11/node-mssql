const pool = require('../config/dbConfig');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM Users');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Database query failed' });
    }
};

// Add a new user
const addUser = async (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ error: 'Username and email are required.' });
    }

    try {
        // Check if user already exists
        const [existingUser] = await pool.execute('SELECT * FROM Users WHERE Email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        // Insert new user
        await pool.execute('INSERT INTO Users (Name, Email) VALUES (?, ?)', [username, email]);

        res.status(201).json({ message: 'User added successfully!' });
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ error: 'Failed to insert user into database' });
    }
};

module.exports = {
    getAllUsers,
    addUser
};
