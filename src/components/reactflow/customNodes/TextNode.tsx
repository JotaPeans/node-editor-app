"use client"

import React, { memo } from "react";
import { useKeyPress, NodeProps, Position, useReactFlow } from "reactflow";
import CustomHandler from "../CustomHandler";

const TextNode = (props: NodeProps) => {
    const deletePressed = useKeyPress("Delete");
    const reactFlow = useReactFlow();

    if(deletePressed && props.selected) {
        reactFlow.setNodes(nodes => {
            return nodes.filter(node => node.id !== props.id);
        })
    }
    
    return (
        <div data-selected={props.selected} className="px-4 pb-3 w-52 h-60 shadow-md rounded-lg bg-primary border border-secondary-light data-[selected=true]:border-teal-500 flex flex-col gap-4 transition-all">
            <div className="min-w-full h-8 -mx-4 px-2 bg-secondary flex items-center font-medium text-white border-b border-secondary-light rounded-t-lg">
                {props.data.label}
            </div>

            <CustomHandler connectable={1} id="input-text" nodeId={props.id} text="Texto" position={Position.Left} handlerNodeType="text" type="target"/>

            <textarea className="rounded-lg bg-secondary border border-secondary-light min-h-24 p-1 text-white"></textarea>

            <CustomHandler id="output" nodeId={props.id} text="Texto" position={Position.Right} handlerNodeType="text" type="source"/>
        </div>
    );
}
 
export default memo(TextNode);