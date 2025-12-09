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
import { ChevronDown, CircleCheck, Loader } from "lucide-react";

function Analysis() {
    const [ currentView, setCurrentView ] = useState("insights");
    const { analysisId } = useParams()
    const {
        isLoading,
        error,
        statusData,
        isStatusOpen,
        setIsStatusOpen,
        analysisResult,
        startTracking
    } = useAnalysisProgress(analysisId);

    useEffect(() => {
        if (analysisId) {
            startTracking(analysisId);
        }
    }, [analysisId]);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>
    }
    console.log(statusData);

    return (
        <div className="">
            <Navbar />
            <main className="ml-64 bg-background text-on-surface">
                <Header currentView={currentView} setCurrentView={setCurrentView} />
                <ProgressReport statusData={statusData} isStatusOpen={isStatusOpen} setIsStatusOpen={setIsStatusOpen} />

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

function ProgressReport({ statusData, isStatusOpen, setIsStatusOpen }) {
    const lastIndex = statusData.length - 1;
    const progress = statusData[lastIndex]?.progress || 0;

    const title = progress >= 100 ? "Analysis Completed" : "Analysis In Progress...";

    return (
        <div className="px-64 2xl:px-64 mt-12 w-full rounded-2xl text-on-surface">
            <div className="w-full bg-surface px-6 py-4 rounded-2xl">
                <div className="flex justify-between">
                    <div className="flex gap-x-4 items-center">
                        { progress >= 100 ?
                            <CircleCheck size={24} className="text-green-500" />
                            :
                            <Loader size={24} className="text-primary-500 animate-spin" />
                        }
                        <h1 className={`font-bold tracking-wide uppercase ${progress >= 100 ? "text-green-500" : "text-primary-500"} `}>{title}</h1>
                    </div>
                    <ChevronDown size={24} className={`cursor-pointer transiton-all ${isStatusOpen ? "rotate-180" : "" }`} onClick={() => setIsStatusOpen(prev => !prev)} />
                </div>
                { isStatusOpen && <ProgressReportData statusData={statusData} /> }

            </div>
        </div>
    )
}

function ProgressReportData({ statusData }) {
    const lastIndex = statusData.length - 1;
    const progress = statusData[lastIndex]?.progress || 0;

    return (
        <div className="mt-4">
            <div className="w-full h-1 bg-background rounded-2xl">
                <div
                    className={`h-1 transition-all duration-500 ease-out ${progress >= 100 ? "bg-green-500" : "bg-primary-500" } rounded-2xl`}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            {statusData.map((status, index) => {
                const isCurrent = index === lastIndex;
                const isCompleted = (index < lastIndex) || (status.progress >= 100);

                return (
                    <div key={index} className="relative mt-6 flex gap-x-4 items-start">
                        <div className="pt-1 flex-shrink-0">
                            {!isCurrent && (
                                <div
                                    className={`absolute top-4 left-[0.6rem] w-0.5 border-l-2 border-dotted h-full ${isCompleted ? 'border-l-green-500/80' : 'border-l-on-surface/50'}`}
                                />
                            )}
                            { isCompleted ? (
                                    <CircleCheck size={20} className="text-green-500 z-10 relative bg-surface rounded-full" />
                                ) : (
                                    <Loader size={20} className={`text-primary-500 animate-spin`} />
                                )
                            }
                        </div>
                        <div className="flex-grow pb-4">
                            <h2 className={`font-semibold ${ isCompleted ? "text-green-500" : "text-primary-500" }`}>{status.title}</h2>
                            <p className="mt-1 text-sm text-on-surface/50">{status.detail}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );

}

export default Analysis;
