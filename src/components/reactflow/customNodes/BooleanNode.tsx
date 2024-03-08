"use client"

import React, { memo, useState } from "react";
import { useKeyPress, NodeProps, Position, useReactFlow } from "reactflow";
import CustomHandler from "../customHandles/CustomHandler";

const BooleanNode = (props: NodeProps) => {
    const [ inputConnected, setInputConnected ] = useState(false);
    const deletePressed = useKeyPress("Delete");
    const reactFlow = useReactFlow();

    if(deletePressed && props.selected) {
        reactFlow.setNodes(nodes => {
            return nodes.filter(node => node.id !== props.id);
        })
    }
    
    return (
        <div data-selected={props.selected} className="px-4 pb-3 w-52 h-auto shadow-md rounded-lg bg-primary border border-secondary-light data-[selected=true]:border-blue-500 flex flex-col gap-4 transition-all">
            <div className="min-w-full h-8 -mx-4 px-2 bg-secondary flex items-center font-medium text-white border-b border-secondary-light rounded-t-lg">
                {props.data.label}
            </div>

            <CustomHandler
                id="input-boolean"
                nodeId={props.id}
                text="Entrada"
                position={Position.Left}
                handlerNodeType="any"
                type="target"
                connectable={1}
                onConnectCallback={v => setInputConnected(v)}
            />

            <input type="checkbox" name="" id="" disabled={inputConnected} />

            <CustomHandler id="true-handler" nodeId={props.id} text="True" position={Position.Right} handlerNodeType="boolean" type="source"/>
            <CustomHandler id="false-handler" nodeId={props.id} text="False" position={Position.Right} handlerNodeType="boolean" type="source"/>
        </div>
    );
}
 
export default memo(BooleanNode);