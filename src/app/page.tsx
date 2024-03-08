"use client"

import ContextMenu from "@/components/ContextMenu";
import AddBooleanNode from "@/components/reactflow/AddNodes/AddBooleanNode";
import AddTextNode from "@/components/reactflow/AddNodes/AddTextNode";
import BooleanNode from "@/components/reactflow/customNodes/BooleanNode";
import TextNode from "@/components/reactflow/customNodes/TextNode";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, { Background, BackgroundVariant, Controls, OnConnectStartParams, addEdge, useEdgesState, useNodesState, useReactFlow } from "reactflow";
import colors from "tailwindcss/colors";
import CustomEdge from "@/components/reactflow/customEdges/CustomEdge";

const nodeTypes = {
    text: TextNode,
    boolean: BooleanNode
}

const edgeTypes = {
    custom: CustomEdge
}

interface contextMenuProps {
    show: boolean
    x: number
    y: number
    fromEdge: boolean
}

const App = () => {
    const [ nodes, setNodes, onNodesChange ] = useNodesState([]);
    const [ edges, setEdges, onEdgesChange ] = useEdgesState([]);

    const { screenToFlowPosition } = useReactFlow();
    
    const connectingNodeId = useRef<string | null>(null);
    const connectingHandleId = useRef<string | null>(null);

    const [ contextMenu, setContextMenu ] = useState<contextMenuProps>({ show: false, x: 0, y: 0, fromEdge: false });

    useEffect(() => {
        connectingNodeId.current = null;
    }, [edges]);

    const onConnect = useCallback(async (params: any) => {
        if(params.source !== params.target) {
            setEdges(eds => {
                return addEdge({
                    ...params,
                    type: "custom",
                    data: nodes.find(node => node.id === params.source)?.type
                }, eds);
            });
        }
    }, [nodes]);

    const onConnectStart = useCallback((_: any, { nodeId, handleId, handleType }: OnConnectStartParams) => {
        if(handleType === "source") {
            connectingNodeId.current = nodeId;
            connectingHandleId.current = handleId;
            nodeId && setContextMenu(contextMenu => {
                return {
                    ...contextMenu,
                    source: nodeId
                }
            })
        }
    }, []);

    const onConnectEnd = useCallback((event: MouseEvent | TouchEvent) => {
        if (!connectingNodeId.current) return;
        
        const targetIsPane = (event.target as any)?.classList.contains("react-flow__pane");

        if(targetIsPane && connectingNodeId.current) {
            openContextMenu(event as any, (event as any).clientX, (event as any).clientY);
        }
    }, [screenToFlowPosition]);

    function openContextMenu(e: MouseEvent, x?: number, y?: number) {
        e.preventDefault();
        const { pageX, pageY } = e;
        setContextMenu({ show: true, x: x ?? pageX, y: y ?? pageY, fromEdge: Boolean(x || y) });
    }

    function closeContextMenu() {
        setContextMenu({ show: false, x: contextMenu.x, y: contextMenu.y, fromEdge: false });
    }
    
    return (
        <main className="flex-1 bg-primary-dark" onContextMenu={e => openContextMenu(e as any)}>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                fitViewOptions={{
                    duration: 700,
                    padding: 500,
                    minZoom: 1
                }}
                edges={edges}
            >
                <Background color={colors.zinc[600]} size={1.5} variant={BackgroundVariant.Dots}/>
                <Controls/>
            </ReactFlow>
            
            <ContextMenu
                show={contextMenu.show}
                x={contextMenu.x}
                y={contextMenu.y}
                onClose={closeContextMenu}
                className="p-1 py-2"
            >
                <div className="w-full h-full flex flex-col gap-1 overflow-y-auto pr-3">
                    <AddTextNode
                        fromEdgeX={contextMenu.fromEdge ? contextMenu.x : undefined}
                        fromEdgeY={contextMenu.fromEdge ? contextMenu.y : undefined}
                        source={connectingNodeId.current ?? undefined}
                        handleId={connectingHandleId.current ?? undefined}
                        closeMenu={closeContextMenu}
                    />
                    <AddBooleanNode
                        fromEdgeX={contextMenu.fromEdge ? contextMenu.x : undefined}
                        fromEdgeY={contextMenu.fromEdge ? contextMenu.y : undefined}
                        source={connectingNodeId.current ?? undefined}
                        handleId={connectingHandleId.current ?? undefined}
                        closeMenu={closeContextMenu}
                    />
                </div>
            </ContextMenu>
        </main>
    );
}
 
export default App;