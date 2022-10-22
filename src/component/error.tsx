import { Component, ErrorInfo, PropsWithChildren } from "react";

interface Props {}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<PropsWithChildren<Props>, State> {
    constructor(props: PropsWithChildren<Props>) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error({ error, errorInfo });
    }

    override render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}
