import { useState } from 'react';
import { Dot, Plus, ThumbsUp, MessageCircle, AlignLeft, Clock, Megaphone, Target } from 'lucide-react';

function Issues() {
    const [selectedIssue, setSelectedIssue] = useState(null);

    const MOCK_ISSUES = [
        {
            id: 1,
            platform: 'Substack',
            author: 'Jane Doe',
            title: 'The Future of Tech: Trends to Watch in 2024 🚀',
            subtitle: 'An in-depth analysis of emerging technologies shaping our world.',
            overall_tone: 'Informative',
            overall_intent: 'To educate readers about upcoming tech trends',
            like_count: 120,
            comment_count: 45,
            word_count: 2500,
            reading_time_minutes: 12,
        },
        {
            id: 2,
            platform: 'Beehiiv',
            author: 'John Smith',
            title: 'AI in Everyday Life: How It’s Changing the Way We Live 🤖',
            subtitle: 'Exploring the impact of artificial intelligence on daily routines.',
            overall_tone: 'Engaging',
            overall_intent: 'To inform and engage readers about AI advancements',
            like_count: 95,
            comment_count: 30,
            word_count: 1800,
            reading_time_minutes: 8,
        },
        // Add more mock issues as needed
    ];

    return (
        <div className="flex flex-col max-w-7xl mx-auto h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-zinc-400 font-bold uppercase text-xs tracking-wider">
                    {MOCK_ISSUES.length} Issues Scanned
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

                {MOCK_ISSUES.map((issue) => (
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
                                    <Badge color={issue.platform === 'Substack' ? 'orange' : issue.platform === 'Beehiiv' ? 'accent' : 'zinc'}>
                                        {issue.platform}
                                    </Badge>
                                    <Dot size={24} className="text-on-surface/50" />
                                    <span className="text-xs text-on-surface/50 font-medium">{issue.author}</span>
                                </div>
                                <h3 className="font-bold text-on-surface group-hover:text-primary-500
                                                transition-colors line-clamp-2 md:text-base truncate"
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
                                <p className="text-sm text-on-surface/70 leading-relaxed line-clamp-1 truncate">
                                    <span className="text-on-surface/50 font-bold uppercase text-xs mr-2">Tone:</span>
                                    {issue.overall_tone}
                                </p>
                            </div>
                            <div className="flex items-start space-x-2 mt-2">
                                <Target size={14} className="text-on-surface/50 mt-1 shrink-0" />
                                <p className="text-sm text-on-surface/70 leading-relaxed wrap-break-word">
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
                                <MiniMetric icon={AlignLeft} label="Words" value={`${(issue.word_count/1000).toFixed(1)}k`} />
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
