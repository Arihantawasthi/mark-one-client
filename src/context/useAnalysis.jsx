import { AnalysisContext } from "./AnalysisContext";
import { useContext } from "react";


function useAnalysis() {
    const context = useContext(AnalysisContext);
    if (!context) {
        throw new Error("useAnalysis must be used within an AnalysisProvider");
    }
    return context;
}

export default useAnalysis;
