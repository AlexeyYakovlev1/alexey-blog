import React from "react";

const LoadContext = React.createContext({
    load: false,
    setLoad: (value: boolean | ((active: boolean) => boolean)) => {
        return;
    }
});

export default LoadContext;