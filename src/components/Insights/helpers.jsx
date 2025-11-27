const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-border">
        <Icon size={16} className="text-primary-500" />
        <h3 className="text-sm font-bold text-on-surface/60 uppercase tracking-widest">{title}</h3>
    </div>
);

const Card = ({ children, className = "" }) => (
    <div className={`bg-background border border-border rounded-xl overflow-hidden shadow-sm ${className}`}>
        {children}
    </div>
);


const BlueprintRow = ({ title, metrics }) => (
    <div className="p-4 bg-background/50 border-b border-border last:border-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 w-48">
                {title}
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                {metrics.map((m, i) => (
                    <div key={i} className="flex flex-col">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-1">{m.label}</span>
                        <span className="font-mono text-sm font-bold text-primary-500">
                            {m.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export { SectionHeader, Card, BlueprintRow };
