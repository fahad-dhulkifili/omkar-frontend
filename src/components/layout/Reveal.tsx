"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Wrapper ref={ref} $visible={visible} $delay={delay} $direction={direction}>
      {children}
    </Wrapper>
  );
}

const getTransform = (direction: "up" | "left" | "right", visible: boolean) => {
  if (visible) return "translate3d(0, 0, 0)";
  switch (direction) {
    case "up":
      return "translate3d(0, 40px, 0)";
    case "left":
      return "translate3d(-40px, 0, 0)";
    case "right":
      return "translate3d(40px, 0, 0)";
  }
};

const Wrapper = styled.div<{
  $visible: boolean;
  $delay: number;
  $direction: "up" | "left" | "right";
}>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible, $direction }) =>
    getTransform($direction, $visible)};
  transition:
    opacity 0.7s ease ${({ $delay }) => $delay}ms,
    transform 0.7s ease ${({ $delay }) => $delay}ms;
  will-change: opacity, transform;
`;
