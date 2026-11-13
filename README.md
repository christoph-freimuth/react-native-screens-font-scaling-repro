# Native header font-scaling reproduction

Minimal Expo Router app for two `react-native-screens` issues:

- [#5207: Android native-stack header title ignores system font size](https://github.com/software-mansion/react-native-screens/issues/5207)
- [#5208: iOS native header button labels ignore system text size](https://github.com/software-mansion/react-native-screens/issues/5208)

Each issue has separate default and workaround screens. No custom header, navigation theme, font family, or font weight is supplied. The root navigator is an unmodified `<Stack />`.

## Versions

| Package                        | Pinned version   |
| ------------------------------ | ---------------- |
| Expo                           | 58.0.25 (SDK 58) |
| Expo Router                    | 58.0.31          |
| React Native                   | 0.88.1           |
| React                          | 19.3.0           |
| React DOM                      | 19.3.0           |
| react-native-screens           | 4.30.1           |
| react-native-safe-area-context | 5.11.1           |

The project was scaffolded with `pnpm create expo-app --template default@sdk-58` and stripped of its demo screens and unnecessary dependencies. Screens 4.30.1 matches both original reports. The pnpm lockfile fixes the dependency tree. React DOM is pinned to the matching React version for Router's transitive peer dependencies; web is not a target platform.

## Run locally

Requirements:

- Node.js 24.3 or newer within the Node 24 release line (used here: 24.22.3).
- pnpm 11.28.11, as specified in `package.json`.
- Android Studio, the Android SDK, and an emulator or connected Android device for Android.
- macOS, Xcode, and the iOS build prerequisites for iOS. A physical device also needs local signing configured.

```sh
pnpm install --frozen-lockfile

# Build and launch on an Android emulator / connected device.
pnpm android

# Build and launch on an iOS simulator.
pnpm ios

# Alternatively, select a physical device.
pnpm android --device
pnpm ios --device
```

The run commands generate the ignored `android/` or `ios/` directory, build the native app, and start Metro. No EAS account is needed. Use these local native builds rather than Expo Go so the app actually uses the pinned native Screens version.

If Metro is no longer running, use `pnpm start` and reopen the installed debug app. Rebuild the native app after changing any native dependency; restarting Metro alone is not enough.

## Android — #5207

Relevant files:

- `src/app/android-default.tsx`
- `src/app/android-workaround.tsx`

Default:

```tsx
<Stack.Title>Details</Stack.Title>
```

Workaround under test:

```tsx
<Stack.Title style={{ fontSize: 20 }}>Details</Stack.Title>
```

1. Set Android's system **font size** to its default. Keep display size unchanged.
2. Launch the app and open **1. Default native title**.
3. Capture the native header, the reference labels, and the displayed `fontScale`.
4. Go back and open **2. Explicit title fontSize: 20**. Capture the same information.
5. Increase the system font size in Android settings (usually **Display → Display size and text → Font size**).
6. Fully close and relaunch the app, then repeat steps 2–4. Record the device model, Android version, font-size setting, and `fontScale`.

**Expected:** the native title follows the system font-size setting without an explicit font size.

**Originally reported:** the default title stays small while regular app text grows. Explicitly setting `fontSize: 20` changes the behavior. This workaround does not manually multiply by `fontScale`.

Compare each variant with itself across both settings, not only the two variants at a single setting. Android can apply nonlinear font scaling, so the displayed `fontScale` is diagnostic information, not an exact prediction of every rendered font size.

## iOS — #5208

Relevant files:

- `src/app/ios-default.tsx`
- `src/app/ios-workaround.tsx`

Default:

```tsx
<Stack.Toolbar placement="right">
  <Stack.Toolbar.Button variant="plain" onPress={handlePress}>
    Done
  </Stack.Toolbar.Button>
</Stack.Toolbar>
```

`handlePress` above represents the alert callback in the source files. The label is a string, not a custom React Native `Text` component. The workaround adds only this button style:

```tsx
const { fontScale } = useWindowDimensions();
// On Stack.Toolbar.Button:
style={{ fontSize: 17 * fontScale }}
```

1. Set iOS text size to its default in **Settings → Accessibility → Display & Text Size → Larger Text**. Leave **Larger Accessibility Sizes** disabled.
2. Launch the app and open **3. Default native button label**.
3. Capture the right-aligned **Done** header button, the reference labels, and the displayed `fontScale`.
4. Go back and open **4. Button fontSize: 17 × fontScale**. Capture the same information.
5. Move the system text-size slider to its largest standard setting, keeping **Larger Accessibility Sizes** disabled.
6. Fully close and relaunch the app, then repeat steps 2–4. Record the device model, iOS version, text-size setting, and `fontScale`.

**Expected:** the native header button label follows system text size without manual font-size scaling.

**Originally reported:** the default label stays small. The manual `17 * fontScale` override makes it larger. The original report observed `fontScale = 1.353`; record the actual value on the test device rather than assuming it matches.

## Controls and isolation

- Reference labels use ordinary React Native `Text` with `fontSize: 20` and `fontSize: 17` and default font scaling. They do not multiply by `fontScale` or impose a maximum multiplier.
- The shared content displays `useWindowDimensions().fontScale` and the platform version.
- Every variant has its own route. Return to the home screen before opening the next variant; no screen toggles a previously set header font size back to undefined.
- The iOS toolbar is rendered only on iOS. Opening an example on the wrong platform shows a warning.
- Keep orientation, display zoom/size, and all unrelated accessibility settings unchanged between captures.

## Verification status

**Device reproduction has not yet been verified in this clean project.** Expected and originally reported behavior above are not claims about a completed device test.

| Platform | Variant                | Default system text size | Increased system text size |
| -------- | ---------------------- | ------------------------ | -------------------------- |
| Android  | Default title          | Not yet tested           | Not yet tested             |
| Android  | Explicit title size    | Not yet tested           | Not yet tested             |
| iOS      | Default button         | Not yet tested           | Not yet tested             |
| iOS      | Manually scaled button | Not yet tested           | Not yet tested             |

After testing, replace the entries with observed results and add screenshots or recordings, the device/OS details, and `fontScale` values. If an issue does not reproduce, document that result rather than presenting the original observation as confirmed.

## Development checks

```sh
pnpm typecheck
pnpm check:dependencies
pnpm peers check
pnpm dlx expo-doctor@latest

# Verify JavaScript bundling for both native platforms (not a native build).
pnpm exec expo export --platform all --output-dir dist

# Inspect the installed package versions.
pnpm list expo expo-router react react-native react-native-screens --depth 0
```

These checks do not establish native font-scaling behavior. That requires the manual device or simulator comparison above.
