const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'logs.json');

// Ensure log file exists
function ensureLogFile() {
    try {
        fs.accessSync(LOG_FILE);
    } catch (error) {
        if (error.code === 'ENOENT') {
            fs.writeFileSync(LOG_FILE, '[]', 'utf8');
        } else {
            throw error;
        }
    }
}

// Ingest a log entry
async function ingestLog(logData) {
    ensureLogFile();

    const fileContent = fs.readFileSync(LOG_FILE, 'utf8');
    let logs = [];
    try {
        logs = JSON.parse(fileContent);
    } catch (e) {
        console.error("Error parsing logs, resetting", e);
        logs = [];
    }

    logs.push(logData);

    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf8');
    return logData;
}

// Query logs with filters
async function queryLogs(filters) {
    ensureLogFile();

    const fileContent = fs.readFileSync(LOG_FILE, 'utf8');
    let logs = [];
    try {
        logs = JSON.parse(fileContent);
    } catch (e) {
        return [];
    }

    return logs.filter(log => {
        let match = true;

        if (filters.level && log.level !== filters.level) match = false;

        if (filters.message && !log.message.toLowerCase().includes(filters.message.toLowerCase())) match = false;

        if (filters.resourceId && log.resourceId !== filters.resourceId) match = false;

        if (filters.timestamp_start) {
            if (new Date(log.timestamp) < new Date(filters.timestamp_start)) match = false;
        }

        if (filters.timestamp_end) {
            if (new Date(log.timestamp) > new Date(filters.timestamp_end)) match = false;
        }

        if (filters.traceId && log.traceId !== filters.traceId) match = false;

        if (filters.spanId && log.spanId !== filters.spanId) match = false;

        if (filters.commit && log.commit !== filters.commit) match = false;

        return match;
    }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

module.exports = {
    ingestLog,
    queryLogs
};
