import { View, Text, Button } from "react-native"
import React from "react"
import { Link, Stack } from "expo-router"

const DayDetailsScreen = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Day2 Onboarding" }} />
      <Text>Day Details Screen</Text>
      <Link href={"/day2/onboarding"} asChild>
        <Button title="Move to ONboarding" />
      </Link>
    </View>
  )
}

export default DayDetailsScreen
