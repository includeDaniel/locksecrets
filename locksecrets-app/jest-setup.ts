// useSafeAreaInsets reads a native module that does not exist under Jest.
// The library ships a mock that serves zeroed insets; it is a default export.
jest.mock(
    "react-native-safe-area-context",
    () => require("react-native-safe-area-context/jest/mock").default,
);
