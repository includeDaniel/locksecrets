import Feather from "@expo/vector-icons/Feather";
import {
    ActivityIndicator,
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { AppButton } from "@/components/app-button";
import { AppScreen } from "@/components/app-screen";
import { colors, radii, sizes, spacing, typography } from "@/constants/tokens";
import type { Secret } from "@/models/secret";
import type { VaultError, VaultViewModel } from "@/viewmodels/vault-viewmodel";
import { SecretCard } from "@/views/secret-card";

const ERROR_MESSAGES: Record<VaultError, string> = {
    "load-failed": "Your vault could not be opened.",
    "copy-failed": "That secret could not be copied.",
    "delete-failed": "That secret could not be deleted.",
};

function countLabel(count: number): string {
    return count === 1 ? "1 secret stored" : `${count} secrets stored`;
}

export function VaultView(vm: VaultViewModel) {
    const pendingDelete: Secret | undefined = vm.secrets.find(
        (secret) => secret.id === vm.pendingDeleteId,
    );

    return (
        <AppScreen>
            <View style={styles.header}>
                <View style={styles.headerText}>
                    <Text style={styles.title}>Your vault</Text>
                    <Text style={styles.subtitle}>
                        {countLabel(vm.secrets.length)}
                    </Text>
                </View>

                <Pressable
                    onPress={vm.lock}
                    hitSlop={12}
                    accessibilityRole="button"
                    accessibilityLabel="Lock vault"
                >
                    <Feather
                        name="lock"
                        size={sizes.iconLogo}
                        color={colors.textSecondary}
                    />
                </Pressable>
            </View>

            {vm.error === null ? null : (
                <Text style={styles.error} accessibilityLiveRegion="polite">
                    {ERROR_MESSAGES[vm.error]}
                </Text>
            )}

            {vm.isLoading ? (
                <View style={styles.centered}>
                    <ActivityIndicator color={colors.accent} />
                </View>
            ) : (
                <FlatList
                    data={vm.secrets}
                    keyExtractor={(secret) => secret.id}
                    renderItem={({ item }) => (
                        <SecretCard
                            secret={item}
                            isRevealed={vm.revealedId === item.id}
                            onToggleReveal={() => vm.toggleReveal(item.id)}
                            onCopy={() => vm.copy(item.id)}
                            onDelete={() => vm.requestDelete(item.id)}
                        />
                    )}
                    contentContainerStyle={[
                        styles.listContent,
                        vm.secrets.length === 0 && styles.listContentEmpty,
                    ]}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.centered}>
                            <Feather
                                name="shield"
                                size={sizes.iconLogo}
                                color={colors.textMuted}
                            />
                            <Text style={styles.emptyTitle}>
                                Nothing locked away yet
                            </Text>
                            <Text style={styles.caption}>
                                Tap + to store your first secret.
                            </Text>
                        </View>
                    }
                />
            )}

            {vm.copiedId === null ? null : (
                <View style={styles.toast} accessibilityLiveRegion="polite">
                    <View style={styles.toastInner}>
                        <Feather
                            name="copy"
                            size={sizes.iconFooter}
                            color={colors.accent}
                        />
                        <Text style={styles.caption}>Copied to clipboard</Text>
                    </View>
                </View>
            )}

            <Pressable
                onPress={vm.goToNewSecret}
                accessibilityRole="button"
                accessibilityLabel="New secret"
                style={({ pressed }) => [styles.fab, pressed && styles.pressed]}
            >
                <Feather
                    name="plus"
                    size={sizes.iconLogo}
                    color={colors.onAccent}
                />
            </Pressable>

            <Modal
                visible={pendingDelete !== undefined}
                transparent
                animationType="fade"
                onRequestClose={vm.cancelDelete}
            >
                <View style={styles.backdrop}>
                    <View style={styles.dialog}>
                        <Text style={styles.dialogTitle}>Delete secret?</Text>
                        <Text style={styles.dialogBody}>
                            {pendingDelete?.name} will be removed from this
                            device. This cannot be undone.
                        </Text>
                        <AppButton
                            label="Delete"
                            variant="danger"
                            onPress={vm.confirmDelete}
                        />
                        <AppButton
                            label="Cancel"
                            variant="secondary"
                            onPress={vm.cancelDelete}
                        />
                    </View>
                </View>
            </Modal>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing.md,
        paddingBottom: spacing.xl,
    },
    headerText: {
        flexShrink: 1,
    },
    title: typography.title,
    subtitle: {
        ...typography.subtitle,
        marginTop: spacing.xs,
    },
    error: {
        ...typography.caption,
        color: colors.danger,
        paddingBottom: spacing.md,
    },
    listContent: {
        gap: spacing.md,
        paddingBottom: sizes.badge + spacing.xxl,
    },
    listContentEmpty: {
        flexGrow: 1,
    },
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.md,
    },
    emptyTitle: typography.buttonSecondary,
    caption: typography.caption,
    toast: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: sizes.badge + spacing.md,
        alignItems: "center",
    },
    toastInner: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        height: sizes.control,
        paddingHorizontal: spacing.lg,
        borderWidth: sizes.borderWidth,
        borderColor: colors.border,
        borderRadius: radii.control,
        backgroundColor: colors.surface,
    },
    fab: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: sizes.badge,
        height: sizes.badge,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.badge,
        backgroundColor: colors.accent,
    },
    pressed: {
        opacity: 0.8,
    },
    backdrop: {
        flex: 1,
        justifyContent: "center",
        padding: spacing.xl,
        backgroundColor: "rgba(0,0,0,0.7)",
    },
    dialog: {
        gap: spacing.md,
        padding: spacing.xl,
        borderWidth: sizes.borderWidth,
        borderColor: colors.border,
        borderRadius: radii.badge,
        backgroundColor: colors.surface,
    },
    dialogTitle: typography.buttonSecondary,
    dialogBody: {
        ...typography.caption,
        paddingBottom: spacing.sm,
    },
});
