import { blue, teal, zinc } from "tailwindcss/colors";

export type handlerNodeType = "text" | "boolean" | "any";

export type ColorsProps = {
    [key in handlerNodeType]: {
        color: string
        buttonStyle: {
            color: string,
            backgroundColor: string,
            backgroundColorHover: string
        }
    };
};

const colors: ColorsProps = {
    text: {
        color: teal[500],
        buttonStyle: {
            color: "white",
            backgroundColor: teal[500],
            backgroundColorHover: teal[600]
        }
    },
    boolean: {
        color: blue[500],
        buttonStyle: {
            color: "white",
            backgroundColor: blue[500],
            backgroundColorHover: blue[600]
        }
    },
    any: {
        color: zinc[400],
        buttonStyle: {
            color: zinc[900],
            backgroundColor: zinc[400],
            backgroundColorHover: zinc[500]
        }
    }
}

export default colors;