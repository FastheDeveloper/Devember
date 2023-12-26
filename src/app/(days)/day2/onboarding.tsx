import { Stack, router } from "expo-router"
import React, { useState } from "react"
import { Text, View, StyleSheet, SafeAreaView, Pressable } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar"
import {
  GestureDetector,
  Gesture,
  Directions,
} from "react-native-gesture-handler"
import Animated, {
  FadeIn,
  FadeOut,
  BounceInRight,
  BounceOutLeft,
  SlideInLeft,
  SlideOutRight,
  FadeInLeft,
  FadeOutRight,
} from "react-native-reanimated"

const onboardingSteps = [
  {
    icon: "people-arrows",
    title: "Track every transaction",
    description:
      "  Monitor your spending and contribution, ensuring every penny aligns with your family's aspirations",
  },
  {
    icon: "snowflake",
    title: "Make easy fund transfers",
    description: " Move your money around with ease only available here",
  },
  {
    icon: "people-arrows",
    title: "Create fund raising account",
    description:
      " Create a fundraiser of your choice and manage it from the comfort of one application",
  },
]
export default function Onboarding() {
  const [step, setStep] = useState(0)
  const data = onboardingSteps[step]

  const onContinue = () => {
    const isLastScreen = step === onboardingSteps.length - 1
    if (isLastScreen) {
      endOnboarding()
    } else {
      setStep(step + 1)
    }
  }

  const onReverse = () => {
    const isFirstScreen = step === 0
    if (isFirstScreen) {
      endOnboarding()
    } else {
      setStep(step - 1)
    }
  }

  // const frontSwipe = Gesture.Fling()
  //   .direction(Directions.LEFT)
  //   .onEnd(onContinue)

  // const backSwipe = Gesture.Fling().direction(Directions.RIGHT).onEnd(onReverse)

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onReverse),
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue)
  )
  const endOnboarding = () => {
    setStep(0)
    router.back()
  }
  return (
    <SafeAreaView style={styles.page}>
      <StatusBar style="light" />
      <View style={styles.pageContent}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.stepContainer}>
          {onboardingSteps.map((dat, index) => (
            <View
              key={index}
              style={[
                styles.stepIndicator,
                { backgroundColor: index === step ? "#cef202" : "grey" },
              ]}
            />
          ))}
        </View>
        <GestureDetector gesture={swipes}>
          <View
            // entering={BounceInRight}
            // exiting={FadeOut}
            style={{ flex: 1 }}
            key={step}
          >
            <Animated.View entering={FadeIn}>
              <FontAwesome5
                style={styles.image}
                name={data.icon}
                size={100}
                color="#cef202"
              />
            </Animated.View>
            <View style={styles.footer}>
              <Animated.Text entering={SlideInLeft} style={styles.title}>
                {data.title}
              </Animated.Text>
              <Animated.Text
                entering={FadeInLeft.delay(300)}
                style={styles.desc}
              >
                {data.description}
              </Animated.Text>

              <View style={styles.buttonRow}>
                <Text onPress={endOnboarding} style={styles.buttonText}>
                  Skip
                </Text>
                <Pressable style={styles.button} onPress={onContinue}>
                  <Text style={styles.buttonText}> Continue</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </GestureDetector>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#15141A",
  },
  pageContent: {
    padding: 20,
    flex: 1,
  },
  image: {
    alignSelf: "center",
    margin: 20,
    marginTop: 30,
  },
  title: {
    color: "#FDFDFD",
    fontSize: 50,
    fontWeight: "700",
    fontFamily: "InterSemi",
    letterSpacing: 1.3,
    marginVertical: 10,
  },
  desc: {
    color: "gray",
    fontSize: 18,
    fontFamily: "InterRegular",
    lineHeight: 28,
  },
  footer: {
    marginTop: "auto",
  },
  buttonRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  button: {
    backgroundColor: "#302e38",
    borderRadius: 50,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    color: "#FDFDFD",
    fontFamily: "InterSemi",
    fontSize: 16,
    padding: 15,
    paddingHorizontal: 25,
  },
  stepIndicator: {
    flex: 1,
    height: 3,
    backgroundColor: "gray",

    borderRadius: 10,
  },
  stepContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 15,
  },
})
