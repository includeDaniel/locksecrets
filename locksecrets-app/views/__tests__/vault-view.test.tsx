import { fireEvent, render, screen } from "@testing-library/react-native";

import { MASKED_VALUE, type Secret } from "@/models/secret";
import type { VaultViewModel } from "@/viewmodels/vault-viewmodel";
import { VaultView } from "@/views/vault-view";

const SECRETS: Secret[] = [
    {
        id: "1",
        name: "Wi-Fi",
        value: "hunter2",
        updatedAt: new Date(2026, 7, 18).getTime(),
    },
    {
        id: "2",
        name: "Recovery codes",
        value: "8241 5530",
        updatedAt: new Date(2026, 6, 2).getTime(),
    },
];

function stubViewModel(overrides: Partial<VaultViewModel> = {}): VaultViewModel {
    return {
        secrets: SECRETS,
        isLoading: false,
        error: null,
        revealedId: null,
        copiedId: null,
        pendingDeleteId: null,
        toggleReveal: jest.fn(),
        copy: jest.fn(),
        requestDelete: jest.fn(),
        confirmDelete: jest.fn(),
        cancelDelete: jest.fn(),
        goToNewSecret: jest.fn(),
        lock: jest.fn(),
        ...overrides,
    };
}

async function renderVault(overrides: Partial<VaultViewModel> = {}) {
    const vm = stubViewModel(overrides);
    await render(<VaultView {...vm} />);

    return vm;
}

describe("VaultView", () => {
    it("renders one card per secret", async () => {
        await renderVault();

        expect(screen.getByText("Wi-Fi")).toBeOnTheScreen();
        expect(screen.getByText("Recovery codes")).toBeOnTheScreen();
        expect(screen.getByText("2 secrets stored")).toBeOnTheScreen();
    });

    it("singularises the count", async () => {
        await renderVault({ secrets: [SECRETS[0]] });

        expect(screen.getByText("1 secret stored")).toBeOnTheScreen();
    });

    it("masks every value until the ViewModel reveals one", async () => {
        await renderVault();

        expect(screen.getAllByText(MASKED_VALUE)).toHaveLength(2);
        expect(screen.queryByText("hunter2")).not.toBeOnTheScreen();
    });

    it("reveals only the secret named by revealedId", async () => {
        await renderVault({ revealedId: "1" });

        expect(screen.getByText("hunter2")).toBeOnTheScreen();
        expect(screen.getAllByText(MASKED_VALUE)).toHaveLength(1);
        expect(screen.queryByText("8241 5530")).not.toBeOnTheScreen();
    });

    it("shows the date the secret was last updated", async () => {
        await renderVault();

        expect(screen.getByText("Updated 18 Aug 2026")).toBeOnTheScreen();
    });

    it("reports card actions with the id of the row they belong to", async () => {
        const vm = await renderVault();

        await fireEvent.press(screen.getByLabelText("Show Recovery codes"));
        await fireEvent.press(screen.getByLabelText("Copy Wi-Fi"));
        await fireEvent.press(screen.getByLabelText("Delete Wi-Fi"));

        expect(vm.toggleReveal).toHaveBeenCalledWith("2");
        expect(vm.copy).toHaveBeenCalledWith("1");
        expect(vm.requestDelete).toHaveBeenCalledWith("1");
    });

    it("labels the reveal toggle by what pressing it will do", async () => {
        await renderVault({ revealedId: "1" });

        expect(screen.getByLabelText("Hide Wi-Fi")).toBeOnTheScreen();
        expect(screen.getByLabelText("Show Recovery codes")).toBeOnTheScreen();
    });

    it("renders an empty state instead of a list", async () => {
        await renderVault({ secrets: [] });

        expect(screen.getByText("Nothing locked away yet")).toBeOnTheScreen();
        expect(screen.getByText("0 secrets stored")).toBeOnTheScreen();
    });

    it("renders neither cards nor the empty state while loading", async () => {
        await renderVault({ isLoading: true, secrets: [] });

        expect(screen.queryByText("Nothing locked away yet")).not.toBeOnTheScreen();
        expect(screen.queryByText("Wi-Fi")).not.toBeOnTheScreen();
    });

    it("translates an error code into copy", async () => {
        await renderVault({ error: "delete-failed" });

        expect(
            screen.getByText("That secret could not be deleted."),
        ).toBeOnTheScreen();
    });

    it("shows the copied toast only while copiedId is set", async () => {
        await renderVault();

        expect(screen.queryByText("Copied to clipboard")).not.toBeOnTheScreen();

        await screen.rerender(<VaultView {...stubViewModel({ copiedId: "1" })} />);

        expect(screen.getByText("Copied to clipboard")).toBeOnTheScreen();
    });

    it("keeps the delete dialog closed until a delete is pending", async () => {
        await renderVault();

        expect(screen.queryByText("Delete secret?")).not.toBeOnTheScreen();
    });

    it("names the pending secret in the delete dialog", async () => {
        const vm = await renderVault({ pendingDeleteId: "2" });

        expect(screen.getByText("Delete secret?")).toBeOnTheScreen();
        expect(
            screen.getByText(/Recovery codes will be removed/),
        ).toBeOnTheScreen();

        await fireEvent.press(screen.getByLabelText("Delete"));
        expect(vm.confirmDelete).toHaveBeenCalledTimes(1);

        await fireEvent.press(screen.getByLabelText("Cancel"));
        expect(vm.cancelDelete).toHaveBeenCalledTimes(1);
    });

    it("wires the FAB and the lock button to the ViewModel", async () => {
        const vm = await renderVault();

        await fireEvent.press(screen.getByLabelText("New secret"));
        await fireEvent.press(screen.getByLabelText("Lock vault"));

        expect(vm.goToNewSecret).toHaveBeenCalledTimes(1);
        expect(vm.lock).toHaveBeenCalledTimes(1);
    });
});
