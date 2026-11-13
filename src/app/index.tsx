import { Link } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { StyleSheet, Text } from 'react-native';

import { ReproContent } from '@/components/repro-content';

export default function HomeScreen() {
  return (
    <>
      <ReproContent
        platform="all"
        configuration="Open a default screen and its workaround on the matching platform."
      >
        <Text style={styles.heading}>Android — issue #5207</Text>
        <Link href="/android-default" style={styles.link}>
          1. Default native title
        </Link>
        <Link href="/android-workaround" style={styles.link}>
          2. Explicit title fontSize: 20
        </Link>
        <Text style={styles.heading}>iOS — issue #5208</Text>
        <Link href="/ios-default" style={styles.link}>
          3. Default native button label
        </Link>
        <Link href="/ios-workaround" style={styles.link}>
          4. Button fontSize: 17 × fontScale
        </Link>
        <Text style={styles.instructions}>
          Compare both screens at the default and an increased system text size.
          Fully close and reopen the app after each settings change. Return here
          using the back button before opening the other example.
        </Text>
      </ReproContent>
      <Stack.Title>Font scaling repro</Stack.Title>
    </>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 20, fontWeight: '600' },
  link: { color: '#0057b8', fontSize: 18, paddingVertical: 10 },
  instructions: { fontSize: 16 },
});
