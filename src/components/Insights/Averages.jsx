import { AlignLeft, Heading, Image as ImageIcon, LayoutTemplate, Type } from "lucide-react";
import { SectionHeader, BlueprintRow, Card } from "./helpers";

function Averages({ agg_analysis }) {
    return (
        <Card className="flex flex-col mt-16 bg-surface">
            <div className="p-4 border-b border-border">
                <SectionHeader icon={LayoutTemplate} title="Niche Averages (Blueprint)" />
            </div>

            <BlueprintRow
                title={<span className="font-bold text-on-surface flex items-center"><Heading size={16} className="mr-2 text-on-surface/60"/> Title Stats</span>}
                metrics={[
                    { label: "Avg Words", value: agg_analysis.avg_title_word_count.toFixed(2) },
                    { label: "Avg Emojis", value: agg_analysis.avg_title_emoji_count.toFixed(2) },
                ]}
            />

            <BlueprintRow
                title={<span className="font-medium text-on-surface flex items-center"><Type size={16} className="mr-2 text-on-surface/60"/> Subtitle Stats</span>}
                metrics={[
                    { label: "Avg Words", value: agg_analysis.avg_subtitle_word_count.toFixed(2) },
                    { label: "Avg Emojis", value: agg_analysis.avg_subtitle_emoji_count.toFixed(2) },
                ]}
            />

            <BlueprintRow
                title={<span className="font-medium text-on-surface flex items-center"><AlignLeft size={16} className="mr-2 text-on-surface/60"/> Content Stats</span>}
                metrics={[
                    { label: "Avg Words", value: agg_analysis.avg_word_count.toFixed(2) },
                    { label: "Avg Sections", value: agg_analysis.avg_section_count.toFixed(2) },
                    { label: "Avg Emojis", value: agg_analysis.avg_emoji_count.toFixed(2) },
                    { label: "Avg Read Time", value: `${agg_analysis.reading_time_minutes.toFixed(2)}m` },
                ]}
            />

            <BlueprintRow
                title={<span className="font-medium text-on-surface flex items-center"><ImageIcon size={16} className="mr-2 text-on-surface/60"/> Visuals</span>}
                metrics={[
                    { label: "Avg Images", value: agg_analysis.avg_image_count.toFixed(2) },
                ]}
            />
        </Card>
    );
}


export default Averages;
