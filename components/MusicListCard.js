import React from "react";
import { List } from "react-native-paper";

export default function MusicListCard({ item, onPress }) {
  return (
    <List.Item
      title={item.title}
      description={item.artist}
      onPress={onPress}
      left={(props) => <List.Icon {...props} icon="music" />}
    />
  );
}
