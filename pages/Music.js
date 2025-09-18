//pages/Music.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Card, Title, Paragraph, IconButton } from "react-native-paper";
import Slider from "@react-native-community/slider";
import { useAudio } from "../contexts/AudioContext";

export default function Music() {
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
    isLoaded,
    seekTo,
  } = useAudio();

  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (currentIndex !== null) loadTrack(currentIndex);
  }, [currentIndex]);

  // Playback status update event listeners can be added for real-time update (not shown here)

  if (!tracks[currentIndex]) return <Text style={styles.noTrack}>No track loaded</Text>;

  const track = tracks[currentIndex];

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        {track.artwork ? (
          <Card.Cover source={{ uri: track.artwork }} style={styles.artwork} />
        ) : (
          <View style={[styles.artwork, styles.noArtwork]}>
            <Text>No Artwork</Text>
          </View>
        )}
        <Card.Content style={{ alignItems: "center" }}>
          <Title>{track.title}</Title>
          <Paragraph>{track.artist}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.controls}>
          <IconButton icon="skip-previous" size={36} onPress={playPrev} />
          {isPlaying ? (
            <IconButton icon="pause-circle" size={48} onPress={pause} />
          ) : (
            <IconButton icon="play-circle" size={48} onPress={play} />
          )}
          <IconButton icon="stop-circle" size={36} onPress={stop} />
          <IconButton icon="skip-next" size={36} onPress={playNext} />
        </Card.Actions>
        <View style={styles.sliderContainer}>
          <Slider
            style={{ width: "100%" }}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor="#6200ee"
            maximumTrackTintColor="#000000"
            onSlidingComplete={(value) => {
              if (isLoaded) {
                seekTo(value);
                setPosition(value);
              }
            }}
          />
          <View style={styles.timeRow}>
            <Text>{formatTime(position)}</Text>
            <Text>{formatTime(duration)}</Text>
          </View>
        </View>
      </Card>
    </View>
  );
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    elevation: 4,
    borderRadius: 12,
  },
  artwork: {
    height: 300,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  noArtwork: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  controls: {
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  sliderContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noTrack: {
    flex: 1,
    textAlign: "center",
    marginTop: 100,
    fontSize: 18,
  },
});
