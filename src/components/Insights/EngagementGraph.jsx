import { Activity } from "lucide-react";
import { SectionHeader, Card } from "./helpers";

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


function EngagementGraph({ engagement_stats }) {
    const data = {
        labels: engagement_stats.map(point => point.word_count),
        datasets: [
            {
                label: 'Engagement Score',
                data: engagement_stats.map(point => point.engagement_score),
                borderColor: 'rgba(234, 179, 10, 0.5)',
                backgroundColor: 'rgba(234, 179, 10, 1)',
                pointRadius: 4,
                tension: 0.2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            }
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                border: {
                    color: 'rgb(39, 39, 42)',
                },
                grid:  {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Word Count', // X-axis label
                },
            },
            y: {
                type: 'linear',
                position: 'left',
                border: {
                    color: 'rgb(39, 39, 42)',
                },
                grid: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Engagement Score', // Y-axis label
                },
            },
        },
    };

    return (
        <Card className="p-6 bg-surface mt-16 mb-8">
            <SectionHeader icon={Activity} title="Engagement vs. Word Count" />


            <Line
                data={data}
                options={options}
            />
        </Card>
    );
}


export default EngagementGraph;
