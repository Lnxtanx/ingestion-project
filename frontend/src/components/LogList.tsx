import React from 'react';
import type { Log } from '../types';
import { clsx } from 'clsx';
import { format } from 'date-fns';

interface LogListProps {
    logs: Log[];
    loading: boolean;
}

export const LogList: React.FC<LogListProps> = ({ logs, loading }) => {
    if (loading) {
        return (
            <div className="text-center py-20">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
            </div>
        );
    }

    if (logs.length === 0) {
        return (
            <div className="text-center py-20 text-gray-400 text-sm">
                No logs found.
            </div>
        );
    }

    return (
        <div className="w-full bg-white flex flex-col">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="text-xs font-semibold text-gray-500 bg-gray-50/80 sticky top-0 border-b border-gray-200 z-10">
                        <tr>
                            <th scope="col" className="px-3 py-2 w-48 whitespace-nowrap">Timestamp</th>
                            <th scope="col" className="px-3 py-2 w-20 whitespace-nowrap">Level</th>
                            <th scope="col" className="px-3 py-2 w-32 whitespace-nowrap">Resource</th>
                            <th scope="col" className="px-3 py-2">Message</th>
                        </tr>
                    </thead>
                    <tbody className="font-mono text-[13px] divide-y divide-gray-100">
                        {logs.map((log, index) => (
                            <tr key={index} className="hover:bg-blue-50/40 transition-colors group">
                                <td className="px-3 py-1 text-gray-500 whitespace-nowrap tabular-nums border-r border-transparent group-hover:border-gray-100">
                                    {format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss.SSS')}
                                </td>
                                <td className="px-2 py-1 whitespace-nowrap">
                                    <div className={clsx(
                                        "inline-flex items-center justify-center px-1.5 rounded-[3px] text-[11px] font-bold w-12",
                                        log.level === 'error' && "bg-red-100 text-red-700",
                                        log.level === 'warn' && "bg-amber-100 text-amber-700",
                                        log.level === 'info' && "bg-blue-100 text-blue-700",
                                        log.level === 'debug' && "bg-gray-100 text-gray-600"
                                    )}>
                                        {log.level.toUpperCase()}
                                    </div>
                                </td>
                                <td className="px-3 py-1 text-blue-600 whitespace-nowrap text-xs">
                                    {log.resourceId}
                                </td>
                                <td className="px-3 py-1 text-gray-800 break-all leading-snug">
                                    {log.message}
                                    {log.metadata && Object.keys(log.metadata).length > 0 && (
                                        <span className="ml-2 inline-flex items-center text-gray-400 text-xs">
                                            <span className="mr-1 opacity-50">{'{'}</span>
                                            {Object.entries(log.metadata).map(([k, v], i) => (
                                                <span key={k} className="mr-2">
                                                    <span className="text-purple-600">{k}</span>:
                                                    <span className="text-emerald-600 ml-0.5">{String(v)}</span>
                                                    {i < Object.keys(log.metadata).length - 1 && ","}
                                                </span>
                                            ))}
                                            <span className="opacity-50">{'}'}</span>
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
