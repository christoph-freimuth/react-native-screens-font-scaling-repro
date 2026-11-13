import { Stack } from 'expo-router/stack';
import { Alert, Platform } from 'react-native';

import { ReproContent } from '@/components/repro-content';

export default function IosDefaultScreen() {
  return (
    <>
      <ReproContent
        platform="ios"
        configuration='Default button: a string label with variant="plain" and no label style.'
      />
      <Stack.Title>Details</Stack.Title>
      {Platform.OS === 'ios' ? (
        <Stack.Toolbar placement="right">
          <Stack.Toolbar.Button
            variant="plain"
            onPress={() => Alert.alert('Done', 'Native header button pressed.')}
          >
            Done
          </Stack.Toolbar.Button>
        </Stack.Toolbar>
      ) : null}
    </>
  );
}
