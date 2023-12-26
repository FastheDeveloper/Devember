import { StyleSheet, Text, View, ScrollView } from "react-native"
import React, { PropsWithChildren } from "react"
import Markdown from "react-native-markdown-display"

const markDownStyles = {
  heading1: {
    color: "red",
  },
}
const MarkdownDisplay = ({ children }: PropsWithChildren) => {
  return (
    <ScrollView style={styles.page} contentInsetAdjustmentBehavior="automatic">
      <Markdown style={markDownStyles}>{children}</Markdown>
    </ScrollView>
  )
}

export default MarkdownDisplay

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
})
