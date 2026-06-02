import React from 'react';

const tournaments = [
    {
        id: 1,
        name: 'Premier League T20 2026',
        teams: 10,
        status: 'Ongoing',
        startDate: 'May 15',
        endDate: 'July 10',
    },
    {
        id: 2,
        name: 'Corporate Cricket Cup',
        teams: 16,
        status: 'Upcoming',
        startDate: 'June 20',
        endDate: 'Aug 15',
    },
    {
        id: 3,
        name: 'Inter-University Championship',
        teams: 24,
        status: 'Ongoing',
        startDate: 'May 28',
        endDate: 'June 25',
    },
    {
        id: 4,
        name: 'Veterans Premier League',
        teams: 8,
        status: 'Upcoming',
        startDate: 'July 5',
        endDate: 'Aug 20',
    },
    {
        id: 5,
        name: 'Street Cricket World Cup',
        teams: 32,
        status: 'Ongoing',
        startDate: 'June 1',
        endDate: 'June 30',
    },
    {
        id: 6,
        name: 'Women’s T20 Challenge',
        teams: 6,
        status: 'Upcoming',
        startDate: 'Aug 1',
        endDate: 'Sep 10',
    },
];

const Tournament = () => {
    const getStatusStyles = (status) => {
        return status === 'Ongoing'
            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
            : 'bg-slate-800 text-slate-400 border-slate-700';
    };

    return (
        <section className="w-full bg-slate-950 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <h2 className="mb-10 text-2xl font-bold text-white sm:text-3xl">Tournaments</h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tournaments.map((tournament) => (
                        <div
                            key={tournament.id}
                            className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
                        >
                            <div className="mb-4 flex items-start justify-between">
                                <span
                                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyles(
                                        tournament.status
                                    )}`}
                                >
                                    {tournament.status}
                                </span>
                                <span className="text-xs text-slate-500">
                                    {tournament.startDate} - {tournament.endDate}
                                </span>
                            </div>

                            <h3 className="mb-3 text-lg font-bold text-white transition-colors group-hover:text-cyan-400">
                                {tournament.name}
                            </h3>

                            <div className="mt-auto flex items-center gap-2 text-sm text-slate-400">
                                <svg
                                    className="h-4 w-4 text-slate-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <span>{tournament.teams} Teams</span>
                            </div>

                            <div className="mt-5 border-t border-slate-800 pt-4">
                                <button className="text-sm font-medium text-cyan-400 transition-all group-hover:translate-x-1">
                                    View Details →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tournament;