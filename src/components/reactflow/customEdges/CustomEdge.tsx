import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath, useReactFlow } from "reactflow";
// import { blue } from "tailwindcss/colors";
import { Unlink } from "lucide-react";
import colors, { ColorsProps } from "../colors";

const CustomEdge = ({ id, selected, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps) => {
    const { setEdges } = useReactFlow();
    const [ edgePath, labelX, labelY ] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    function deleteEdge() {
        setEdges(edges => edges.filter(edge => edge.id !== id));
    }

    return (
        <>  
            <BaseEdge id={id} path={edgePath} style={{
                stroke: colors[data as keyof ColorsProps].color,
                strokeWidth: 3,
            }} />
            <EdgeLabelRenderer>
                <div
                    style={{
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    }}
                    data-show={selected}
                    className="absolute pointer-events-auto text-xs opacity-0 data-[show=false]:pointer-events-none data-[show=true]:opacity-100 transition-all"
                >
                    <button onClick={deleteEdge} className="rounded-full p-2 bg-blue-500 hover:bg-blue-600 transition-all text-white ring-4 ring-primary-dark">
                        <Unlink size={16}/>
                    </button>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}
 
export default CustomEdge;