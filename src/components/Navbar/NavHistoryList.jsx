import { BookA } from "lucide-react";
import { NavLink } from "react-router-dom";

function NavHistoryList({ analyses }) {
    return (analyses.map((item, i) => (
        <NavLink
            key={item.id}
            to={`/analysis/${item.id}`}
            className={({ isActive }) =>
                isActive
                    ? "flex items-center space-x-2 px-4 py-3 rounded-xl cursor-pointer bg-background font-medium text-primary-500"
                    : "flex items-center space-x-2 px-4 py-3 rounded-xl cursor-pointer hover:bg-background"
            }
        >
            <BookA size={16} className="text-primary-500" />
            <span className="text-sm font-medium text-on-surface truncate">{ item.display_title }</span>
        </NavLink>
    )))
}

export default NavHistoryList;
