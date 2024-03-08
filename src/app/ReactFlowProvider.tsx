"use client"

import { ReactNode } from "react";
import { ReactFlowProvider } from "reactflow";

interface ProviderProps {
    children: ReactNode
}

const Provider = ({ children }: ProviderProps) => {
    return (
        <ReactFlowProvider>
            { children }
        </ReactFlowProvider>
    );
}
 
export default Provider;