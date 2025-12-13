import { useEffect, useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header";

import HighLevelQualitative from "../components/Insights/HighLevelQualitative";
import Averages from "../components/Insights/Averages";
import EngagementGraph from "../components/Insights/EngagementGraph";
import Issues from "../components/Issues";
import Drawer from "../components/Insights/Drawer";
import { useParams } from "react-router-dom";
import { useAnalysisProgress } from "../hooks/useAnalysisProgress";
import useAnalysisContext from "../context/useAnalysisContext";

import { ChevronDown, CircleCheck, CircleX, Loader } from "lucide-react";

function Analysis() {
    const [ currentView, setCurrentView ] = useState("insights");
    const { analysisId } = useParams()

    const { issues, selectedIssue, setSelectedIssue, analysisResult } = useAnalysisContext();
    const {
        isLoading,
        error,
        statusData,
        isStatusOpen,
        setIsStatusOpen,
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
    console.log(analysisResult);
    const agg_analysis = analysisResult?.data?.agg_analysis || {};
    console.log(isLoading);

    return (
        <div className="">
            <Navbar />
            <main className="ml-64 relative bg-background text-on-surface overflow-hidden">
                <Header currentView={currentView} setCurrentView={setCurrentView} />
                <ProgressReport
                    statusData={statusData}
                    isStatusOpen={isStatusOpen}
                    setIsStatusOpen={setIsStatusOpen}
                    isLoading={isLoading}
                    error={error}
                />

                { error &&
                    <div className="px-28 2xl:px-64 mt-16 h-full flex justify-center items-center">
                        <div className="bg-surface w-full h-90 flex justify-center items-center rounded-4xl">
                            <div>
                                <p className="font-bold text-sunset-500/80 text-2xl text-center">Something went wrong!</p>
                                <p className="text-on-surface/50 mt-4 text-center">Please try reloading the page.</p>
                            </div>
                        </div>
                    </div>
                }

                { !isLoading && !error && currentView === "insights" ?
                    <div className="px-28 2xl:px-64">
                        <HighLevelQualitative
                            overallTone={agg_analysis.overall_tone}
                            overallIntent={agg_analysis.overall_intent}
                            overallSummary={agg_analysis.overall_summary}
                        />
                        <Averages agg_analysis={agg_analysis} />
                        <EngagementGraph engagement_stats={agg_analysis.engagement_graph} />
                    </div>
                    : !isLoading && !error && currentView === "issues" &&
                    <div className="px-28 2xl:px-64 my-16">
                        <Issues />
                        <Drawer selectedIssue={selectedIssue} setSelectedIssue={setSelectedIssue} />
                    </div>
                }
            </main>
        </div>
    );
}

function ProgressReport({ statusData, isStatusOpen, setIsStatusOpen, isLoading, error }) {
    const lastIndex = statusData.length - 1;
    const progress = statusData[lastIndex]?.progress || 0;

    const processTitle = (progress, isLoading) => {
        if (isLoading) {
            return progress >= 100 ? "Finalizing Analysis..." : "Analysis In Progress...";
        } else if (error) {
            return "Analysis Failed";
        } else {
            return "Analysis Complete";
        }

    }

    const processIcon = (progress, isLoading) => {
        if (isLoading) {
            return progress >= 100 ? <CircleCheck size={24} className="text-green-500" /> : <Loader size={24} className="text-primary-500 animate-spin" />;
        } else if (error) {
            return <CircleX size={24} className="text-red-500" />;
        } else {
            return <CircleCheck size={24} className="text-green-500" />;
        }
    }

    const processClass = (progress, isLoading) => {
        if (isLoading) {
            return progress >= 100 ? "text-green-500" : "text-primary-500";
        } else if (error) {
            return "text-red-500";
        } else {
            return "text-green-500";
        }
    }

    return (
        <div className="px-28 2xl:px-64 mt-12 w-full rounded-2xl text-on-surface">
            <div className="w-full bg-surface px-6 py-4 rounded-2xl">
                <div className="flex justify-between">
                    <div className="flex gap-x-4 items-center">
                        { processIcon(progress, isLoading) }
                        <h1 className={`font-bold tracking-wide uppercase ${ processClass(progress, isLoading) } `}>{ processTitle(progress, isLoading) }</h1>
                    </div>
                    <ChevronDown size={24} className={`cursor-pointer transiton-all ${isStatusOpen ? "rotate-180" : "" }`} onClick={() => setIsStatusOpen(prev => !prev)} />
                </div>
                { isStatusOpen && <ProgressReportData statusData={statusData} error={error} /> }

            </div>
        </div>
    )
}

function ProgressReportData({ statusData, error }) {
    const lastIndex = statusData.length - 1;
    const progress = statusData[lastIndex]?.progress || 0;

    const progressBarColor = () => {
        if (error) {
            return "bg-red-500";
        } else if (progress >= 100) {
            return "bg-green-500";
        } else {
            return "bg-primary-500";
        }
    }

    const progressBarWidth = () => {
        if (error) {
            return "100%";
        } else {
            return `${progress}%`;
        }
    }

    return (
        <div className="mt-4">
            <div className="w-full h-1 bg-background rounded-2xl">
                <div
                    className={`h-1 transition-all duration-500 ease-out ${ progressBarColor() } rounded-2xl`}
                    style={{ width: progressBarWidth() }}
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
