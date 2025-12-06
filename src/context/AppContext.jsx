import { createContext, useState } from 'react';

const AppContext = createContext(null);

function AppProvider({ children }) {
    const [marketQueries, setMarketQueries] = useState([]);
    const [newsletterLinks, setNewsletterLinks] = useState([]);
    const [banner, setBanner] = useState({
        title: "",
        description: "",
        type: "", // "success", "error", "info"
        visible: false
    });

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

    const showBanner = (title, description, type) => {
        setBanner({
            title,
            description,
            type,
            visible: true
        });
        setTimeout(() => {
            setBanner(prev => ({ ...prev, visible: false }));
        }, 4000);
    }

    const hideBanner = () => {
        setBanner(prev => ({ ...prev, visible: false }));
    }

    return (
        <AppContext.Provider value={{
            marketQueries,
            addMarketQuery,
            newsletterLinks,
            addNewsletterLink,
            removeMarketQuery,
            removeNewsletterLink,
            banner,
            showBanner,
            hideBanner
        }}>
            {children}
        </AppContext.Provider>
    );
}

export { AppProvider, AppContext };
