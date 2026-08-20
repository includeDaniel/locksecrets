import type { Secret } from "@/models/secret";

export type VaultError = "load-failed" | "copy-failed" | "delete-failed";

export type VaultViewModel = {
    secrets: Secret[];
    isLoading: boolean;
    error: VaultError | null;
    revealedId: string | null;
    copiedId: string | null;
    pendingDeleteId: string | null;
    toggleReveal: (id: string) => void;
    copy: (id: string) => void;
    requestDelete: (id: string) => void;
    confirmDelete: () => void;
    cancelDelete: () => void;
    goToNewSecret: () => void;
    lock: () => void;
};
