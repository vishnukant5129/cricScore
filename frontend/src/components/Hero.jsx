import React from 'react';

const Hero = () => {
    return (
        <section className="relative flex min-h-screen w-full items-center justify-center bg-slate-950 px-4 py-20">
            {/* Subtle background glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
            </div>

            <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
                <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
                    Crick<span className="text-cyan-400">Heroes</span> Platform
                </h1>

                <p className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
                    Live Cricket Scoring, Matches, Tournaments & Player Stats — All in one place.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                    <button className="rounded-full bg-cyan-500 px-8 py-3.5 text-sm font-semibold text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-95 sm:text-base">
                        Live Matches
                    </button>
                    <button className="rounded-full border-2 border-cyan-500/80 bg-transparent px-8 py-3.5 text-sm font-semibold text-cyan-400 transition-all hover:bg-cyan-500/10 hover:border-cyan-400 active:scale-95 sm:text-base">
                        View Tournaments
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;