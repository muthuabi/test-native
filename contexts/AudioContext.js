// contexts/AudioContext.js
import React, { createContext, useContext, useState } from "react";
import { useAudioPlayer } from "expo-audio";
import { useData } from "./DataContext";

const AudioContext = createContext();

export default function AudioProvider({ children }) {
  const { tracks } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentTrack = tracks?.[currentIndex] || null;

  // useAudioPlayer hook manages playback and state, reloads on URI change
  const player = useAudioPlayer(currentTrack ? { uri: currentTrack.uri } : null, {
    key: currentTrack?.uri,
  });

  const play = () => player.play();
  const pause = () => player.pause();
  const stop = () => {
    player.seekTo(0);
    player.pause();
  };
  const seekTo = (seconds) => player.seekTo(seconds);
  const unload = () => player.unload();

  const playNext = () => {
    if (tracks?.length)
      setCurrentIndex((currentIndex + 1) % tracks.length);
  };
  const playPrev = () => {
    if (tracks?.length)
      setCurrentIndex((currentIndex - 1 + tracks.length) % tracks.length);
  };

  // Defensive access to player.state properties
  const isPlaying = player.state?.isPlaying ?? false;
  const position = player.state?.positionMillis ?? 0;
  const duration = player.state?.durationMillis ?? 0;

  return (
    <AudioContext.Provider
      value={{
        tracks,
        currentIndex,
        setCurrentIndex,
        loadTrack: setCurrentIndex,
        play,
        pause,
        stop,
        unload,
        seekTo,
        playNext,
        playPrev,
        isLoaded: !!currentTrack,
        isPlaying,
        position,
        duration,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
