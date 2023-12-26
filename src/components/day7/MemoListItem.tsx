import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { FontAwesome5 } from "@expo/vector-icons"
const MemoListItem = ({ uri }: { uri: string }) => {
  const progress = 20

  return (
    <View style={styles.container}>
      <FontAwesome5 name={"play"} size={20} color={"gray"} />
      <View style={styles.playBackContainer}>
        <View style={styles.playbackGround} />
        <View style={[styles.playbackINdicator, { left: `${progress}%` }]} />
      </View>
    </View>
  )
}

export default MemoListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    gap: 15,
    //Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  playBackContainer: {
    flex: 1,
    height: 30,
    justifyContent: "center",
  },
  playbackGround: {
    height: 3,
    backgroundColor: "gainsboro",
    borderRadius: 5,
  },
  playbackINdicator: {
    width: 15,
    aspectRatio: 1,
    backgroundColor: "royalblue",
    borderRadius: 10,
    position: "absolute",
  },
})
