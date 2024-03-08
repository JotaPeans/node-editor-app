import { blue, teal, zinc } from "tailwindcss/colors";

export type handlerNodeType = "text" | "boolean" | "any";

export type ColorsProps = {
    [key in handlerNodeType]: {
        bg: string;
        border: string;
        color: string
    };
};

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

export default colors;