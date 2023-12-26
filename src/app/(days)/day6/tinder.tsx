import { Image, StyleSheet, Text, View } from "react-native"
import React from "react"
import TinderCard from "../../../components/TinderCard"
import { Stack } from "expo-router"
import {
  interpolate,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withSpring,
} from "react-native-reanimated"
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from "react-native-gesture-handler"

Gesture
const dummuUsers = [
  {
    id: 1,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg",
    name: "Dani",
  },
  {
    id: 2,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/2.jpg",
    name: "Jon",
  },
  {
    id: 3,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/3.jpg",
    name: "Dani",
  },
  {
    id: 4,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/4.jpeg",
    name: "Alice",
  },
  {
    id: 5,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/5.jpg",
    name: "Dani",
  },
  {
    id: 6,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/6.jpg",
    name: "Kelsey",
  },
]

const tinder = () => {
  const activeIndex = useSharedValue(0)

  //   useDerivedValue(() => {
  //     activeIndex.value = interpolate(
  //       Math.abs(translationX.value),
  //       [0, 500],
  //       [0, activeIndex.value + 1]
  //     )
  //   })

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen options={{ headerShown: false }} />
      {dummuUsers.map((user, index) => (
        <TinderCard
          key={user.id}
          user={user}
          numOfCards={dummuUsers.length}
          curIndex={index}
          activeIndex={activeIndex}
        />
      ))}
    </View>
  )
}

export default tinder
