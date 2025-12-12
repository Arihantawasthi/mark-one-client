import { Dot, Plus, ThumbsUp, MessageCircle, AlignLeft, Clock, Megaphone, Target, Link } from 'lucide-react';
import TextField from "../components/TextField";
import { useState } from 'react';

const AddNewsletterLinkModal = ({ inputValue, setInputValue, setShowModal }) => {
    const clickOutsideToClose = (e) => {
        console.log(e.target.id);
        if (e.target.id === "modal-background") {
            console.log('here');
            setInputValue("");
            setShowModal(false);
        }
    }

    return (
        <div
            id="modal-background"
            className="fixed z-99 top-0 left-0 w-full h-full bg-background/50 backdrop-blur-md flex items-center justify-center"
            onClick={e => clickOutsideToClose(e)}
        >
            <div className="bg-surface p-6 rounded-xl shadow-2xl w-[520px]">
                <h2 className="text-lg font-bold mb-4">Add Manual Issue</h2>
                <form className="flex flex-col space-y-4">
                    <TextField
                        label="Newsletter URL"
                        type="url"
                        placeholder="https://example.substack.com/p/issue-1"
                        leftIcon={<Link size={16} className="text-on-surface/50" />}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </form>
            </div>
        </div>
    );
}

function Issues({ issues, selectedIssue, setSelectedIssue }) {
    const [inputValue, setInputValue] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <div className="flex flex-col mx-auto h-full">
            { showAddModal && <AddNewsletterLinkModal
                inputValue={inputValue}
                setInputValue={setInputValue}
                setShowModal={setShowAddModal}
            />}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-zinc-400 font-bold uppercase text-xs tracking-wider">
                    {issues.length} Issues Scanned
                </h3>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center space-x-1 px-4 py-2 text-on-primary text-sm font-bold
                                rounded hover:opacity-90 transition-opacity bg-primary-500 cursor-pointer"
                >
                    <Plus size={14} />
                    <span>Add Manual</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
                {/* Header Row for Table-like feel */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-sm font-bold text-on-surface/50 uppercase tracking-wide">
                    <div className="col-span-4">Identity</div>
                    <div className="col-span-4">Analysis</div>
                    <div className="col-span-4">Key Metrics</div>
                </div>

                {issues.map((issue) => (
                    <div
                        key={issue.id}
                        onClick={() => setSelectedIssue(issue)}
                        // Solid Card Design
                        className={`group grid grid-cols-1 md:grid-cols-12 gap-4 p-6 rounded-xl border cursor-pointer transition-all
                                    bg-surface border-border hover:border-primary-500/30 hover:bg-surface/70
                                    ${selectedIssue?.id === issue.id ? 'border-primary-500/30' : ''}`}
                    >
                        {/* COL 1: Identity & Platform */}
                        <div className="col-span-1 md:col-span-4 flex flex-col justify-between space-y-2">
                            <div>
                                <div className="flex flex-wrap items-center mb-2">
                                    <Badge color={issue.platform.toLowerCase() === 'substack' ? 'orange' : issue.platform.toLowerCase() === 'beehiiv' ? 'accent' : 'zinc'}>
                                        {issue.platform}
                                    </Badge>
                                    <Dot size={24} className="text-on-surface/50" />
                                    <span className="text-xs text-on-surface/50 font-medium">{issue.author}</span>
                                </div>
                                <h3 className={`font-bold group-hover:text-primary-500 transition-colors line-clamp-2 md:text-base truncate
                                                ${selectedIssue?.id === issue.id ? 'text-primary-500' : 'text-on-surface'}`
                                }
                                >
                                    {issue.title}
                                </h3>
                                <p className="text-sm text-on-surface/50 mt-2 line-clamp-1 truncate">{issue.subtitle}</p>
                            </div>
                        </div>

                        {/* COL 2: Analysis (Tone/Intent) - Brief */}
                        <div className="col-span-1 md:col-span-4 flex flex-col justify-center space-y-3 py-2 md:border-l md:border-r border-border md:px-4">
                            <div className="flex items-start space-x-2">
                                <Megaphone size={14} className="text-on-surface/50 mt-1 shrink-0" />
                                <p className="text-sm text-on-surface/70 leading-relaxed line-clamp-1 truncate capitalize">
                                    <span className="text-on-surface/50 font-bold uppercase text-xs mr-2">Tone:</span>
                                    {issue.overall_tone}
                                </p>
                            </div>
                            <div className="flex items-start space-x-2 mt-2">
                                <Target size={14} className="text-on-surface/50 mt-1 shrink-0" />
                                <p className="text-sm text-on-surface/70 leading-relaxed wrap-break-word capitalize">
                                    <span className="text-on-surface/50 font-bold uppercase text-xs mr-2">Intent:</span>
                                    {issue.overall_intent}
                                </p>
                            </div>
                        </div>

                        {/* COL 3: Metrics Strip (Prioritized) */}
                        <div className="col-span-1 md:col-span-4 flex flex-col justify-center space-y-3">
                            <div className="grid grid-cols-2 gap-6">
                                <MiniMetric icon={ThumbsUp} label="Likes" value={issue.like_count} highlight />
                                <MiniMetric icon={MessageCircle} label="Comments" value={issue.comment_count} />
                                <MiniMetric icon={AlignLeft} label="Words" value={`${(issue.word_count/1000).toFixed(2)}k`} />
                                <MiniMetric icon={Clock} label="Time" value={`${issue.reading_time_minutes}m`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const Badge = ({ children, color = "zinc", className = "" }) => {
    const style = {
        zinc: "bg-zinc-800 text-zinc-300 border-zinc-700",
        accent: "bg-primary-500/10 text-primary-500 border-primary-700",
        green: "bg-emerald-900/30 text-emerald-400 border-emerald-800",
        orange: "bg-orange-900/10 text-orange-400 border-orange-800",
        blue: "bg-blue-900/30 text-blue-400 border-blue-800",
    };
    const theme = style[color] || style.zinc;

    return (
        <span className={`px-2 py-0.5 rounded text-[10px] font-medium border uppercase tracking-wide whitespace-nowrap ${theme} ${className}`}>
            {children}
        </span>
    );
};

const MiniMetric = ({ icon: Icon, value, label, highlight = false }) => (
    <div className={`flex items-center space-x-2 px-2 py-1 rounded
                    ${highlight ? 'bg-primary-500/10 text-primary-500' : 'text-on-surface/70'}`}
        title={label}
    >
        <Icon size={14} className={highlight ? 'text-primary-500' : 'text-on-surface/70'} />
        <span className="text-xs font-mono font-medium">{value}</span>
    </div>
);


export default Issues;
