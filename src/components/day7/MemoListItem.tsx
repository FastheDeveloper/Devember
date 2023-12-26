import { StyleSheet, Text, View } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { FontAwesome5 } from "@expo/vector-icons"
import { AVPlaybackStatus, Audio } from "expo-av"
import { Sound } from "expo-av/build/Audio"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"
const MemoListItem = ({ uri }: { uri: string }) => {
  const [sound, setSound] = useState<Sound>()
  const [status, setStatus] = useState<AVPlaybackStatus>()
  async function loadSound() {
    console.log("Loading Sound")
    const { sound } = await Audio.Sound.createAsync(
      { uri: uri },
      { progressUpdateIntervalMillis: 1000 / 60 },
      //   undefined,
      onPlaybackStatusUpdate
    )
    setSound(sound)
  }

  const onPlaybackStatusUpdate = useCallback(
    async (newStatus: AVPlaybackStatus) => {
      setStatus(newStatus)
      if (!newStatus.isLoaded || !sound) {
        return
      }
      if (newStatus.didJustFinish) {
        console.warn("SHould resatart")
        await sound?.setPositionAsync(0)
        //   sound?.replayAsync()
      }
    },
    [sound]
  )
  useEffect(() => {
    loadSound()
  }, [uri])

  async function playSound() {
    if (!sound) {
      return
    }

    if (status?.isLoaded && status.isPlaying) {
      await sound.pauseAsync()
    } else if (
      status?.isLoaded &&
      status.positionMillis === status.durationMillis
    ) {
      await sound.replayAsync()
    } else {
      await sound.playAsync()
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound")
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  const isPlaying = status?.isLoaded ? status.isPlaying : false
  const position = status?.isLoaded ? status.positionMillis : 0
  const duration = status?.isLoaded ? status.durationMillis : 1

  const progress = duration && position / duration

  const animatedIdicator = useAnimatedStyle(() => ({
    left: progress && `${progress * 100}%`,
  }))
  const formatMillis = (millisecond: number) => {
    const minutes = Math.floor(millisecond / (1000 * 60))
    const seconds = Math.floor((millisecond % (1000 * 60)) / 1000)

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <View style={styles.container}>
      <FontAwesome5
        onPress={playSound}
        name={isPlaying ? "pause" : "play"}
        size={20}
        color={"gray"}
      />
      <View style={styles.playBackContainer}>
        <View style={styles.playbackGround} />
        <Animated.View style={[styles.playbackINdicator, animatedIdicator]} />
        <Text
          style={{ position: "absolute", right: 0, bottom: 0, color: "gray" }}
        >
          {formatMillis(position || 0)}/{formatMillis(duration || 0)}
        </Text>
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
    paddingHorizontal: 15,
    borderRadius: 10,
    gap: 15,
    paddingVertical: 5,

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
    height: 50,
    justifyContent: "center",
  },
  playbackGround: {
    height: 3,
    backgroundColor: "gainsboro",
    borderRadius: 5,
  },
  playbackINdicator: {
    width: 10,
    aspectRatio: 1,
    backgroundColor: "royalblue",
    borderRadius: 10,
    position: "absolute",
  },
})
