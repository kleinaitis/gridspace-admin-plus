const fetch = require('node-fetch');
const cors = require('cors');
const express = require('express');
const router = express.Router();
const app = express();
const PORT = 3001
const bodyParser = require('body-parser');


app.use(cors());
router.use(bodyParser.json());

app.get('/users/list', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const apiUrl = `https://api.gridspace.com/v0/users?page=${page}`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': req.header('Authorization'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

app.get('/org/nodes', async (req, res) => {
    try {
        const response = await fetch('https://api.gridspace.com/v0/org/tiers/teams', {
            method: 'GET',
            headers: {
                'Authorization': req.header('Authorization'),
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching organization nodes' });
    }
});

router.patch('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        const apiUrl = `https://api.gridspace.com/v0/users/${userId}`;

        const response = await fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'Authorization': req.header('Authorization'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating user' });
    }
});

router.post('/users/batch-create', async (req, res) => {
    try {
        const apiUrl = 'https://api.gridspace.com/v0/users/batch-create';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': req.header('Authorization'),
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error creating user'});
    }
});

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});

app.use('/', router);