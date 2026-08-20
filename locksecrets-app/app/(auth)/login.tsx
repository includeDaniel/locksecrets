import { useRouter } from "expo-router";

import { useSession } from "@/hooks/use-session";
import { useLoginViewModel } from "@/viewmodels/use-login-viewmodel";
import { LoginView } from "@/views/login-view";

export default function LoginScreen() {
    const router = useRouter();
    const { signIn } = useSession();

    const vm = useLoginViewModel({
        onAuthenticated: signIn,
        onCreateAccount: () => router.push("/create-account"),
        onRestore: () => router.push("/restore"),
    });

    return <LoginView {...vm} />;
}
