"use client"

import { Handle, useEdges, getConnectedEdges, useReactFlow, Connection, HandleProps } from "reactflow";
import { useMemo } from "react";
import colors, { handlerNodeType } from "./configs/colors";

interface CustomHandlerProps extends HandleProps {
    nodeId: string
    handlerNodeType: handlerNodeType
    onConnectCallback?: (value: boolean) => void
    text: string
    connectable?: number
}

const CustomHandler = ({ id, nodeId, handlerNodeType, onConnectCallback, type, position, text, connectable }: CustomHandlerProps) => {
    const edges = useEdges();
    const { getNode } = useReactFlow();

    const connected = edges.find(edg => {
        if(edg.sourceHandle && (edg[type] === nodeId && edg.sourceHandle === id)) {
            return true;
        }
        else if(edg.targetHandle && (edg[type] === nodeId && edg.targetHandle === id)) {
            return true;
        }
        else return false
    }) ? true : false;

    onConnectCallback && onConnectCallback(connected);

    const isHandleConnectable = useMemo(() => {
        if(connectable) {
            const node: any = getNode(nodeId);
            const connectedEdges = getConnectedEdges([node], edges);
    
            return connectedEdges.length < connectable;
        }

    }, [edges, nodeId, connectable]);

    return (
        <div className="relative flex items-center min-w-full -mx-4 px-4">
            <p data-type={type} className="data-[type=target]:text-start data-[type=source]:text-end w-full text-white">{ text }</p>
            <Handle
                id={id}
                data-connected={connected}
                isValidConnection={c => {
                    const sourceHandleType = c.sourceHandle?.split(":")[1].toLowerCase();
                    const targetHandleType = c.targetHandle?.split(":")[1].toLowerCase();
                    
                    if(targetHandleType === "any" || sourceHandleType === targetHandleType) {
                        return true;
                    }
                    return false
                }}
                type={type}
                position={position}
                style={{
                    width: 12,
                    height: 12,
                    backgroundColor: colors[handlerNodeType].color,
                    borderColor: colors[handlerNodeType].color
                }}
                isConnectable={isHandleConnectable}
                className="data-[connected=false]:!border-none data-[connected=true]:!bg-black transition-all data-[connected=true]:!border-2"
            />
        </div>
    );
}
 
export default CustomHandler;