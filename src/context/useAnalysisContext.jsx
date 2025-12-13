import { useContext } from "react";
import { AnalysisContext } from "./AnalysisProvider";

export default function useAnalysisContext() {
    const context = useContext(AnalysisContext);
    if (!context) {
        throw new Error("useAnalysis must be used within an AnalysisProvider");
    }
    return context;
}
