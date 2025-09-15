import { createContext,useContext,useRef,useState,useEffect, Children } from "react";
import { createAudioPlayer } from "expo-audio";

const AudioContext=createContext();
const AudioProvider=({children})=>{
    const audioPlayer=useRef(createAudioPlayer());

    return (
        <AudioContext.Provider>
            {Children}
        </AudioContext.Provider>
    )

};
export default AudioProvider;
export const useAudio=()=>useContext(AudioContext);