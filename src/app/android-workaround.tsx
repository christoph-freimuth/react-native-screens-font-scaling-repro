import { Stack } from 'expo-router/stack';

import { ReproContent } from '@/components/repro-content';

export default function AndroidWorkaroundScreen() {
  return (
    <>
      <ReproContent
        platform="android"
        configuration="Workaround: title fontSize is explicitly set to 20, without multiplying by fontScale."
      />
      <Stack.Title style={{ fontSize: 20 }}>Details</Stack.Title>
    </>
  );
}
