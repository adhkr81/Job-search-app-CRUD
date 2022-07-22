import {createContext, useState} from "react"


const Background = createContext("dark")

function BackgroundComponent (props) {
    const [color, setColor] = useState("dark")

    
    const toggleBackground = () => {
    if (color === "dark") {
        setColor("light")
    } else {
        setColor("dark")
    }};

    return (
    <Background.Provider value={{color, toggleBackground}}>
        {props.children}
    </Background.Provider>
    )
}


export {Background, BackgroundComponent}