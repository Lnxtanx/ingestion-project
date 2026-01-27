const express = require('express');
const cors = require('cors');
const { ingestLog, queryLogs } = require('./logger');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Helper to validate log object
const validateLog = (log) => {
    const requiredFields = ['level', 'message', 'resourceId', 'timestamp', 'traceId', 'spanId', 'commit', 'metadata'];
    for (const field of requiredFields) {
        if (!log[field]) {
            return `Missing field: ${field}`;
        }
    }
    return null;
};

// Ingest log
app.get('/', async (req, res) => {
    res.json({
        message: 'Log Ingestor API',
        status: 'Running'
    });
})

app.post('/logs', async (req, res) => {
    try {
        const logData = req.body;

        const error = validateLog(logData);
        if (error) {
            return res.status(400).json({ error });
        }

        const savedLog = await ingestLog(logData);
        res.status(201).json(savedLog);
    } catch (err) {
        console.error('Error ingesting log:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Query logs
app.get('/logs', async (req, res) => {
    try {
        const filters = {
            level: req.query.level,
            message: req.query.message,
            resourceId: req.query.resourceId,
            timestamp_start: req.query.timestamp_start,
            timestamp_end: req.query.timestamp_end,
            traceId: req.query.traceId,
            spanId: req.query.spanId,
            commit: req.query.commit,
        };

        const logs = await queryLogs(filters);
        res.json(logs);
    } catch (err) {
        console.error('Error querying logs:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Log Ingestor server running on port ${PORT}`);
});
