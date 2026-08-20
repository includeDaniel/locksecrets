import { useRouter } from "expo-router";

import { useSession } from "@/hooks/use-session";
import type { Secret } from "@/models/secret";
import type { VaultViewModel } from "@/viewmodels/vault-viewmodel";
import { VaultView } from "@/views/vault-view";

const SAMPLE_SECRETS: Secret[] = [
    {
        id: "1",
        name: "Wi-Fi — home",
        value: "correct-horse-battery",
        updatedAt: new Date(2026, 7, 18).getTime(),
    },
    {
        id: "2",
        name: "Recovery codes",
        value: "8241 5530 9917",
        updatedAt: new Date(2026, 6, 2).getTime(),
    },
    {
        id: "3",
        name: "Passport number",
        value: "FX8842091",
        updatedAt: new Date(2026, 4, 27).getTime(),
    },
];

const noop = () => {};

export default function HomeScreen() {
    const router = useRouter();
    const { signOut } = useSession();

    const vm: VaultViewModel = {
        secrets: SAMPLE_SECRETS,
        isLoading: false,
        error: null,
        revealedId: null,
        copiedId: null,
        pendingDeleteId: null,
        toggleReveal: noop,
        copy: noop,
        requestDelete: noop,
        confirmDelete: noop,
        cancelDelete: noop,
        goToNewSecret: () => router.push("/new-secret"),
        lock: signOut,
    };

    return <VaultView {...vm} />;
}
