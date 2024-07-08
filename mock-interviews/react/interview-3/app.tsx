/**
 * How to build an Interactive JIRA Velocity Bar Chart?
 *
 * In this question, we need to a build an interactive bar chart similar to velocity
 * charts we see in Atlassian's JIRA product.
 *
 * Functional Requirements
 *
 * -  There should be a button that can be used to toggle the visibility of the chart.
 * - Department data would be provided using which we need to draw a Bar chart where Y
 *      axis represents the no. of tickets and X axis represents the departments.
 * - Each bar should be scaled based on the highest no. of tickets.
 * - Each bar should have a tooltip that displays department name along with no. of
 *      tickets when a bar is hovered.
 * - Bar's height should animate from 0 to final value upon entry and exit.
*/
// Mockups
// Mockup-1 [mock-interviews/react/interview-3/images/mockup-1.png]
// Mockup-2 [mock-interviews/react/interview-3/images/mockup-2.png]

import React, { useEffect, useMemo, useState } from 'react';
import { bootstrapReactApp } from '../../../libs/react/bootstrap';

import './app.css'

interface Department {
    id: string;
    name: string;
    ticketCount: number;
    color: string
}

interface DepartmentNormalized extends Department {
    id: string
    height: number;
    color: string;
    tooltip: string;
}


const ChartData: Array<Department> = [
  { id: "dep-1", name: "Legal", ticketCount: 32, color: "#3F888F" },
  { id: "dep-2", name: "Sales", ticketCount: 20, color: "#FFA420" },
  { id: "dep-3", name: "Engineering", ticketCount: 60, color: "#287233" },
  { id: "dep-4", name: "Manufacturing", ticketCount: 5, color: "#4E5452" },
  { id: "dep-5", name: "Maintenance", ticketCount: 14, color: "#642424" },
  {
    id: "dep-6",
    name: "Human Resourcing",
    ticketCount: 35,
    color: "#1D1E33"
  },
  { id: "dep-7", name: "Events", ticketCount: 43, color: "#E1CC4F" }
];


const Bar = ({dep}: {dep:DepartmentNormalized}) => {

    return (
         <div
            style = {{
                backgroundColor: dep.color,
                height: `${dep.height}%`,
            }}
            className="bar"
        >
            <div className="bar-tooltip">
                {dep.tooltip}
            </div>
        </div>
    );
}
const BarChart = ({data}: {data: Array<Department>}) => {

    const memoizedData = useMemo(()=>data,[data])

    const [showChart, setShowChart] = useState(true)
    const [computedGraphData, setComputedGraphData] = useState([] as DepartmentNormalized[])

    useEffect(() => {
        const maxHeight = memoizedData.reduce((acc, cur) => Math.max(acc, cur.ticketCount), 0)

        const computedData = memoizedData.map(data => {
            return {
                id: data.id,
                color: data.color,
                tooltip: `${data.name}:${data.ticketCount}`,
                height: (data.ticketCount / maxHeight) * 100,
            } as DepartmentNormalized
        })

        setComputedGraphData(computedData)
    },[])


    return(
        <div className="container">
            <span>
                <button
                    onClick={() => setShowChart((prev) => !prev)}
                >Toggle Chart</button>
            </span>
            {
                showChart &&
                <div className="graphContainer">
                    <div className="xAxis">No. of tickets</div>
                    <div className="yAxis">Departments</div>
                    <div className="graph">
                    {
                        computedGraphData.map((dep) => <Bar key={dep.id} dep={dep}/>)
                    }
                    </div>
                </div>
            }
        </div>
    )
}


const App = () => {
    return (
        <BarChart data={ChartData}></BarChart>
    )
}


bootstrapReactApp(<App/>)
