import React from "react";
import {Spinner} from "@heroui/react";

const CustomSpinner: React.FC = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <Spinner size={'lg'} color={'primary'}/>
        </div>
    )
}

export default CustomSpinner;