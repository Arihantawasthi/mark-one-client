import { AlignLeft, FileText, Heading, Image as ImageIcon, LayoutTemplate, Megaphone, Type } from "lucide-react";


const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-border">
        <Icon size={16} className="text-primary-500" />
        <h3 className="text-xs font-bold text-on-surface/60 uppercase tracking-widest">{title}</h3>
    </div>
);

const Card = ({ children, className = "" }) => (
    <div className={`bg-background border border-border rounded-xl overflow-hidden shadow-sm ${className}`}>
        {children}
    </div>
);

function HighLevelQualitative() {
    const MOCK_INSIGHTS = {
        overall_tone: "Professional and Informative",
        overall_intent: "To educate readers about the latest tech trends",
        overall_summary: "The newsletter maintains a professional tone throughout, aiming to inform its audience about recent developments in the tech industry. It effectively balances technical details with accessible language, making it suitable for both tech enthusiasts and professionals."
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <Card className="p-6 bg-surface">
                <SectionHeader icon={Megaphone} title="Strategy & Positioning" />
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background p-4 rounded-lg border border-border">
                        <span className="text-[10px] text-on-surface/60 uppercase font-bold block mb-2">Overall Tone</span>
                        <p className="text-base font-bold text-on-surface">{MOCK_INSIGHTS.overall_tone}</p>
                    </div>
                    <div className="bg-background p-4 rounded-lg border border-zinc-800">
                        <span className="text-[10px] text-on-surface/60 uppercase font-bold block mb-2">Overall Intent</span>
                        <p className="text-base font-bold text-on-surface">{MOCK_INSIGHTS.overall_intent}</p>
                    </div>
                </div>
            </Card>

            <Card className="p-6 bg-surface">
                <SectionHeader icon={FileText} title="Executive Summary" />
                <p className="text-on-surface text-sm leading-relaxed">
                    {MOCK_INSIGHTS.overall_summary}
                </p>
            </Card>
        </div>
    );
}

const BlueprintRow = ({ title, metrics }) => (
    <div className="p-4 bg-background/50 border-b border-border last:border-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 w-48">
                {title}
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                {metrics.map((m, i) => (
                    <div key={i} className="flex flex-col">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-1">{m.label}</span>
                        <span className="font-mono text-sm font-bold text-primary-500">
                            {m.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

function Averages() {

    const MOCK_INSIGHTS = {
        avg_title_word_count: 7.5,
        avg_title_emoji_count: 1.2,
        avg_subtitle_word_count: 12.3,
        avg_subtitle_emoji_count: 0.5,
        avg_word_count: 1500,
        avg_section_count: 5.4,
        avg_emoji_count: 3.1,
        reading_time_minutes: 7.5,
        avg_image_count: 4.2,
    };
    return (
        <Card className="flex flex-col mt-16 bg-surface">
            <div className="p-4 border-b border-border">
                <SectionHeader icon={LayoutTemplate} title="Niche Averages (Blueprint)" />
            </div>

            <BlueprintRow
                title={<span className="font-bold text-on-surface flex items-center"><Heading size={16} className="mr-2 text-on-surface/60"/> Title Stats</span>}
                metrics={[
                    { label: "Avg Words", value: MOCK_INSIGHTS.avg_title_word_count.toFixed(1) },
                    { label: "Avg Emojis", value: MOCK_INSIGHTS.avg_title_emoji_count.toFixed(1) },
                ]}
            />

            <BlueprintRow
                title={<span className="font-medium text-on-surface flex items-center"><Type size={16} className="mr-2 text-on-surface/60"/> Subtitle Stats</span>}
                metrics={[
                    { label: "Avg Words", value: MOCK_INSIGHTS.avg_subtitle_word_count.toFixed(1) },
                    { label: "Avg Emojis", value: MOCK_INSIGHTS.avg_subtitle_emoji_count.toFixed(1) },
                ]}
            />

            <BlueprintRow
                title={<span className="font-medium text-on-surface flex items-center"><AlignLeft size={16} className="mr-2 text-on-surface/60"/> Content Stats</span>}
                metrics={[
                    { label: "Avg Words", value: MOCK_INSIGHTS.avg_word_count.toFixed(0) },
                    { label: "Avg Sections", value: MOCK_INSIGHTS.avg_section_count.toFixed(1) },
                    { label: "Avg Emojis", value: MOCK_INSIGHTS.avg_emoji_count.toFixed(1) },
                    { label: "Avg Read Time", value: `${MOCK_INSIGHTS.reading_time_minutes.toFixed(1)}m` },
                ]}
            />

            <BlueprintRow
                title={<span className="font-medium text-on-surface flex items-center"><ImageIcon size={16} className="mr-2 text-on-surface/60"/> Visuals</span>}
                metrics={[
                    { label: "Avg Images", value: MOCK_INSIGHTS.avg_image_count.toFixed(1) },
                ]}
            />
        </Card>
    );
}


export { HighLevelQualitative, Averages };
