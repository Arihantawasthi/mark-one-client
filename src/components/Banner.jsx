import { X } from "lucide-react";
import useAppContext from "../context/useAppContext";

function Banner() {
    const { banner, hideBanner } = useAppContext();
    if (!banner.visible) return null;

    return (
        <div className={`fixed top-8 right-8 flex items-start bg-surface text-on-surface px-5 py-4 z-10 w-[320px] animate-slide-in
                        rounded-3xl border-l-4 z-999 ${ banner.type === "error" ? "border-l-sunset-500": "border-l-green-500" }`}>
            <div className="flex-1">
                <p className={`font-bold text-lg ${ banner.type === "error" ? "text-sunset-500" : "text-green-500" }`}>{ banner.title }</p>
                <p className="text-on-surface/90 text-sm mt-1">{ banner.description }</p>
            </div>
            <button className="ml-4 mt-1 text-on-surface/80 hover:text-on-surface cursor-pointer" onClick={hideBanner}>
                <X size={20} />
            </button>
        </div>
    );
}

export default Banner;
