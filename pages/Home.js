import React from "react";
import { FlatList } from "react-native";
import { useData } from "../contexts/DataContext";
import MusicListCard from "../components/MusicListCard";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const { tracks } = useData();
  const navigation = useNavigation();

  return (
    <FlatList
      data={tracks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <MusicListCard
          item={item}
          onPress={() => navigation.navigate("Music", { index })}
        />
      )}
    />
  );
}
