import { Alert } from "react-native";

import { useLoginViewModel } from "@/viewmodels/use-login-viewmodel";
import { LoginView } from "@/views/login-view";

export default function Index() {
    const vm = useLoginViewModel({
        onAuthenticated: () => Alert.alert("Unlocked", "Vault opens in Module 6."),
        onCreateAccount: () => Alert.alert("Create Account", "Routed in Module 6."),
        onRestore: () => Alert.alert("Restore Access", "Routed in Module 6."),
    });

    return <LoginView {...vm} />;
}
