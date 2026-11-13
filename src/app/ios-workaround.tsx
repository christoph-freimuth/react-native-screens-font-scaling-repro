import { Stack } from 'expo-router/stack';
import { Alert, Platform, useWindowDimensions } from 'react-native';

import { ReproContent } from '@/components/repro-content';

export default function IosWorkaroundScreen() {
  const { fontScale } = useWindowDimensions();

  return (
    <>
      <ReproContent
        platform="ios"
        configuration={`Workaround: button fontSize is 17 × fontScale = ${(17 * fontScale).toFixed(2)}.`}
      />
      <Stack.Title>Details</Stack.Title>
      {Platform.OS === 'ios' ? (
        <Stack.Toolbar placement="right">
          <Stack.Toolbar.Button
            variant="plain"
            style={{ fontSize: 17 * fontScale }}
            onPress={() => Alert.alert('Done', 'Native header button pressed.')}
          >
            Done
          </Stack.Toolbar.Button>
        </Stack.Toolbar>
      ) : null}
    </>
  );
}
