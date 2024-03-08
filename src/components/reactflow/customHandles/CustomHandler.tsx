import { Handle, Position, useEdges, getConnectedEdges, useReactFlow } from "reactflow";
import { useMemo } from "react";
import colors, { handlerNodeType } from "../colors";

interface CustomHandlerProps {
    id?: string
    nodeId: string
    handlerNodeType: handlerNodeType
    onConnectCallback?: (value: boolean) => void
    type: "target" | "source"
    position: Position
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
                type={type}
                position={position}
                style={{
                    backgroundColor: colors[handlerNodeType].color,
                    borderColor: colors[handlerNodeType].color
                }}
                isConnectable={isHandleConnectable}
                className="!w-3 !h-3 data-[connected=false]:!border-none data-[connected=true]:!bg-black data-[connected=true]:!border-2"
            />
        </div>
    );
}
 
export default CustomHandler;