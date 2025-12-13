import { useNavigate } from "react-router-dom";
import { CirclePlus } from "lucide-react";

import NavHistoryList from "./NavHistoryList";
import NavHistoryLoading from "./NavHistoryLoading";
import NavHistoryError from "./NavHistoryError";
import NavHistoryEmpty from "./NavHistoryEmpty";

import { useAnalysesList } from "./useAnalysesList";


function Navbar() {
    const { analyses, isLoading, error, refetch } = useAnalysesList();
    const navigate = useNavigate();

    const handleNewAnalysis = () => {
        navigate("/");
    };

    let content = "";
    if (isLoading) {
        content = <NavHistoryLoading />;
    } else if (error) {
        content = <NavHistoryError refetch={refetch} />;
    } else if (analyses.length === 0) {
        content = <NavHistoryEmpty />;
    } else {
        content = <NavHistoryList analyses={analyses} />;
    }

    return (
        <aside
            className="w-64 fixed left-0 z-40 h-full bg-surface border-r border-border transition-all duration-300 ease-in-out flex flex-col"
        >
            <div className="px-4 py-5 border-b border-border flex items-center justify-between">
                <div className="flex items-center space-x-4 font-bold text-lg cursor-pointer" onClick={() => navigate("/")}>
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
                { content }
            </div>
        </aside>
    );
}


export default Navbar;
