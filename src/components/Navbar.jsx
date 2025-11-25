import { BookA, CirclePlus } from "lucide-react";

function Navbar() {
    const handleNewAnalysis = () => {
        // Implement new analysis logic
        console.log("New Analysis");
    };

    const HISTORY_ITEMS = [
        "Analysis 1",
        "Analysis 2",
        "Analysis 3",
        "Analysis 4",
        "Analysis 5",
    ];

    return (
        <aside
            className="w-64 fixed left-0 z-40 h-full bg-surface border-r border-border transition-all duration-300 ease-in-out flex flex-col"
        >
            <div className="px-4 py-8 border-b border-border flex items-center justify-between">
                <div className="flex items-center space-x-4 font-bold text-lg">
                    <div
                        className="w-8 h-8 rounded flex items-center justify-center text-on-primary font-bold bg-primary-500"
                    >
                        T
                    </div>
                    <span>Thrive Letter</span>
                </div>
            </div>

            <div className="p-4">
                <button
                    onClick={handleNewAnalysis}
                    className="w-full flex items-center justify-center space-x-2 text-on-primary px-4 py-2 rounded-xl font-bold
                              transition-transform active:scale-95 bg-primary-500 cursor-pointer hover:bg-primary-600 ease-in-out"
                >
                    <CirclePlus size={16} />
                    <span>New Analysis</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
                <p className="px-4 text-[12px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">History</p>
                {HISTORY_ITEMS.map((item, i) => (
                    <button
                        key={i}
                        className="w-full text-left px-4 py-2 rounded-md text-sm text-on-surface/60 hover:text-on-surface hover:bg-zinc-800
                                   transition-all truncate flex items-center cursor-pointer"
                    >
                        <BookA size={14} className="mr-2 opacity-50" />
                        {item}
                    </button>
                ))}
            </div>
        </aside>
    );
}


export default Navbar;
