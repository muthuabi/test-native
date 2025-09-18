import React, { useEffect } from "react";
import { View, Button, Text, StyleSheet, Image } from "react-native";
import { useAudio } from "../contexts/AudioContext";

export default function Music({ route }) {
  const { index } = route.params;
  const {
    tracks,
    currentIndex,
    loadTrack,
    play,
    pause,
    stop,
    playNext,
    playPrev,
    isPlaying,
  } = useAudio();

  useEffect(() => {
    loadTrack(index);
  }, [index]);

  if (!tracks[currentIndex]) return <Text>No track loaded</Text>;

  const track = tracks[currentIndex];

  return (
    <View style={styles.container}>
      {track.artwork && (
        <Image source={{ uri: track.artwork }} style={styles.artwork} />
      )}
      <Text style={styles.title}>{track.title}</Text>
      <Text style={styles.artist}>{track.artist}</Text>
      <View style={styles.controls}>
        <Button title="Prev" onPress={playPrev} />
        <Button title={isPlaying ? "Pause" : "Play"} onPress={isPlaying ? pause : play} />
        <Button title="Stop" onPress={stop} />
        <Button title="Next" onPress={playNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  artwork: { width: 250, height: 250, marginBottom: 20, borderRadius: 6 },
  title: { fontSize: 22, fontWeight: "bold" },
  artist: { fontSize: 18, color: "#666", marginBottom: 20 },
  controls: { flexDirection: "row", justifyContent: "space-around", width: "80%" },
});
