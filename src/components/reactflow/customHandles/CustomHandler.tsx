import { Handle, Position, useEdges, getConnectedEdges, useReactFlow } from "reactflow";
import { blue, teal, zinc } from "tailwindcss/colors";
import { useMemo } from "react";

type handlerNodeType = "text" | "boolean" | "any";

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

type ColorsProps = {
    [key in handlerNodeType]: {
        bg: string;
        border: string;
        color: string
    };
};

const CustomHandler = ({ id, nodeId, handlerNodeType, onConnectCallback, type, position, text, connectable }: CustomHandlerProps) => {
    const edges = useEdges();
    const { getNode } = useReactFlow();

    const colors: ColorsProps = {
        "text": {
            "bg": "!bg-teal-500",
            "border": "!border-teal-500",
            "color": teal[500]
        },
        "boolean": {
            "bg": "!bg-blue-500",
            "border": "!border-blue-500",
            "color": blue[500]
        },
        "any": {
            "bg": "!bg-zinc-400",
            "border": "!border-zinc-400",
            "color": zinc[400]
        }
    }

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