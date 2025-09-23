// pages/Music.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Title, Paragraph, IconButton, useTheme } from "react-native-paper";
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
    position: playbackPosition,
    duration: playbackDuration,
    seekTo,
  } = useAudio();

  const theme = useTheme();

  // Local slider state
  const [sliderValue, setSliderValue] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  // Convert ms → seconds
  const msToSec = (ms) => (ms ? ms / 1000 : 0);
  const sliderMax = msToSec(playbackDuration) || 1;
  const sliderPos = isSliding ? sliderValue : msToSec(playbackPosition);

  // Update slider while not sliding
  useEffect(() => {
    if (!isSliding) {
      setSliderValue(sliderPos);
    }
  }, [sliderPos, isSliding]);

  // Keep slider synced with playback
  useEffect(() => {
    if (!isLoaded) return;
    const interval = setInterval(() => {
      if (!isSliding) {
        setSliderValue(msToSec(playbackPosition));
      }
    }, 200); // update every 200ms
    return () => clearInterval(interval);
  }, [playbackPosition, isSliding, isLoaded]);

  // Load current track on mount or index change
  useEffect(() => {
    if (currentIndex !== null) loadTrack(currentIndex);
  }, [currentIndex]);

  if (!tracks?.[currentIndex])
    return <Text style={styles.noTrack}>No track loaded</Text>;

  const track = tracks[currentIndex];

  const displayTime = (ms) => {
    if (!ms) return "0:00";
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <View style={styles.container}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        {track.artwork ? (
          <Card.Cover source={{ uri: track.artwork }} style={styles.artwork} />
        ) : (
          <View style={[styles.artwork, styles.noArtwork]}>
            <Text>No Artwork</Text>
          </View>
        )}

        <Card.Content style={{ alignItems: "center", marginTop: 12 }}>
          <Title>{track.title}</Title>
          <Paragraph>{track.artist}</Paragraph>
        </Card.Content>

        {/* <View style={styles.sliderWrapper}>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={sliderMax}
            value={sliderValue}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.backdrop}
            thumbTintColor={theme.colors.primary}
            onValueChange={(value) => {
              setSliderValue(value);
              setIsSliding(true);
            }}
            onSlidingComplete={(value) => {
              seekTo(value * 1000); // convert back to ms
              setIsSliding(false);
            }}
            disabled={!isLoaded || sliderMax === 0}
          />
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{displayTime(sliderValue * 1000)}</Text>
            <Text style={styles.timeText}>{displayTime(sliderMax * 1000)}</Text>
          </View>
        </View> */}

        <Card.Actions style={styles.controls}>
          <IconButton
            icon="skip-previous"
            size={40}
            onPress={playPrev}
            color={theme.colors.primary}
          />
          {isPlaying ? (
            <IconButton
              icon="pause-circle"
              size={60}
              onPress={pause}
              color={theme.colors.primary}
            />
          ) : (
            <IconButton
              icon="play-circle"
              size={60}
              onPress={play}
              color={theme.colors.primary}
            />
          )}
          <IconButton
            icon="stop-circle"
            size={40}
            onPress={stop}
            color={theme.colors.primary}
          />
          <IconButton
            icon="skip-next"
            size={40}
            onPress={playNext}
            color={theme.colors.primary}
          />
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    borderRadius: 12,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  artwork: {
    height: 320,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  noArtwork: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bbb",
  },
  controls: {
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  sliderWrapper: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  timeText: {
    fontSize: 12,
    fontFamily: "monospace",
    color: "#666",
  },
  noTrack: {
    flex: 1,
    textAlign: "center",
    marginTop: 100,
    fontSize: 18,
    color: "#888",
  },
});
