import type { ReactNode } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ReproContentProps {
  platform: 'android' | 'ios' | 'all';
  configuration: string;
  children?: ReactNode;
}

/** Renders automatically scaled reference labels and diagnostics without altering native headers. */
export function ReproContent({
  platform,
  configuration,
  children,
}: ReproContentProps) {
  const { fontScale } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        styles.content,
        {
          paddingBottom: 24 + insets.bottom,
          paddingLeft: 24 + insets.left,
          paddingRight: 24 + insets.right,
        },
      ]}
    >
      <Text selectable style={styles.text}>
        Platform: {Platform.OS} {Platform.Version}
        {'\n'}System fontScale: {fontScale.toFixed(3)}
      </Text>
      {platform !== 'all' && Platform.OS !== platform ? (
        <Text style={styles.warning}>
          This example targets {platform === 'ios' ? 'iOS' : 'Android'}. Open it on
          that platform to test the reported issue.
        </Text>
      ) : null}
      <Text style={styles.text}>{configuration}</Text>
      <Text style={styles.reference}>
        Details — regular React Native Text (20)
      </Text>
      <Text style={styles.buttonReference}>
        Done — regular React Native Text (17)
      </Text>
      <Text style={styles.text}>
        These reference labels use normal React Native font scaling. No manual
        fontScale multiplier or maximum font-size multiplier is applied.
      </Text>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { gap: 16, paddingTop: 24 },
  text: { fontSize: 16 },
  reference: { fontSize: 20 },
  buttonReference: { fontSize: 17 },
  warning: { color: '#a12600', fontSize: 16, fontWeight: '600' },
});
