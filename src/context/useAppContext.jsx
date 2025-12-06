import { AppContext } from "./AppContext";
import { useContext } from "react";


function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAnalysis must be used within an AnalysisProvider");
    }
    return context;
}

export default useAppContext;
