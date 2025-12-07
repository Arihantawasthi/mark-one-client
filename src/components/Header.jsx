import { PieChart, LayoutList } from 'lucide-react';


function Header({ currentView, setCurrentView }) {
    const nicheInput = "Tech Newsletters";

    return (
        <header className="w-full bg-surface border-b border-border px-28 2xl:px-64 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center pl-10 md:pl-0">
                <h2 className="font-bold text-2xl text-on-surface">Analysis: <span className="text-lg text-primary-500">{nicheInput}</span></h2>
            </div>
            <div className="flex items-center bg-background p-1 rounded-lg border border-border">
                <button
                    onClick={() => setCurrentView('insights')}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all flex items-center cursor-pointer
                               ${currentView === 'insights' ? 'bg-surface text-on-surface' : 'text-on-surface/60 hover:text-on-surface'}`}
                >
                    <PieChart size={14} className="mr-2" />
                    Insights
                </button>
                <button
                    onClick={() => setCurrentView('issues')}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all flex items-center cursor-pointer
                                ${currentView === 'issues' ? 'bg-surface text-on-surface' : 'text-on-surface/60 hover:text-on-surface'}`}
                >
                    <LayoutList size={14} className="mr-2" />
                    Issues
                </button>
            </div>
        </header>
    );
}


export default Header;
