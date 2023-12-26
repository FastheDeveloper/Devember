import { View, Text, Button } from "react-native"
import React from "react"
import { Link, Stack } from "expo-router"
import MarkdownDisplay from "../../../components/MarkDownDisplay"
import { SafeAreaView } from "react-native-safe-area-context"

const copy = `# 🎉 Fun with Markdown!

## 🚀 Introduction
Welcome to this **fun and exciting** markdown guide! Let's dive into the world of Markdown and discover how it makes text formatting cool and easy!

## 🎈 Welcome please continue below
`

const DayDetailsScreen = () => {
  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ backgroundColor: "red", flex: 1 }}
    >
      <Stack.Screen options={{ title: "Day3: Markdown" }} />
      <MarkdownDisplay>{copy}</MarkdownDisplay>
      <Link href={"/day3/editor"} asChild>
        <Button title="Go to editor" />
      </Link>
    </SafeAreaView>
  )
}

export default DayDetailsScreen
