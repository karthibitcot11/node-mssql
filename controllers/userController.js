const pool = require('../config/dbConfig');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        console.log('Fetching all users from the database...');
        const [rows] = await pool.execute('SELECT * FROM Users');
        console.log(`Fetched ${rows.length} users`);
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Database query failed' });
    }
};

// Add a new user
const addUser = async (req, res) => {
    const { username, email } = req.body;

    console.log('Incoming request to add user:', { username, email });

    if (!username || !email) {
        console.warn('Validation failed: Missing username or email');
        return res.status(400).json({ error: 'Username and email are required.' });
    }

    try {
        console.log(`Checking if user with email ${email} already exists...`);
        const [existingUser] = await pool.execute('SELECT * FROM Users WHERE Email = ?', [email]);
        
        if (existingUser.length > 0) {
            console.warn(`User with email ${email} already exists`);
            return res.status(400).json({ error: 'User already exists.' });
        }

        console.log(`Inserting user into the database: ${username} (${email})`);
        await pool.execute('INSERT INTO Users (Name, Email) VALUES (?, ?)', [username, email]);
        console.log(`User ${username} (${email}) added successfully`);

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
