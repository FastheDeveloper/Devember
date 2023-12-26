import { Dimensions, Image, StyleSheet, Text, View } from "react-native"
import React from "react"
import { LinearGradient } from "expo-linear-gradient"
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { Gesture, GestureDetector } from "react-native-gesture-handler"

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
const screenWidth = Dimensions.get("screen").width
export const tinderCardWidth = screenWidth * 0.8

type TinderCard = {
  user: {
    image: string
    name: string
  }
  numOfCards: number
  curIndex: number
  activeIndex: SharedValue<number>
}

const TinderCard = ({
  activeIndex,
  user,
  numOfCards,
  curIndex,
}: TinderCard) => {
  const translationX = useSharedValue(0)
  const animatedCard = useAnimatedStyle(() => ({
    opacity: interpolate(
      activeIndex.value,
      [curIndex - 1, curIndex, curIndex + 1],
      [1 - 1 / 5, 1, 1]
    ),
    transform: [
      {
        scale: interpolate(
          activeIndex.value,
          [curIndex - 1, curIndex, curIndex + 1],
          [0.95, 1, 1]
        ),
      },
      {
        translateY: interpolate(
          activeIndex.value,
          [curIndex - 1, curIndex, curIndex + 1],
          [-30, 0, 0]
        ),
      },
      {
        translateX:
          activeIndex.value >= curIndex
            ? interpolate(
                activeIndex.value,
                [curIndex - 1, curIndex, curIndex + 1],
                [0, translationX.value, -screenWidth]
              )
            : 0,
      },
      {
        rotateZ:
          activeIndex.value === curIndex
            ? `${interpolate(
                translationX.value,
                [-screenWidth / 2, 0, screenWidth / 2],
                [-15, 0, 15]
              )}deg`
            : "0deg",
      },
    ],
  }))

  const geture = Gesture.Pan()
    // .enabled(activeIndex.value !== curIndex)
    .onBegin((event) => console.log("OnBegin"))
    .onFinalize((event) => console.log("Finalize"))
    .onChange((event) => {
      translationX.value = event.translationX
    })
    .onStart((event) => console.log("Start"))
    .onEnd((event) => {
      translationX.value = withSpring(0)
      if (Math.abs(event.velocityX) > 400) {
        // translationX.value = withDecay({ velocity: event.velocityX })
        translationX.value = withSpring(
          Math.sign(event.velocityX) * 500,
          {
            velocity: event.velocityX,
          },
          (finshed) => {
            if (finshed) {
              translationX.value = 0
            }
          }
        )
      } else {
        activeIndex.value = withSpring(activeIndex.value + 1)
      }
    })
  return (
    <GestureDetector gesture={geture}>
      <Animated.View
        style={[
          styles.card,
          animatedCard,
          {
            zIndex: numOfCards - curIndex,
          },
        ]}
      >
        <Image
          source={{ uri: user.image }}
          style={[StyleSheet.absoluteFillObject, styles.image]}
        />
        <LinearGradient
          // Button Linear Gradient
          // colors={["transparent", "rgba(0,0,0,0.8"]}
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={[
            StyleSheet.absoluteFillObject,
            {
              top: "50%",
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            },
          ]}
        />
        <View style={styles.footer}>
          <Text style={styles.text}>{user.name}</Text>
        </View>
      </Animated.View>
    </GestureDetector>
  )
}

export default TinderCard

const styles = StyleSheet.create({
  card: {
    width: tinderCardWidth,
    aspectRatio: 1 / 1.67,
    borderRadius: 15,
    justifyContent: "flex-end",
    position: "absolute",
    //shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    //shadow end
  },
  text: {
    color: "white",
    fontSize: 25,
  },
  image: {
    borderRadius: 15,
  },
  footer: {},
})
