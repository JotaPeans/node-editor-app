import { Handle, Position, useEdges } from "reactflow";

type handlerNodeType = "text" | "boolean" | "any";

interface TextHandlerProps {
    id?: string
    nodeId: string
    handlerNodeType: handlerNodeType
    type: "target" | "source"
    position: Position
    text: string
}

type ColorsProps = {
    [key in handlerNodeType]: {
        bg: string;
        border: string;
    };
};

const TextHandler = ({ id, nodeId, handlerNodeType, type, position, text }: TextHandlerProps) => {
    const edges = useEdges();

    const colors: ColorsProps = {
        "text": {
            "bg": "!bg-teal-500",
            "border": "!border-teal-500"
        },
        "boolean": {
            "bg": "!bg-blue-500",
            "border": "!border-blue-500"
        },
        "any": {
            "bg": "!bg-zinc-400",
            "border": "!border-zinc-400"
        }
    }

    return (
        <div className="relative flex items-center min-w-full -mx-4 px-4">
            <p data-type={type} className="data-[type=target]:text-start data-[type=source]:text-end w-full text-white">{ text }</p>
            <Handle
                id={id}
                data-connected={edges.find(edg => edg[type] === nodeId) ? true : false}
                type={type}
                position={position}
                className={`!w-3 !h-3 ${colors[handlerNodeType].bg} data-[connected=false]:!border-none data-[connected=true]:!bg-black data-[connected=true]:!border-2 data-[connected=true]:${colors[handlerNodeType].border}`}
            />
        </div>
    );
}
 
export default TextHandler;