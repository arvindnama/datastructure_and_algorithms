/**
 * In this question, the candidate needs to build a sidebar that
 * contains a collapsible tree-like UI.
 *
 * Requirements:
 * - The backend provides the data via an API.
 * - The menu should be collapsible.
 * - Each node should be a link.
 * - A node at any level can have children or be a leaf/terminal node.
 * - A node with children should have right carat icon when in closed state and down carat
 *   icon when in open state.
 * - Each level should be properly indented.
 * - Each node's text label color should be #0097e6. It should be underlined on hover.
 */

import { bootstrapReactApp } from "../../../libs/react/bootstrap";

// mockup [mock-interviews/react/side-bar/images/mockup.png]

import React, { useEffect, useState } from 'react';

import './app.css';
import classnames from "classnames";

interface Node {
    text: string;
    children?: Node[];
}

const sidebarData: Node = {
    text: 'Knowledge Base Articles',
    children:[{
        text: 'Academic Technologies',
        children: [{
            text: 'Lightboard',
        },{
            text: 'OWL 360 Camera tutorials',
        },{
            text: 'Screen Pal',
        }]
    },{
        text: 'Apple',
        children:[{
            text: 'ios Articles',
            children:[{
                text: 'vpn with ios'
            },{
                text: 'upgrade ios'
            }]
        },{
            text: 'mac Articles',
            children:[{
                text: 'fix mac os'
            },{
                text: 'upgrade macos'
            }]
        }]
    }]
}

const fetchSidebarData = (): Promise<Node> => new Promise(res=> setTimeout(()=>res(sidebarData), 100))


const SidebarItem = ({item}: {item: Node}) =>{

    const [collapsed, setCollapsed] = useState(true);
    const hasChildren = !!item.children?.length ;

    return (
        <div>
            <div
                onClick={() => setCollapsed(prev => !prev)}
                className={
                    classnames(
                        "sidebarItem",
                        !collapsed && "sidebarItemExpanded"
                    )
                }
            >
                <div className= "sidebarIcon">
                    {
                        hasChildren
                        ? <div > &gt; </div>
                        : <div className="circleIcon"> </div>
                    }
                </div>
                <a>
                    {item.text}
                </a>
            </div>
            {
                hasChildren && !collapsed &&
                <div className="sidebarSubitem">
                    { item.children?.map( (i,idx) => (<SidebarItem key={idx} item = {i}/>))}
                </div>
            }
        </div>
    )
}

const Sidebar = () =>{

    const [sideBar, setSideBar] = useState<Node>()
    useEffect(()=>{
        fetchSidebarData().then((data) => {
            setSideBar(data)
        })
    },[])
    return (
        <div className="sidebar">
            {sideBar && <SidebarItem item={sideBar}/>}
        </div>
    )
}


bootstrapReactApp(<Sidebar/>)
