import Feather from "@expo/vector-icons/Feather";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppButton } from "@/components/app-button";
import { AppTextField } from "@/components/app-text-field";
import { colors, radii, sizes, spacing, typography } from "@/constants/tokens";
import { PASSWORD_MIN_LENGTH } from "@/models/credentials";
import type { CredentialsError } from "@/models/credentials";
import type { LoginViewModel } from "@/viewmodels/login-viewmodel";

const ERROR_MESSAGES: Record<CredentialsError, string> = {
    "email-required": "Enter your email address.",
    "email-invalid": "That doesn't look like an email address.",
    "password-required": "Enter your password.",
    "password-too-short": `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
};

export function LoginView(vm: LoginViewModel) {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.screen,
                {
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom + spacing.xxxl,
                },
            ]}
        >
            <View style={styles.header}>
                <View style={styles.badge}>
                    <Feather
                        name="lock"
                        size={sizes.iconLogo}
                        color={colors.onAccent}
                    />
                </View>
                <Text style={styles.title}>LockSecrets</Text>
                <Text style={styles.subtitle}>Your vault. Your rules.</Text>
            </View>

            <View style={styles.form}>
                <AppTextField
                    label="Email"
                    icon="mail"
                    value={vm.email}
                    onChangeText={vm.setEmail}
                    placeholder="you@example.com"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                    textContentType="emailAddress"
                />

                <AppTextField
                    label="Password"
                    icon="key"
                    value={vm.password}
                    onChangeText={vm.setPassword}
                    placeholder="Your master password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    autoCorrect={false}
                    returnKeyType="go"
                    secureTextEntry={!vm.isPasswordVisible}
                    textContentType="password"
                    onSubmitEditing={vm.submit}
                    trailing={
                        <Pressable
                            onPress={vm.togglePasswordVisibility}
                            hitSlop={12}
                            accessibilityRole="button"
                            accessibilityLabel={
                                vm.isPasswordVisible
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            <Feather
                                name={vm.isPasswordVisible ? "eye-off" : "eye"}
                                size={sizes.iconInput}
                                color={colors.textSecondary}
                            />
                        </Pressable>
                    }
                />

                {vm.error === null ? null : (
                    <Text style={styles.error} accessibilityLiveRegion="polite">
                        {ERROR_MESSAGES[vm.error]}
                    </Text>
                )}
            </View>

            <AppButton
                label="Unlock vault"
                onPress={vm.submit}
                disabled={!vm.canSubmit}
                loading={vm.isSubmitting}
            />

            <View style={styles.divider}>
                <View style={styles.rule} />
                <Text style={styles.caption}>or</Text>
                <View style={styles.rule} />
            </View>

            <AppButton
                label="Create Account"
                variant="secondary"
                onPress={vm.goToCreateAccount}
            />

            <Pressable
                onPress={vm.goToRestore}
                style={styles.link}
                accessibilityRole="button"
            >
                <Text style={styles.linkLabel}>
                    Forgot password? Restore by email
                </Text>
            </Pressable>

            <View style={styles.footer}>
                <Feather
                    name="shield"
                    size={sizes.iconFooter}
                    color={colors.textMuted}
                />
                <Text style={styles.caption}>End-to-end encrypted</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: spacing.xl,
        backgroundColor: colors.background,
    },
    header: {
        alignItems: "center",
        paddingVertical: spacing.xxxl,
    },
    badge: {
        width: sizes.badge,
        height: sizes.badge,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.lg,
        borderRadius: radii.badge,
        backgroundColor: colors.accent,
    },
    title: typography.title,
    subtitle: {
        ...typography.subtitle,
        marginTop: spacing.xs,
    },
    form: {
        gap: spacing.md,
        paddingBottom: spacing.xl,
    },
    error: {
        ...typography.caption,
        color: colors.danger,
    },
    divider: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        marginTop: spacing.lg,
        marginBottom: spacing.xl,
    },
    rule: {
        flex: 1,
        height: sizes.borderWidth,
        backgroundColor: colors.border,
    },
    caption: typography.caption,
    link: {
        alignItems: "center",
        marginTop: spacing.md,
    },
    linkLabel: typography.link,
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        marginTop: "auto",
        paddingTop: spacing.xxl,
    },
});
