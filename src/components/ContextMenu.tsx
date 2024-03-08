"use client"

import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/utils/functions";

interface ContextMenuProps {
    show: boolean
    x: number
    y: number
    onClose: () => void
    className?: string
    children?: ReactNode
}

const ContextMenu = ({ show, x, y, onClose, className, children }: ContextMenuProps) => {
    const [ xPx, setXPx ] = useState(x);
    const [ yPy, setYPy ] = useState(y);

    useEffect(() => {
        if(window.innerWidth - (x + 240) < 0) setXPx(x - 240);
        else setXPx(x);

        if(window.innerHeight - (y + 288) < 0) setYPy(y - 288);
        else setYPy(y);
    }, [x, y, show]);
    
    const style = {
        top: `${yPy}px`,
        left: `${xPx}px`
    };

    return (
        <>
            { show && <div className="absolute w-full h-screen left-0 top-0 z-40" onClick={onClose}></div> }
            <div 
                style={style} 
                data-show={show}
                className={cn("absolute w-60 h-72 opacity-0 data-[show=true]:opacity-100 data-[show=false]:pointer-events-none bg-primary backdrop-blur-sm border border-secondary-light rounded-lg transition-opacity p-2 text-zinc-100 flex flex-col z-50 shadow-xl", className)}
            >                
                { children }
            </div>
        </>
    );
}
 
export default ContextMenu;