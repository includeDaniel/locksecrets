import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";

export type Session = {
    isSignedIn: boolean;
    signIn: () => void;
    signOut: () => void;
};

const SessionContext = createContext<Session | null>(null);

export function SessionProvider({ children }: Readonly<PropsWithChildren>) {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const session: Session = {
        isSignedIn,
        signIn: () => setIsSignedIn(true),
        signOut: () => setIsSignedIn(false),
    };

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession(): Session {
    const session = useContext(SessionContext);

    if (session === null) {
        throw new Error("useSession must be used inside a <SessionProvider>.");
    }

    return session;
}
