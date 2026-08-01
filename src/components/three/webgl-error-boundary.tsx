"use client";

import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; fallback: ReactNode };
type State = { hasError: boolean };

/** Catches WebGL/Three.js init failures so a broken 3D scene degrades to a static visual instead of crashing the page. */
export class WebglErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[ARVIT] 3D scene failed to render, falling back to static visual:", error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
