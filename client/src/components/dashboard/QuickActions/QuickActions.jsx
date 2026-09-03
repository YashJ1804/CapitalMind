import {
    Search,
    Bookmark,
    History,
    Briefcase,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import Card from "../../ui/Card/Card";

export default function QuickActions() {

    const navigate = useNavigate();

    const actions = [
        {
            title: "Analyze Company",
            description: "AI-powered investment analysis",
            icon: <Search size={24} />,
            path: "/analyze",
        },
        {
            title: "Watchlist",
            description: "View saved companies",
            icon: <Bookmark size={24} />,
            path: "/watchlist",
        },
        {
            title: "History",
            description: "Previous analyses",
            icon: <History size={24} />,
            path: "/history",
        },
        {
            title: "Portfolio",
            description: "Track your investments",
            icon: <Briefcase size={24} />,
            path: "/portfolio",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

            {actions.map((action) => (

                <Card key={action.title}>

                    <button
                        type="button"
                        onClick={() => navigate(action.path)}
                        className="flex w-full flex-col items-start gap-4 text-left"
                    >

                        <div className="text-blue-400">
                            {action.icon}
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-white">
                                {action.title}
                            </h3>

                            <p className="mt-1 text-sm text-slate-400">
                                {action.description}
                            </p>
                        </div>

                    </button>

                </Card>

            ))}

        </div>
    );
}