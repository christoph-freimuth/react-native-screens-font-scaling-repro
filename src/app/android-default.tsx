import { Stack } from 'expo-router/stack';

import { ReproContent } from '@/components/repro-content';

export default function AndroidDefaultScreen() {
  return (
    <>
      <ReproContent
        platform="android"
        configuration="Default title: no font size, font family, or font weight override."
      />
      <Stack.Title>Details</Stack.Title>
    </>
  );
}
