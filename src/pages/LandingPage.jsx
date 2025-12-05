import { useState } from 'react';
import { Stars, Radar, SearchIcon, PlusIcon, X, ScanSearch } from 'lucide-react';
import TextField from '../components/TextField';


function LandingPage() {
    const [ activeCard, setActiveCard ] = useState("market");

    return  (
        <div className="min-h-screen flex flex-col items-center justify-center border border-border bg-app-bg text-center p-8">
            <div className="flex items-center gap-x-2 bg-surface px-4 py-2 rounded-full mb-6 shadow-md">
                <Stars size={16} className="text-primary-500 animate-pulse" />
                <p className="text-xs">Mark One v1.0</p>
            </div>
            <h1 className="text-6xl font-extrabold mb-4">
                Analysis <span className="text-primary-500">Engine</span>
            </h1>
            <p className="text-xl text-on-surface/80 font-light mb-8">
                Your next-generation newsletter competitor analysis tool.
            </p>

            <div className="flex items-center gap-x-8 mb-12">
                <MarketScoutCard
                    isActive={activeCard === "market"}
                    onActive={() => setActiveCard("market")}
                />
                <NewsletterAnalysisCard
                    isActive={activeCard === "newsletter"}
                    onActive={() => setActiveCard("newsletter")}
                />
            </div>
            <button className="bg-primary-500 text-on-primary px-6 py-3 rounded-2xl font-bold hover:opacity-90 transition active:scale-95 cursor-pointer">
                Start Analysis!
            </button>
        </div>
    );
}

function NewsletterAnalysisCard({ isActive, onActive }) {
    const [ links, setLinks ] = useState([]);
    const [ linkInput, setLinkInput ] = useState("");

    const addQuery = () => {
        if (linkInput.trim() !== "") {
            setLinks([...links, linkInput.trim()]);
            setLinkInput("");
        }
    };

    return (
        <div className={`text-left bg-surface text-on-surface p-8 rounded-4xl shadow-md relative
                        mx-auto ${ isActive ? "border border-primary-500" : "border-none" }
                        transition w-[600px] max-w-[600px] overflow-hidden active:scale-95`}
            onClick={onActive}
        >
            { !isActive && <div className="absolute w-full h-full top-0 left-0 bg-background opacity-70 transition hover:opacity-50"></div> }
            <div className="flex items-center justify-between mb-6">
                <div className={`${ isActive ? "bg-primary-500" : "bg-gray-400" } rounded-xl h-12 w-12 flex items-center justify-center`}>
                    <ScanSearch size={24} className="text-on-primary" />
                </div>
                <div className={`h-3 w-3 ${ isActive ? "bg-primary-500 animate-pulse shadow-[0_0_20px_rgba(234,179,10,1)]" : "bg-gray-400" } rounded-full`}></div>
            </div>
            <h1 className="text-4xl font-bold mb-2">Newsletter Analysis</h1>
            <p className="text-on-surface/80 mb-6">Analyze newsletters to uncover key insights and strategies.</p>

            { links.length > 0 &&
                <div className="flex items-center gap-y-2 gap-x-4 mb-2 flex-wrap">
                    { links.map((query, index) => (
                        <div key={index} className="flex items-center gap-x-1 bg-surface/50 text-xs rounded-xl p-2 border border-border">
                            <span>{ query }</span>
                            <X
                                size={16}
                                className="inline ml-1 cursor-pointer text-on-surface/60 hover:text-on-surface"
                                onClick={() => setLinks(links.filter((_, i) => i !== index))}
                            />
                        </div>
                    ))}
                </div>
            }
            <div className="flex justify-between gap-x-4 items-end">
                <TextField
                    label="Enter newsletter links"
                    placeholder="e.g. https://example.substack.com/"
                    leftIcon=<SearchIcon size={16} className="text-on-surface/60" />
                    value={linkInput}
                    onChange={e => setLinkInput(e.target.value)}
                />
                <button className="bg-primary-500 rounded-lg p-2 hover:opacity-90 transitio flex items-center justify-center active:scale-95 cursor-pointer">
                    <PlusIcon size={24} className="text-on-primary" onClick={addQuery}/>
                </button>
            </div>
        </div>
    );
}

function MarketScoutCard({ isActive, onActive }) {
    const [ queries, setQueries ] = useState([]);
    const [ queryInput, setQueryInput ] = useState("");

    const addQuery = () => {
        if (queryInput.trim() !== "") {
            setQueries([...queries, queryInput.trim()]);
            setQueryInput("");
        }
    };

    return (
        <div className={`text-left bg-surface text-on-surface p-8 rounded-4xl shadow-md relative
                         overflow-hidden mx-auto ${ isActive ? "border border-primary-500" : "border-none" }
                         transition w-[600px] max-w-[600px] active:scale-95`}
            onClick={onActive}
        >
            { !isActive && <div className="absolute w-full h-full top-0 left-0 bg-background opacity-70 transition hover:opacity-50"></div> }
            <div className="flex items-center justify-between mb-6">
                <div className={`${ isActive ? "bg-primary-500" : "bg-gray-400" } rounded-xl h-12 w-12 flex items-center justify-center`}>
                    <Radar size={24} className="text-on-primary" />
                </div>
                <div className={`h-3 w-3 ${ isActive ? "bg-primary-500 animate-pulse shadow-[0_0_20px_rgba(234,179,10,1)]" : "bg-gray-400" } rounded-full`}></div>
            </div>
            <h1 className="text-4xl font-bold mb-2">Market Scout</h1>
            <p className="text-on-surface/80 mb-6">Discover competitors by analyzing markets and niches.</p>

            { queries.length > 0 &&
                <div className="flex items-center gap-y-2 gap-x-4 mb-2 flex-wrap">
                    { queries.map((query, index) => (
                        <div key={index} className="flex items-center gap-x-1 bg-surface/50 text-xs rounded-xl p-2 border border-border">
                            <span>{ query }</span>
                            <X
                                size={16}
                                className="inline ml-1 cursor-pointer text-on-surface/60 hover:text-on-surface"
                                onClick={() => setQueries(queries.filter((_, i) => i !== index))}
                            />
                        </div>
                    ))}
                </div>
            }
            <div className="flex justify-between gap-x-4 items-end">
                <TextField
                    label="Enter a market or niche to explore"
                    placeholder="e.g. Tech Newsletters, Health & Wellness Blogs"
                    leftIcon=<SearchIcon size={16} className="text-on-surface/60" />
                    value={queryInput}
                    onChange={e => setQueryInput(e.target.value)}
                />
                <button className="bg-primary-500 rounded-lg p-2 hover:opacity-90 transitio flex items-center justify-center active:scale-95 cursor-pointer">
                    <PlusIcon size={24} className="text-on-primary" onClick={addQuery}/>
                </button>
            </div>
        </div>
    );
}


export default LandingPage;
