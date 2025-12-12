function NavHistoryLoading() {
    return (
        <div className="space-y-4 px-4">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-8 bg-background rounded animate-pulse"></div>
            ))}
        </div>
    );
}

export default NavHistoryLoading;
