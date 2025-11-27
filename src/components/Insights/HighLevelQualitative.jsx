import { Megaphone, FileText } from "lucide-react";

import { SectionHeader, Card } from "./helpers";

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
                <p className="text-on-surface text-base leading-relaxed">
                    {MOCK_INSIGHTS.overall_summary}
                </p>
            </Card>
        </div>
    );
}


export default HighLevelQualitative;
