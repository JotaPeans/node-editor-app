import { Dispatch, SetStateAction } from "react";
import { useReactFlow, useViewport } from "reactflow";
import { v4 } from "uuid";
import { TextCursorInput } from "lucide-react";

interface AddTextNodeProps {
    fromEdgeX?: number
    fromEdgeY?: number
    source?: string
    closeMenu?: () => void
}

const AddTextNode = ({ fromEdgeX, fromEdgeY, source, closeMenu }: AddTextNodeProps) => {
    const { x: viewPortX, y: viewPortY, zoom: viewPortZoom } = useViewport();
    const { screenToFlowPosition, setNodes, setEdges } = useReactFlow();
    
    const fromEdge = Boolean(fromEdgeX || fromEdgeY);
    
    return (
        <button
            className="w-full min-h-8 rounded-lg bg-gradient-to-r from-teal-500/10 to-primary-dark/10 hover:bg-secondary flex items-center gap-2 px-2"
            onClick={() => {
                closeMenu && closeMenu();
                const id = v4();
                setNodes((nodes: any) => {
                    return [
                        ...nodes,
                        { 
                            id: id,
                            type: "text",
                            position: fromEdge ? screenToFlowPosition({
                                x: fromEdgeX!,
                                y: fromEdgeY!,
                            }) : {
                                x: (viewPortX * -1) / viewPortZoom + Math.floor(Math.random() * 300),
                                y: (viewPortY * -1) / viewPortZoom + Math.floor(Math.random() * 300) 
                            },  
                            data: {
                                label: "Text"
                            }
                        }
                    ];
                });
            
                source && setEdges((eds) =>
                    eds.concat({ id, type: "text", source: source, target: id }),
                );
            }}
        >
            <TextCursorInput size={20}/>
            <span>Texto</span>
        </button>
    );
}
 
export default AddTextNode;