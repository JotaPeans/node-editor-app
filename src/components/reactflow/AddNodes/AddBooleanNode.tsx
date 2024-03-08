import { Dispatch, SetStateAction } from "react";
import { useReactFlow, useViewport } from "reactflow";
import { v4 } from "uuid";
import { ToggleRight } from "lucide-react";

interface AddBooleanNodeProps {
    fromEdgeX?: number
    fromEdgeY?: number
    source?: string
    closeMenu: () => void
}

const AddBooleanNode = ({ fromEdgeX, fromEdgeY, source, closeMenu }: AddBooleanNodeProps) => {
    const { x: viewPortX, y: viewPortY, zoom: viewPortZoom } = useViewport();
    const { screenToFlowPosition, setNodes, setEdges } = useReactFlow();
    
    const fromEdge = Boolean(fromEdgeX && fromEdgeY);

    return (
        <button
            className="w-full min-h-8 rounded-lg bg-gradient-to-r from-blue-500/10 to-primary-dark/10 hover:bg-secondary flex items-center gap-2 px-2"
            onClick={() => {
                closeMenu && closeMenu();

                const id = v4();

                setNodes((nodes: any) => {
                    return [
                        ...nodes,
                        { 
                            id: id,
                            type: "boolean",
                            position: fromEdge ? screenToFlowPosition({
                                x: fromEdgeX!,
                                y: fromEdgeY!,
                            }) : {
                                x: (viewPortX * -1) / viewPortZoom + Math.floor(Math.random() * 300),
                                y: (viewPortY * -1) / viewPortZoom + Math.floor(Math.random() * 300) 
                            }, 
                            data: {
                                label: "Boolean"
                            }
                        }
                    ];
                });

                source && setEdges((eds) =>
                    eds.concat({ id, type: "text", source: source, target: id }),
                );
            }}
        >
            <ToggleRight size={20}/>
            <span>Booleano</span>
        </button>
    );
}
 
export default AddBooleanNode;