import { useState, useCallback } from 'react';
import { FilterBar } from './components/FilterBar';
import { LogList } from './components/LogList';
import { fetchLogs } from './services/api';
import type { Log, LogFilters } from './types';

function App() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);

  const loadLogs = useCallback(async (filters: LogFilters) => {
    setLoading(true);
    const data = await fetchLogs(filters);
    setLogs(data);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Log Ingestion & Query System
          </h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <FilterBar onFilterChange={loadLogs} />
        <LogList logs={logs} loading={loading} />
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          assignment project -by vivek
        </div>
      </footer>
    </div>
  );
}

export default App;
