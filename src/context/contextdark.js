import {createContext, useState} from "react"


const Background = createContext("light")

function BackgroundComponent (props) {
    const [color, setColor] = useState("light")

    
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