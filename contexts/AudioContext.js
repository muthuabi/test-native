//contexts/AudioContext.js
import { createContext, useContext, useRef, useState,useEffect } from "react";
import { createAudioPlayer } from "expo-audio";
import { useData } from "./DataContext";

const AudioContext = createContext();

export default function AudioProvider({ children }) {
  const { tracks } = useData();
  const playerRef = useRef(createAudioPlayer());
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const loadTrack = async (index) => {
    if (!tracks[index]) return;
    console.log("Loading track",index,tracks[index].uri)
    if (isLoaded) {
      await playerRef.current.unloadAsync();
      setIsLoaded(false);
      setIsPlaying(false);
    }
    console.log("Unloaded previous track if any");
    // Wrap URI as object for loadAsync
    await playerRef.current.loadAsync({ uri: tracks[index].uri });
    console.log("Track loaded");
    setCurrentIndex(index);
    setIsLoaded(true);
  };

  const play = async () => {
    console.log("Try to play",isLoaded)
    if (isLoaded) {
      await playerRef.current.playAsync();
      console.log("Playing");
      setIsPlaying(true);
    }
  };

  const pause = async () => {
    if (isLoaded) {
      await playerRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const stop = async () => {
    if (isLoaded) {
      await playerRef.current.stopAsync();
      setIsPlaying(false);
    }
  };

  const seekTo = async (seconds) => {
    if (isLoaded) {
      await playerRef.current.seekTo(seconds);
    }
  };

  const unload = async () => {
    if (isLoaded) {
      await playerRef.current.unloadAsync();
      setCurrentIndex(null);
      setIsLoaded(false);
      setIsPlaying(false);
    }
  };

  const playNext = () => {
    if (tracks.length) {
      const nextIndex = (currentIndex + 1) % tracks.length;
      loadTrack(nextIndex);
    }
  };
  
  const playPrev = () => {
    if (tracks.length) {
      const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
      loadTrack(prevIndex);
    }
  };  

  // const playNext = () => {
  //   if (tracks.length && currentIndex !== null && currentIndex < tracks.length - 1) {
  //     loadTrack(currentIndex + 1);
  //   }
  // };

  // const playPrev = () => {
  //   if (tracks.length && currentIndex !== null && currentIndex > 0) {
  //     loadTrack(currentIndex - 1);
  //   }
  // };
  useEffect(() => {
    loadTrack(0);
    return () => {
      // Cleanup on unmount
      if (isLoaded) {
        playerRef.current.unloadAsync();
      }
    };
  }, []);
  return (
    <AudioContext.Provider
      value={{
        tracks,
        currentIndex,
        setCurrentIndex,
        loadTrack,
        play,
        pause,
        stop,
        unload,
        seekTo,
        playNext,
        playPrev,
        isLoaded,
        isPlaying,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
