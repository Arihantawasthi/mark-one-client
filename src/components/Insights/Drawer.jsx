import { X, ExternalLink, User, Hash, AlignLeft, Clock, LayoutTemplate, ThumbsUp, MessageCircle, Image as ImageIcon, Activity, Target, MousePointer2, ShoppingBag } from "lucide-react";
import { SectionHeader, Card } from "./helpers";


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

const MetricItem = ({ icon: Icon, label, value }) => (
    <div className="flex flex-col p-3 rounded-lg bg-surface border border-zinc-800">
        <div className="flex items-center space-x-2 mb-2 text-on-surface/50">
            <Icon size={14} />
            <span className="text-[10px] uppercase tracking-wider font-bold">{label}</span>
        </div>
        <p className="text-sm font-bold text-on-surface">{value}</p>
    </div>
);

function Drawer({ selectedIssue, setSelectedIssue }) {
    return (
        <div
            className={`fixed top-0 right-0 h-screen w-full md:w-[600px] bg-background border-l border-border
                        shadow-2xl transform transition-transform duration-300 ease-out z-30 flex flex-col
                        ${selectedIssue ? 'translate-x-0' : 'translate-x-full'} c-scrollbar`
            }
        >
            {selectedIssue && (
                <>
                    <div className="p-5 border-b border-border flex justify-between items-center bg-surface">
                        <span className="text-xs font-bold text-on-surface/50 uppercase tracking-widest">Issue Details</span>
                        <button onClick={() => setSelectedIssue(null)} className="p-2 hover:bg-zinc-800 rounded text-zinc-400 hover:text-on-surface cursor-pointer">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-background">

                        {/* 1. Identity & Platform */}
                        <div>
                            <div className="flex items-center space-x-2 mb-3">
                                <Badge color={selectedIssue.platform.toLowerCase() === 'substack' ? 'orange' : selectedIssue.platform.toLowerCase() === 'beehiiv' ? 'accent' : 'zinc'}>
                                    {selectedIssue.platform}
                                </Badge>
                                <span className="text-xs text-on-surface/50 font-mono">{selectedIssue.date}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-on-surface mb-2">{selectedIssue.title}</h2>
                            <p className="text-lg text-on-surface/60 font-light italic mb-4">"{selectedIssue.subtitle}"</p>
                            <div className="flex items-center space-x-3 text-sm text-on-surface/50">
                                <span className="flex items-center"><User size={14} className="mr-1"/> {selectedIssue.author}</span>
                                <a href={selectedIssue.url} target="_blank" rel="noreferrer" className="flex items-center hover:text-on-surface text-primary-500">
                                    <ExternalLink size={14} className="mr-1"/> Open URL
                                </a>
                            </div>
                        </div>

                        {/* 2. Qualitative Analysis */}
                        <div className="grid grid-cols-1 gap-4">
                            <Card className="p-4 bg-surface">
                                <span className="text-xs text-on-surface/50 uppercase font-bold block mb-2">Overall Summary</span>
                                <p className="text-sm text-on-surface leading-relaxed capitalize">{selectedIssue.overall_summary}</p>
                            </Card>
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="p-4 bg-zinc-900">
                                    <span className="text-xs text-zinc-500 uppercase font-bold block mb-2">Overall Intent</span>
                                    <p className="text-sm font-bold text-on-surface capitalize">{selectedIssue.overall_intent}</p>
                                </Card>
                                <Card className="p-4 bg-zinc-900">
                                    <span className="text-xs text-zinc-500 uppercase font-bold block mb-2">Overall Tone</span>
                                    <p className="text-sm font-bold text-on-surface capitalize">{selectedIssue.overall_tone}</p>
                                </Card>
                            </div>
                        </div>

                        {/* 3. Core Metrics Grid */}
                        <div>
                            <SectionHeader icon={Hash} title="Core Metrics" />
                            <div className="grid grid-cols-3 gap-3">
                                <MetricItem icon={AlignLeft} label="Word Count" value={selectedIssue.word_count} />
                                <MetricItem icon={Clock} label="Read Time" value={`${selectedIssue.reading_time_minutes}m`} />
                                <MetricItem icon={LayoutTemplate} label="Sections" value={selectedIssue.section_count} />
                                <MetricItem icon={ThumbsUp} label="Likes" value={selectedIssue.like_count} />
                                <MetricItem icon={MessageCircle} label="Comments" value={selectedIssue.comment_count} />
                                <MetricItem icon={ImageIcon} label="Images" value={selectedIssue.image_count} />
                            </div>
                        </div>

                        {/* 4. Deep Dive Stats */}
                        <div>
                            <SectionHeader icon={Activity} title="Structure Breakdown" />
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="p-4">
                                    <h4 className="text-sm font-bold text-on-surface/70 mb-2">Emoji Usage</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm"><span className="text-on-surface/50">Content</span> <span className="text-on-surface font-bold">{selectedIssue.emoji_count}</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-on-surface/50">In Title</span> <span className="text-on-surface font-bold">{selectedIssue.title_emoji_count}</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-on-surface/50">In Subtitle</span> <span className="text-on-surface font-bold">{selectedIssue.subtitle_emoji_count}</span></div>
                                    </div>
                                </Card>
                                <Card className="p-4">
                                    <h4 className="text-sm font-bold text-on-surface/70 mb-2">Word Counts</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm"><span className="text-on-surface/50">In Title</span> <span className="text-on-surface font-bold">{selectedIssue.title_word_count}</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-on-surface/50">In Subtitle</span> <span className="text-on-surface font-bold">{selectedIssue.subtitle_word_count}</span></div>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        {/* 5. Boolean & Specials */}
                        <div>
                            <SectionHeader icon={Target} title="Specifics" />
                            <div className="flex flex-wrap gap-3">
                                <div className={`px-3 py-2 rounded border text-xs font-bold ${selectedIssue.addressed_user_by_name ? 'border-emerald-800 bg-emerald-900/20 text-emerald-400' : 'border-zinc-800 bg-zinc-900 text-zinc-500'}`}>
                                    {selectedIssue.addressed_user_by_name ? '✓ Addresses User by Name' : '✗ No Name Address'}
                                </div>
                                <div className="px-3 py-2 rounded border border-border bg-surface text-xs font-bold text-on-surface">
                                    Product Mentions: {selectedIssue.product_mention_count}
                                </div>
                            </div>
                        </div>

                        {/* 6. JSONB Lists: CTAs & Ads */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <SectionHeader icon={MousePointer2} title="CTAs Found" />
                                <div className="space-y-2">
                                    {selectedIssue.ctas.length > 0 ? selectedIssue.ctas.map((cta, idx) => (
                                        <div key={idx} className="p-3 bg-surface border border-border rounded text-sm text-on-surface">
                                            "{cta.text}" <span className="text-on-surface/60 text-[10px] ml-2 uppercase">({cta.type})</span>
                                        </div>
                                    )) : <p className="text-on-surface/60 text-sm">No CTAs detected.</p>}
                                </div>
                            </div>
                            <div>
                                <SectionHeader icon={ShoppingBag} title="Ads / Sponsors" />
                                <div className="space-y-2">
                                    {selectedIssue.ads.length > 0 ? selectedIssue.ads.map((ad, idx) => (
                                        <div key={idx} className="p-3 bg-surface border border-border rounded text-sm text-on-surface">
                                            <span className="text-on-surface">{ad.text}</span> <span className="text-on-surface/60 text-[10px] uppercase ml-2">({ad.type})</span>
                                        </div>
                                    )) : <p className="text-zinc-600 text-sm">No Ads detected.</p>}
                                </div>
                            </div>
                        </div>

                    </div>
                </>
            )}
        </div>
    );
}


export default Drawer;
