import { Link } from 'react-router-dom';

function LandingPage() {
    return  (
        // Simple full-page view without the navbar
        <div className="min-h-screen flex flex-col items-center justify-center bg-app-bg text-center p-8">
            <h1 className="text-6xl font-heading mb-4 text-app-primary-500">
                Welcome to Analyzer
            </h1>
            <p className="text-xl text-white/80 mb-8">
                Your next-generation newsletter competitor analysis tool.
            </p>

            {/* Call to action button to enter the main app */}
            <Link
                to="/analysis/dashboard"
                className="py-3 px-8 bg-app-accent-500 text-white rounded-full font-bold text-lg hover:bg-app-accent-600 transition duration-200 shadow-xl"
            >
                Launch Analysis Dashboard
            </Link>
        </div>
    );
}


export default LandingPage;
