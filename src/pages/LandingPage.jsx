import { useState } from 'react';
import { Stars, Radar, SearchIcon, PlusIcon, X, ScanSearch, Loader } from 'lucide-react';
import TextField from '../components/TextField';

import { useNavigate } from 'react-router-dom';
import useAppContext from '../context/useAppContext';
import { validateNewsletterUrl } from '../utils/helpers';

import { createMarketScoutRequest } from '../api/requests';
import useProvideGoPost from '../hooks/useProvideGoPost';


function LandingPage() {
    const [ activeCard, setActiveCard ] = useState("market");
    const navigate = useNavigate();
    const { marketQueries, newsletterLinks, showBanner } = useAppContext();
    const { loading, goPost } = useProvideGoPost();

    const handleStartAnalysis = async () => {
        if (activeCard === "market") {
            if (marketQueries.length === 0) {
                showBanner({
                    title: "Error!",
                    description: "Please add at least one market query to proceed.",
                    type: "error"
                });
                return;
            }

            const onSuccess = data => {
                showBanner({
                    title: "Success!",
                    description: "Your market analysis has been initiated successfully.",
                    type: "success"
                });
                navigate(`/analysis/${data.analysis_id}`);
            }

            const onError = (e) => {
                console.log(e);
                showBanner({
                    title: "Error!",
                    description: "Failed to start market analysis",
                    type: "error"
                });
            }

            const { url, body } = createMarketScoutRequest(marketQueries);
            await goPost(url, body, { onSuccess, onError });

        } else if (activeCard === "newsletter") {
            console.log(newsletterLinks);
        }
    }

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
            <button
                className="bg-primary-500 text-on-primary px-6 py-3 rounded-2xl font-bold hover:opacity-90 transition active:scale-70 cursor-pointer"
                onClick={handleStartAnalysis}
            >
                { loading ? <Loader size={16} className="text-on-primary animate-spin" /> : "Start Analysis!" }
            </button>
        </div>
    );
}

function NewsletterAnalysisCard({ isActive, onActive }) {
    const [ linkInput, setLinkInput ] = useState("");
    const [ error, setError ] = useState("");
    const [ shake, setShake ] = useState(false);
    const { newsletterLinks, addNewsletterLink, removeNewsletterLink } = useAppContext();

    const addQuery = () => {
        const result = validateNewsletterUrl(linkInput);

        if (!result.valid) {
            setError(result.message);
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }

        addNewsletterLink(linkInput);
        setLinkInput("");
    };

    return (
        <div className={`text-left bg-surface text-on-surface p-8 rounded-4xl shadow-md relative
                        mx-auto ${ isActive ? "border border-primary-500" : "border-none" }
                        transition w-[600px] max-w-[600px] overflow-hidden
                        ${ shake ? "shake border-sunset-500" : "" }`}
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

            { newsletterLinks.length > 0 &&
                <div className="flex items-center gap-y-2 gap-x-4 mb-2 flex-wrap">
                    { newsletterLinks.map((query, index) => (
                        <div key={index} className="flex items-center gap-x-1 bg-surface/50 text-xs rounded-xl p-2 border border-border">
                            <span>{ query }</span>
                            <X
                                size={16}
                                className="inline ml-1 cursor-pointer text-on-surface/60 hover:text-on-surface"
                                onClick={() => removeNewsletterLink(index)}
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
                    onChange={e => {
                        setLinkInput(e.target.value);
                        setError("")
                    }}
                    error={error}
                />
                <button
                    className="bg-primary-500 rounded-lg p-2 hover:opacity-90 transition flex items-center justify-center active:scale-95 cursor-pointer"
                    onClick={addQuery}
                >
                    <PlusIcon size={24} className="text-on-primary" />
                </button>
            </div>
        </div>
    );
}

function MarketScoutCard({ isActive, onActive }) {
    const [ queryInput, setQueryInput ] = useState("");
    const { marketQueries, addMarketQuery, removeMarketQuery } = useAppContext();

    const addQuery = () => {
        addMarketQuery(queryInput);
        setQueryInput("");
    };

    return (
        <div className={`text-left bg-surface text-on-surface p-8 rounded-4xl shadow-md relative
                         overflow-hidden mx-auto ${ isActive ? "border border-primary-500" : "border-none" }
                         transition w-[600px] max-w-[600px]`}
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

            { marketQueries.length > 0 &&
                <div className="flex items-center gap-y-2 gap-x-4 mb-2 flex-wrap">
                    { marketQueries.map((query, index) => (
                        <div key={index} className="flex items-center gap-x-1 bg-surface/50 text-xs rounded-xl p-2 border border-border">
                            <span>{ query }</span>
                            <X
                                size={16}
                                className="inline ml-1 cursor-pointer text-on-surface/60 hover:text-on-surface"
                                onClick={() => removeMarketQuery(index)}
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
                <button
                    className="bg-primary-500 rounded-lg p-2 hover:opacity-90 transition flex items-center justify-center active:scale-95 cursor-pointer"
                    onClick={addQuery}
                >
                    <PlusIcon size={24} className="text-on-primary" />
                </button>
            </div>
        </div>
    );
}


export default LandingPage;
