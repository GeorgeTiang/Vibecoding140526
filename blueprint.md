# Project Blueprint: Toto Random Number Generator

## Overview

A modern, responsive web application for generating random "Toto" numbers. It features a vibrant UI, persistent Day/Night themes, and is built using native Web Components and modern CSS standards.

## Implemented Features

*   **Initial Setup:** Basic project structure (HTML, CSS, JS).
*   **Web Components:** A functional `random-number-generator` and `theme-toggle` component.
*   **Design System:** Integrated Day/Night themes using CSS variables (`oklch`).
*   **Theme Toggle:** Persistent theme selection with `localStorage` and system preference detection.
*   **Modern UI:** Vibrant aesthetics with gradients, multi-layered shadows, and responsive layout.

## Current Task: Day/Night Mode & UI Overhaul

### Goal
Implement a persistent theme toggle and modernize the visual design.

### Plan
1.  **Global Styles:** Define `:root` and `.dark-theme` variables in `style.css`. Add a noise texture and base layout styles.
2.  **Theme Toggle:** Create a `<theme-toggle>` Web Component in `main.js`.
3.  **Generator Refactor:** Upgrade `random-number-generator` with modern aesthetics (gradients, shadows, animations).
4.  **Layout Update:** Refine `index.html` for a polished, centered hero experience.
5.  **Persistence:** Ensure the theme choice is saved and loaded from `localStorage`.

## Design Specifications

*   **Colors:** Vibrant `oklch` hues (e.g., brand-primary, accent-glow).
*   **Typography:** Expressive sans-serif stacks (Inter, system-ui).
*   **Effects:** Multi-layered drop shadows, glassmorphism-inspired cards.
*   **Interactivity:** Smooth transitions (300ms ease), button hover "glow".
