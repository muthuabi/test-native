import { createContext, useContext, useRef, useState } from "react";
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
    if (isLoaded) {
      await playerRef.current.unloadAsync();
      setIsLoaded(false);
      setIsPlaying(false);
    }
    await playerRef.current.loadAsync(tracks[index].uri);
    setCurrentIndex(index);
    setIsLoaded(true);
  };

  const play = async () => {
    if (isLoaded) {
      await playerRef.current.playAsync();
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
    if (tracks.length && currentIndex !== null && currentIndex < tracks.length - 1) {
      loadTrack(currentIndex + 1);
    }
  };

  const playPrev = () => {
    if (tracks.length && currentIndex !== null && currentIndex > 0) {
      loadTrack(currentIndex - 1);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        tracks,
        currentIndex,
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
