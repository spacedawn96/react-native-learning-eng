import React, { useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { Text, View } from "./Themed";
import NewsUrl from "../constants/NewsUrl";

import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import HomeScreen from "./base/BaseIcon";
import NotificationsScreen from "./base/Nav";

const Drawer = createDrawerNavigator();

export type PostCardProps = {};

function PostCard(props: PostCardProps) {
  const onPress = useCallback(async (url) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={NewsUrl.url}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress(item.url)}>
            <Text style={styles.card}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default PostCard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#eaeaea",
  },
  card: {
    flex: 1,
    marginTop: 16,
    borderRadius: 2,
    backgroundColor: "#fff",
    color: "#20232a",
    padding: 5,
    fontSize: 30,
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 5,
  },
});
