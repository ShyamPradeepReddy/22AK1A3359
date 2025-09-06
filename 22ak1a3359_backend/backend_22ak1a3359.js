const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomUUID } = require('crypto');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/submit',(req, res) => {
    const userData = req.body;
    const requiredFields = ['email', 'name', 'mobileno', 'githubusername', 'rollno', 'accesscode'];
    const missingFields = requiredFields.filter(field => !userData[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({ message: `Missing fields: ${missingFields.join(', ')}` });
    }

    return res.json({ message: 'User registration data received successfully!' });
});

app.post('/api/log', (req, res) => {
    const logData = req.body;

    if (typeof logData.middleware !== 'boolean') {
        return res.status(400).json({ message: 'Field "middleware" must be boolean' });
    }

    const logID = randomUUID();

    return res.json({
        logID: logID,
        message: 'Log created successfully'
    });
});

app.post('/api/evaluation-service/auth', (req, res) => {
    const data = req.body;

    return res.json({ message: 'Evaluation auth received successfully', data: data });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
