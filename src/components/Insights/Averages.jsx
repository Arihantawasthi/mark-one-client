import { AlignLeft, Heading, Image as ImageIcon, LayoutTemplate, Type } from "lucide-react";
import { SectionHeader, BlueprintRow, Card } from "./helpers";

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


export default Averages;
