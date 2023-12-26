import { View, Text, Button } from "react-native"
import React from "react"
import { Link, Stack } from "expo-router"
import MarkdownDisplay from "../../../components/MarkDownDisplay"
import { SafeAreaView } from "react-native-safe-area-context"

const copy = `# 🎉VOice Memo 
Work with the microphone and audio playbock
`

const DayDetailsScreen = () => {
  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ backgroundColor: "red", flex: 1 }}
    >
      <Stack.Screen options={{ title: "Day7: Voice Memo" }} />
      <MarkdownDisplay>{copy}</MarkdownDisplay>
      <Link href={"/day7/memos"} asChild>
        <Button title="Go to tinder" />
      </Link>
    </SafeAreaView>
  )
}

export default DayDetailsScreen
