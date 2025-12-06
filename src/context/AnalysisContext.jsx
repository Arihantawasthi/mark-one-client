import { createContext, useContext, useState } from 'react';

const AnalysisContext = createContext(null);

function AnalysisProvider({ children }) {
    const [marketQueries, setMarketQueries] = useState([]);
    const [newsletterLinks, setNewsletterLinks] = useState([]);

    const addMarketQuery = (query) => {
        if (marketQueries.includes(query)) return;
        if (query.trim() === "") return;

        setMarketQueries([...marketQueries, query.trim()]);
    }

    const addNewsletterLink = (link) => {
        if (newsletterLinks.includes(link)) return;
        if (link.trim() === "") return;

        setNewsletterLinks([...newsletterLinks, link.trim()]);
    }

    const removeMarketQuery = (index) => {
        setMarketQueries(marketQueries.filter((_, i) => i !== index));
    }

    const removeNewsletterLink = (index) => {
        setNewsletterLinks(newsletterLinks.filter((_, i) => i !== index));
    }

    return (
        <AnalysisContext.Provider value={{
            marketQueries,
            addMarketQuery,
            newsletterLinks,
            addNewsletterLink,
            removeMarketQuery,
            removeNewsletterLink
        }}>
            {children}
        </AnalysisContext.Provider>
    );
}

export { AnalysisProvider, AnalysisContext };
