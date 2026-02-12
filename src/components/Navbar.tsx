"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMediaQuery, useMounted } from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";

const DotLottiePlayer = dynamic(
    () => import("@dotlottie/react-player").then((mod) => mod.DotLottiePlayer),
    { ssr: false }
);

export default function Navbar() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const mounted = useMounted();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide when scrolling down, reappear when scrolling up
            if (currentScrollY > lastScrollY) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }

            // Always show at the very top
            if (currentScrollY < 10) {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    /* Pre-mount: render a minimal placeholder to avoid layout shift */
    if (!mounted) {
        return (
            <nav style={{ padding: "20px 40px", backgroundColor: "transparent" }}>
                <span style={{ fontFamily: "var(--font-brand)", fontSize: "28px", fontWeight: 700, color: "#FFFFDB" }}>
                    NextPath
                </span>
            </nav>
        );
    }

    /* ── NAVBAR ── */
    return (
        <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : -100,
                transition: { duration: 0.4, ease: "easeInOut" }
            }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: isMobile ? "32px 20px" : "40px 40px",
                backgroundColor: "transparent",
                pointerEvents: isVisible ? "auto" : "none",
            }}
        >
            {isMobile ? (
                <>
                    {/* Brand name – left */}
                    <a
                        href="/"
                        style={{
                            fontFamily: "var(--font-brand)",
                            fontSize: "28px",
                            fontWeight: 700,
                            color: "#FFFFDB",
                        }}
                    >
                        NextPath
                    </a>

                    {/* Mascot placeholder – red rounded square */}
                    <div
                        style={{
                            width: "54px",
                            height: "54px",
                            background: "linear-gradient(135deg, #FF3831 0%, #E91E63 100%)",
                            borderRadius: "14px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                            cursor: "pointer",
                            boxShadow: "0 8px 16px rgba(255, 56, 49, 0.2)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                    >
                        <DotLottiePlayer
                            src="/animations/mascot.lottie"
                            autoplay
                            loop
                            style={{
                                width: "100%",
                                height: "100%",
                                transform: "scale(1.8) translateY(-6%)"
                            }}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div
                        style={{
                            display: "flex",
                            gap: "24px",
                            fontSize: "14px",
                            letterSpacing: "0.01em",
                            color: "#FFFFDB",
                        }}
                    >
                        <a href="#work" style={{ opacity: 0.7, transition: "opacity 0.3s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}>
                            Work
                        </a>
                        <a href="#about" style={{ opacity: 0.7, transition: "opacity 0.3s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}>
                            About
                        </a>
                        <a href="#services" style={{ opacity: 0.7, transition: "opacity 0.3s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}>
                            Services
                        </a>
                    </div>

                    <a
                        href="/"
                        style={{
                            fontFamily: "var(--font-brand)",
                            fontSize: "26px",
                            fontWeight: 700,
                            letterSpacing: "0.02em",
                            color: "#FFFFDB",
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        NextPath
                    </a>

                    <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                        <a
                            href="#contact"
                            style={{
                                fontSize: "14px",
                                opacity: 0.7,
                                color: "#FFFFDB",
                                textDecoration: "underline",
                                textUnderlineOffset: "4px",
                                transition: "opacity 0.3s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
                        >
                            Start a project
                        </a>
                        <motion.a
                            href="#contact"
                            initial="initial"
                            whileHover="hover"
                            style={{
                                position: "relative",
                                backgroundColor: "#FF3831",
                                color: "#FFFFDB",
                                padding: "14px 22px",
                                fontSize: "18px",
                                fontWeight: 400,
                                fontFamily: "var(--font-heading)",
                                borderRadius: "0.5rem",
                                lineHeight: 1,
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                textDecoration: "none",
                            }}
                        >
                            <motion.div
                                variants={{
                                    initial: { x: "-100%" },
                                    hover: { x: 0 }
                                }}
                                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    backgroundColor: "#FFFFDB",
                                    zIndex: 0,
                                }}
                            />
                            <motion.span
                                variants={{
                                    initial: { color: "#FFFFDB", fontStyle: "normal" },
                                    hover: { color: "#FF3831", fontStyle: "italic" }
                                }}
                                transition={{ duration: 0.4 }}
                                style={{ position: "relative", zIndex: 1, display: "block" }}
                            >
                                Let&apos;s Connect
                            </motion.span>
                        </motion.a>
                    </div>
                </>
            )}
        </motion.nav>
    );
}
