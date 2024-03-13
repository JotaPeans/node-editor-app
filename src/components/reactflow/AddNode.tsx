import { useReactFlow, useViewport } from "reactflow";
import { v4 } from "uuid";
import addNodeParams from "./configs/addNodeParams";

interface AddNodeProps {
    fromEdgeX?: number
    fromEdgeY?: number
    nodeType: "text" | "boolean"
    buttonText: string
    source?: string
    handleId?: string
    closeMenu: () => void
}

const AddNode = ({ fromEdgeX, fromEdgeY, nodeType, buttonText, source, handleId, closeMenu }: AddNodeProps) => {
    const { x: viewPortX, y: viewPortY, zoom: viewPortZoom } = useViewport();
    const { screenToFlowPosition, setNodes, setEdges } = useReactFlow();
    
    const fromEdge = Boolean(fromEdgeX && fromEdgeY);

    return (
        <button
            className="w-full min-h-8 rounded-lg hover:bg-secondary flex items-center gap-2 px-2"
            style={{
                background: addNodeParams[nodeType].background,
            }}
            onClick={() => {
                closeMenu && closeMenu();

                const id = v4();

                setNodes((nodes: any) => {
                    return [
                        ...nodes,
                        { 
                            id: id,
                            type: nodeType,
                            position: fromEdge ? screenToFlowPosition({
                                x: fromEdgeX!,
                                y: fromEdgeY!,
                            }) : {
                                x: (viewPortX * -1) / viewPortZoom + Math.floor(Math.random() * 300),
                                y: (viewPortY * -1) / viewPortZoom + Math.floor(Math.random() * 300) 
                            }, 
                            data: {
                                label: nodeType
                            }
                        }
                    ];
                });

                source && setEdges((eds) =>
                    eds.concat({
                        id,
                        type: "custom",
                        data: nodeType,
                        source: source,
                        target: id,
                        sourceHandle: handleId,
                        targetHandle: "input:".concat(nodeType === "boolean" ? "any" : nodeType)
                    }),
                );
            }}
        >
            { addNodeParams[nodeType].icon }
            <span className="capitalize">{buttonText}</span>
        </button>
    );
}
 
export default AddNode;