"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery, useMounted } from "@/hooks/useMediaQuery";
import { useState, useEffect } from "react";

export function Ribbon({ width = 80, color = "#FF3831" }: { width?: number; color?: string }) {
    const height = width * 0.4;
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 100 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "inline-block", verticalAlign: "middle" }}
        >
            {/* Organic, wavy ribbon shapes matching the reference image */}
            <path
                d="M10 25C15 20 25 15 35 22C45 29 55 25 60 20C65 15 75 12 85 18C95 24 90 30 80 28C70 26 62 32 55 35C48 38 38 35 28 32C18 29 5 30 10 25Z"
                fill={color}
            />
            <path
                d="M30 35C35 32 45 30 50 33C55 36 65 38 70 34C75 30 80 28 85 30C90 32 88 36 82 37C76 38 68 39 60 36C52 33 42 34 35 37C28 40 25 38 30 35Z"
                fill={color}
                opacity="0.85"
            />
            <path
                d="M50 15C55 12 65 10 75 13C85 16 95 18 92 12C89 6 80 5 70 8C60 11 52 14 45 12C38 10 35 12 40 15C45 18 45 18 50 15Z"
                fill={color}
                opacity="0.7"
            />
        </svg>
    );
}

function WordRotate({ words, interval = 2500 }: { words: string[]; interval?: number }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, interval);
        return () => clearInterval(timer);
    }, [words.length, interval]);

    return (
        <span style={{ position: "relative", display: "inline-block", height: "1.15em", verticalAlign: "top", overflow: "hidden", width: "100%", textAlign: "center" }}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        display: "block",
                        fontStyle: "italic",
                        color: "#FF3831",
                    }}
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

export default function Hero() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const mounted = useMounted();

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        show: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: 0.15 * i, ease: "easeOut" },
        }),
    };

    /* Pre-mount: render a simple dark placeholder to avoid hydration mismatch */
    if (!mounted) {
        return (
            <section style={{ minHeight: "100vh", backgroundColor: "#181616" }} />
        );
    }

    /* ══════════════════════════════════════════
         MOBILE HERO — natural flow, not 100vh
       ══════════════════════════════════════════ */
    if (isMobile) {
        return (
            <section
                key="mobile"
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#181616",
                    overflow: "hidden",
                }}
            >
                {/* ── Headline ── */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    style={{
                        textAlign: "center",
                        padding: "160px 24px 0",
                    }}
                >
                    <motion.h1
                        custom={1}
                        variants={fadeUp}
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(50px, 14vw, 82px)",
                            lineHeight: 0.85,
                            fontWeight: 400,
                            letterSpacing: "-0.02em",
                            color: "#FFFFDB",
                            marginBottom: "20px",
                        }}
                    >
                        We build MVPs
                        <br />
                        in days,
                        <br />
                        <span style={{ fontStyle: "italic" }}>not months.</span>
                    </motion.h1>

                    {/* ── Ribbon accent (New high-fidelity design) ── */}
                    <motion.div custom={2} variants={fadeUp} style={{ marginBottom: "28px", display: "flex", justifyContent: "center" }}>
                        <Ribbon width={80} />
                    </motion.div>

                    {/* ── Sub-headline (refined centered layout) ── */}
                    <motion.p
                        custom={3}
                        variants={fadeUp}
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(24px, 6.5vw, 36px)",
                            lineHeight: 1.15,
                            fontWeight: 400,
                            color: "#FFFFDB",
                            marginBottom: "32px",
                            maxWidth: "400px",
                            marginInline: "auto",
                        }}
                    >
                        AI-assisted development
                        <br />
                        for startups that ship
                        <br />
                        <WordRotate words={["yesterday.", "faster.", "today.", "now."]} />
                        <br />
                        Just working product.
                    </motion.p>

                    {/* ── CTA row ── */}
                    <motion.div
                        custom={4}
                        variants={fadeUp}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            marginBottom: "32px",
                            padding: "0 4px",
                        }}
                    >
                        <motion.a
                            href="#work"
                            initial="initial"
                            whileHover="hover"
                            style={{
                                position: "relative",
                                display: "inline-block",
                                padding: "14px 24px",
                                border: "1.5px solid rgba(255, 255, 219, 0.5)",
                                color: "#FFFFDB",
                                fontFamily: "var(--font-heading)",
                                fontSize: "18px",
                                fontWeight: 500,
                                letterSpacing: "0.03em",
                                flexShrink: 0,
                                borderRadius: "8px",
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
                                Our Work
                            </motion.span>
                        </motion.a>
                        <p
                            style={{
                                fontSize: "13px",
                                opacity: 0.5,
                                lineHeight: 1.4,
                                color: "#FFFFDB",
                                textAlign: "left",
                            }}
                        >
                            Partnering with ambitious brands &amp; inspiring people.
                        </p>
                    </motion.div>
                </motion.div>

                {/* ── BOTTOM: 4 Vertical Bars ── */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                    style={{
                        display: "flex",
                        gap: "8px",
                        padding: "0 16px",
                        height: "18vh",
                        minHeight: "120px",
                        marginTop: "16px",
                    }}
                >
                    {[
                        { bg: "linear-gradient(180deg, #FFD700 0%, #FF8C00 100%)", label: "14 Days", sub: "Avg. Build", h: "18vh" },
                        { bg: "linear-gradient(180deg, #FF3831 0%, #E91E63 100%)", label: "24+", sub: "Shipped", h: "22vh" },
                        { bg: "linear-gradient(180deg, #FFFFDB 0%, #E8E0C8 100%)", label: "100%", sub: "AI-Driven", h: "20vh" },
                        { bg: "linear-gradient(180deg, #34D399 0%, #059669 100%)", label: "100%", sub: "Impact", h: "24vh" },
                    ].map((bar, i) => (
                        <div
                            key={i}
                            style={{
                                flex: 1,
                                borderRadius: "14px 14px 0 0",
                                background: bar.bg,
                                position: "relative",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "8px",
                                height: bar.h,
                                minHeight: "120px",
                                border: i === 2 ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,219,0.1)",
                                borderBottom: "none",
                            }}
                        >
                            <motion.div
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                                    pointerEvents: "none",
                                }}
                            />
                            <div style={{
                                fontSize: "18px",
                                fontWeight: 900,
                                color: i === 2 ? "#181616" : "#FFFFDB",
                                marginBottom: "2px",
                                position: "relative",
                                textShadow: i === 2 ? "none" : "0 2px 4px rgba(0,0,0,0.2)"
                            }}>{bar.label}</div>
                            <div style={{
                                fontSize: "10px",
                                fontWeight: 700,
                                opacity: 1,
                                color: i === 2 ? "#181616" : "#FFFFDB",
                                textAlign: "center",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                position: "relative",
                                textShadow: i === 2 ? "none" : "0 1px 2px rgba(0,0,0,0.2)"
                            }}>{bar.sub}</div>
                        </div>
                    ))}
                </motion.div>
            </section>
        );
    }

    /* ══════════════════════════════════════════
         DESKTOP HERO — unchanged
       ══════════════════════════════════════════ */
    return (
        <section
            key="desktop"
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "160px 40px 40px",
                position: "relative",
                overflow: "visible",
                backgroundColor: "#181616",
            }}
        >
            <motion.div
                initial="hidden"
                animate="show"
                style={{
                    textAlign: "center",
                    maxWidth: "1100px",
                    margin: "0 auto",
                    marginBottom: "48px",
                }}
            >
                <motion.h1
                    custom={1}
                    variants={fadeUp}
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(48px, 8vw, 101.333px)",
                        lineHeight: 0.85,
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                        color: "#FFFFDB",
                    }}
                >
                    We build MVPs
                    <br />
                    in days,
                    <br />
                    <Ribbon width={60} />{" "}
                    <span style={{ fontStyle: "italic" }}>not months.</span>{" "}
                    <Ribbon width={60} />
                </motion.h1>
            </motion.div>

            <motion.div
                initial="hidden"
                animate="show"
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "60px",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    width: "100%",
                    alignItems: "end",
                }}
            >
                <motion.div custom={3} variants={fadeUp}>
                    <p
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(22px, 2.5vw, 30px)",
                            lineHeight: 1.2,
                            marginBottom: "40px",
                            maxWidth: "420px",
                            color: "rgba(255, 255, 219, 0.85)",
                        }}
                    >
                        AI-assisted development
                        <br />
                        for startups that need
                        <br />
                        to ship yesterday. No scope
                        <br />
                        creep. No 6-month timelines.
                        <br />
                        Just working product.
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                        <motion.a
                            href="#work"
                            initial="initial"
                            whileHover="hover"
                            style={{
                                position: "relative",
                                display: "inline-block",
                                padding: "14px 32px",
                                border: "1.5px solid rgba(255, 255, 219, 0.4)",
                                color: "#FFFFDB",
                                fontFamily: "var(--font-heading)",
                                fontSize: "18px",
                                fontWeight: 500,
                                letterSpacing: "0.05em",
                                borderRadius: "8px",
                                overflow: "hidden",
                                cursor: "pointer",
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
                                Our Work
                            </motion.span>
                        </motion.a>
                        <p
                            style={{
                                fontSize: "13px",
                                opacity: 0.5,
                                maxWidth: "200px",
                                lineHeight: 1.5,
                                color: "#FFFFDB",
                            }}
                        >
                            Partnering with ambitious brands &amp; inspiring people.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    custom={4}
                    variants={fadeUp}
                    style={{
                        display: "flex",
                        gap: "16px",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                    }}
                >
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            width: "160px",
                            height: "280px",
                            borderRadius: "20px",
                            background: "linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#181616",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                        }}
                    >
                        <div style={{ textAlign: "center", padding: "20px", position: "relative", zIndex: 1, color: "#FFFFDB" }}>
                            <div style={{ fontSize: "32px", fontWeight: 900, marginBottom: "4px", textShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>14 Days</div>
                            <div style={{ fontSize: "16px", fontWeight: 700, opacity: 1, textTransform: "uppercase", letterSpacing: "0.1em", textShadow: "0 2px 6px rgba(0,0,0,0.3)" }}>Avg. Build</div>
                        </div>
                        <motion.div
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                                pointerEvents: "none",
                            }}
                        />
                        <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", pointerEvents: "none" }} />
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        style={{
                            width: "170px",
                            height: "320px",
                            borderRadius: "20px",
                            background: "linear-gradient(135deg, #FF3831 0%, #E91E63 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#FFFFDB",
                            boxShadow: "0 25px 70px rgba(255,56,49,0.2)",
                        }}
                    >
                        <div style={{ textAlign: "center", padding: "20px", position: "relative", zIndex: 1, color: "#FFFFDB" }}>
                            <div style={{ fontSize: "36px", fontWeight: 900, marginBottom: "4px", textShadow: "0 4px 15px rgba(0,0,0,0.4)" }}>24+</div>
                            <div style={{ fontSize: "16px", fontWeight: 700, opacity: 1, textTransform: "uppercase", letterSpacing: "0.1em", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>MVPs Shipped</div>
                        </div>
                        <motion.div
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0.5 }}
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                                pointerEvents: "none",
                            }}
                        />
                        <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", pointerEvents: "none" }} />
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        style={{
                            width: "150px",
                            height: "260px",
                            borderRadius: "20px",
                            background: "linear-gradient(135deg, #FFFFDB 0%, #E8E0C8 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#181616",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                        }}
                    >
                        <div style={{ textAlign: "center", padding: "20px", position: "relative", zIndex: 1, color: "#181616" }}>
                            <div style={{ fontSize: "32px", fontWeight: 900, marginBottom: "4px" }}>100%</div>
                            <div style={{ fontSize: "16px", fontWeight: 700, opacity: 0.9, textTransform: "uppercase", letterSpacing: "0.1em" }}>AI-Driven</div>
                        </div>
                        <motion.div
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 3.8, repeat: Infinity, ease: "linear", delay: 1 }}
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.05) 50%, transparent 100%)",
                                pointerEvents: "none",
                            }}
                        />
                        <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(0,0,0,0.1)", borderRadius: "20px", pointerEvents: "none" }} />
                    </motion.div>
                </motion.div>
            </motion.div>


        </section>
    );
}
