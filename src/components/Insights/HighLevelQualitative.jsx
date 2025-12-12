import { Megaphone, FileText } from "lucide-react";

import { SectionHeader, Card } from "./helpers";

function HighLevelQualitative({ overallTone, overallIntent, overallSummary }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <Card className="p-6 bg-surface">
                <SectionHeader icon={Megaphone} title="Strategy & Positioning" />
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background p-4 rounded-lg border border-border">
                        <span className="text-[10px] text-on-surface/60 uppercase font-bold block mb-2">Overall Tone</span>
                        <p className="text-base font-bold text-on-surface capitalize">{ overallTone }</p>
                    </div>
                    <div className="bg-background p-4 rounded-lg border border-zinc-800">
                        <span className="text-[10px] text-on-surface/60 uppercase font-bold block mb-2">Overall Intent</span>
                        <p className="text-base font-bold text-on-surface capitalize">{ overallIntent }</p>
                    </div>
                </div>
            </Card>

            <Card className="p-6 bg-surface">
                <SectionHeader icon={FileText} title="Executive Summary" />
                <p className="text-on-surface text-base leading-relaxed">
                    { overallSummary }
                </p>
            </Card>
        </div>
    );
}


export default HighLevelQualitative;
