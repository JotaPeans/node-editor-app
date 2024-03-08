import { TextCursorInput, ToggleRight } from "lucide-react"

const addNodeParams = {
    "boolean": {
        background: `linear-gradient(to right, rgb(59 130 246 / 0.1) 0%, rgb(26 32 44 / 0.1) 100%)`,
        icon: <ToggleRight size={20}/>
    },
    "text": {
        background: `linear-gradient(to right, rgb(20 184 166 / 0.1) 0%, rgb(26 32 44 / 0.1) 100%)`,
        icon: <TextCursorInput size={20}/>
    }
}

export default addNodeParams;