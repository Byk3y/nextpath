"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery, useMounted } from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";
import { Ribbon } from "./Hero";

const DotLottiePlayer = dynamic(
    () => import("@dotlottie/react-player").then((mod) => mod.DotLottiePlayer),
    { ssr: false }
);


export default function About() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const mounted = useMounted();

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: 0.15 * i, ease: "easeOut" as const },
        }),
    };

    /* Pre-mount placeholder */
    if (!mounted) {
        return (
            <section
                id="about"
                style={{ minHeight: "100vh", backgroundColor: "#181616" }}
            />
        );
    }

    return (
        <section
            id="about"
            style={{
                minHeight: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#181616",
                padding: isMobile ? "0px 24px 100px" : "0px 40px 160px",
                textAlign: "center",
                overflow: "hidden",
                marginTop: isMobile ? "-20px" : "-40px", // Pull it up to close the gap
            }}
        >
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                style={{
                    maxWidth: "720px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0px",
                }}
            >
                {/* ── Mascot Icon ── */}
                <motion.div
                    custom={0}
                    variants={fadeUp}
                    style={{
                        width: isMobile ? "160px" : "240px",
                        height: isMobile ? "160px" : "240px",
                        marginBottom: isMobile ? "24px" : "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >
                    <DotLottiePlayer
                        src="/animations/mascot.lottie"
                        autoplay
                        loop
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </motion.div>

                {/* ── Main Heading ── */}
                <motion.h2
                    custom={1}
                    variants={fadeUp}
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: isMobile
                            ? "clamp(48px, 14vw, 64px)"
                            : "clamp(64px, 7vw, 96px)",
                        lineHeight: isMobile ? 0.95 : 0.9,
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                        color: "#FFFFDB",
                        marginBottom: isMobile ? "32px" : "40px",
                    }}
                >
                    {isMobile ? (
                        <>
                            We build
                            <br />
                            apps,
                            <br />
                            websites &amp;
                            <br />
                            <span style={{ fontStyle: "italic" }}>automations.</span>
                        </>
                    ) : (
                        <>
                            We build apps,
                            <br />
                            websites <span style={{ fontStyle: "italic" }}>&amp;</span>
                            <br />
                            <span style={{ fontStyle: "italic" }}>automations.</span>
                        </>
                    )}
                </motion.h2>

                {/* ── Decorative Ribbon ── */}
                <motion.div
                    custom={2}
                    variants={fadeUp}
                    style={{ marginBottom: isMobile ? "32px" : "44px" }}
                >
                    <Ribbon width={isMobile ? 80 : 100} />
                </motion.div>

                {/* ── Body Text ── */}
                <motion.p
                    custom={3}
                    variants={fadeUp}
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: isMobile
                            ? "clamp(22px, 6vw, 28px)"
                            : "clamp(26px, 2.5vw, 36px)",
                        lineHeight: isMobile ? 1.3 : 1.35,
                        fontWeight: 400,
                        color: "rgba(255, 255, 219, 0.9)",
                        maxWidth: "900px",
                        marginBottom: isMobile ? "44px" : "60px",
                        padding: isMobile ? "0 8px" : "0",
                    }}
                >
                    A high-velocity studio dedicated to shipping digital product. Whether
                    you need a robust web app, a stunning website, or seamless workflow
                    automations, we build anything you can imagine—with the speed and
                    precision that modern builders demand.
                </motion.p>

                {/* ── Agency Badge / CTA ── */}
                <motion.div custom={4} variants={fadeUp}>
                    <motion.a
                        href="#services"
                        initial="initial"
                        whileHover="hover"
                        style={{
                            position: "relative",
                            display: "inline-block",
                            padding: "14px 32px",
                            backgroundColor: "#FF3831",
                            color: "#FFFFDB",
                            fontFamily: "var(--font-heading)",
                            fontSize: isMobile ? "16px" : "18px",
                            fontWeight: 500,
                            letterSpacing: "0.04em",
                            borderRadius: "6px",
                            cursor: "pointer",
                            overflow: "hidden",
                            textDecoration: "none",
                            boxShadow: "0 4px 20px rgba(255, 56, 49, 0.25)",
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
                            Agency
                        </motion.span>
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
}
