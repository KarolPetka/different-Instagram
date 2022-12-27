import React from "react"
import Navigation from "./Navigation.tsx";
import RequireAuth from "./RequireAuth";

const MainLayout = ({ children }: { children: JSX.Element }) => {
    return (
        <React.Fragment>
            <RequireAuth />
            <Navigation />
            <main>
                {children}
            </main>
        </React.Fragment>)
}


export default MainLayout