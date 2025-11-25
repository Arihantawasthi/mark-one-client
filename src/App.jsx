import { useState } from "react";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { HighLevelQualitative, Averages } from "./components/Insights";


function App() {
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
                    </div>
                    :
                    <div>
                        ISSUES
                    </div>
                }
            </main>
        </div>
    );
}


export default App;
