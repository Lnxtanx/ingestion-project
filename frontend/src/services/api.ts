import axios from 'axios';
import type { Log, LogFilters } from '../types';

const API_URL = 'http://localhost:3000';

export const fetchLogs = async (filters: LogFilters): Promise<Log[]> => {
    try {
        const response = await axios.get(`${API_URL}/logs`, { params: filters });
        return response.data;
    } catch (error) {
        console.error('Error fetching logs:', error);
        return [];
    }
};
