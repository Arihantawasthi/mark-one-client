import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Header from "../components/Header";

import HighLevelQualitative from "../components/Insights/HighLevelQualitative";
import Averages from "../components/Insights/Averages";
import EngagementGraph from "../components/Insights/EngagementGraph";
import Issues from "../components/Issues";
import Drawer from "../components/Insights/Drawer";
import { useParams } from "react-router-dom";
import { useAnalysisProgress } from "../hooks/useAnalysisProgress";
import { Loader } from "lucide-react";

function Analysis() {
    const [ currentView, setCurrentView ] = useState("insights");
    const { analysisId } = useParams()
    const {
        isLoading,
        error,
        progress,
        title,
        message,
        analysisResult,
        startTracking
    } = useAnalysisProgress(analysisId);

    useEffect(() => {
        if (analysisId) {
            startTracking(analysisId);
        }
    }, [analysisId]);

    if (isLoading) {
        return <div className="h-full w-full flex justify-center items-center"><Loader size={34}/></div>
    }
    if (error) {
        return <div className="text-red-500">Error: {error}</div>
    }
    console.log(analysisResult);

    return (
        <div className="">
            <Navbar />
            <main className="ml-64 bg-background text-on-surface">
                <Header currentView={currentView} setCurrentView={setCurrentView} />
                { currentView === "insights" ?
                    <div className="px-28 2xl:px-64">
                        <HighLevelQualitative />
                        <Averages />
                        <EngagementGraph />
                    </div>
                    :
                    <div className="px-64 mt-16">
                        <Issues />
                        <Drawer />
                    </div>
                }
            </main>
        </div>
    );
}


export default Analysis;
