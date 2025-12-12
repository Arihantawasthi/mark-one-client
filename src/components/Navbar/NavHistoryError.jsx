function NavHistoryError({ refetch }) {
    return (
        <div className="px-4 py-3 text-sunset-500 text-sm">
            <p>Failed to load history.</p>
            <button
                onClick={refetch}
                className="mt-2 flex items-center gap-1 text-primary-500 hover:text-primary-400 text-xs"
            >
                Retry
            </button>
        </div>
    );
}

export default NavHistoryError;
