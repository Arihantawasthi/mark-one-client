import { useState } from "react";

import Navbar from "../components/Navbar";
import Header from "../components/Header";

import HighLevelQualitative from "../components/Insights/HighLevelQualitative";
import Averages from "../components/Insights/Averages";
import EngagementGraph from "../components/Insights/EngagementGraph";
import Issues from "../components/Issues";
import Drawer from "../components/Insights/Drawer";


function Analysis() {
    const [currentView, setCurrentView] = useState("insights");

    return (
        <div className="">
            <Navbar />
            <main className="ml-64 bg-background text-on-surface">
                <Header currentView={currentView} setCurrentView={setCurrentView} />
                { currentView === "insights" ?
                    <div className="px-64">
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
