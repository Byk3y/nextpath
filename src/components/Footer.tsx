"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Footer() {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <footer style={{
            padding: isMobile ? "40px 24px" : "60px 40px",
            backgroundColor: "#181616",
            borderTop: "1px solid rgba(255, 255, 219, 0.08)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <span style={{
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                opacity: 0.35,
                color: "#FFFFDB",
                fontFamily: "var(--font-body)"
            }}>
                NextPath Studio — 2025
            </span>
        </footer>
    );
}
