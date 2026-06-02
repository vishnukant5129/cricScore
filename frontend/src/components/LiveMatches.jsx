import React from 'react';

const matches = [
    {
        id: 1,
        team1: 'Mumbai Strikers',
        team2: 'Delhi Capitals XI',
        score1: '145/3',
        score2: '132/5',
        overs: '18.2',
        status: 'Live',
    },
    {
        id: 2,
        team1: 'Royal Challengers',
        team2: 'Super Kings',
        score1: '89/1',
        score2: '—',
        overs: '12.4',
        status: 'Live',
    },
    {
        id: 3,
        team1: 'Rajasthan Royals',
        team2: 'Punjab Kings',
        score1: '201/6',
        score2: '198/8',
        overs: '20.0',
        status: 'Live',
    },
    {
        id: 4,
        team1: 'Kolkata Knights',
        team2: 'Sunrisers',
        score1: '67/2',
        score2: '—',
        overs: '8.5',
        status: 'Live',
    },
];

const LiveMatches = () => {
    return (
        <section className="w-full bg-slate-950 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 flex items-center gap-3">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
                    <h2 className="text-2xl font-bold text-white sm:text-3xl">Live Matches</h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {matches.map((match) => (
                        <div
                            key={match.id}
                            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
                                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                                    Live • {match.overs} overs
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-semibold text-white sm:text-base">{match.team1}</p>
                                    <p className="mt-1 text-2xl font-bold text-cyan-400">{match.score1}</p>
                                </div>

                                <div className="flex flex-col items-center justify-center">
                                    <span className="rounded-lg bg-slate-800 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                                        VS
                                    </span>
                                </div>

                                <div className="flex-1 text-right">
                                    <p className="text-sm font-semibold text-white sm:text-base">{match.team2}</p>
                                    <p className="mt-1 text-2xl font-bold text-cyan-400">{match.score2}</p>
                                </div>
                            </div>

                            <div className="mt-6 border-t border-slate-800 pt-4">
                                <div className="flex items-center justify-between text-xs text-slate-500">
                                    <span>T20 • Match {match.id}</span>
                                    <span className="text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">
                                        View Scorecard →
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LiveMatches;