import { Text, View } from "react-native";

export default function Index() {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text
                style={{
                    fontFamily: "DMMono_500Medium",
                    color: "#00e676",
                    fontSize: 24,
                }}
            >
                LockSecrets
            </Text>
        </View>
    );
}
