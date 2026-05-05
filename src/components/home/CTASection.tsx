"use client";

import Link from "next/link";
import styled from "styled-components";
import { Container } from "@/components/layout/Container";

interface CTASectionProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function CTASection({
  heading,
  description,
  buttonText,
  buttonLink,
}: CTASectionProps) {
  if (!heading && !description) return null;

  return (
    <Section>
      <Container>
        <Inner>
          <Eyebrow>Get in Touch</Eyebrow>
          {heading && <Heading>{heading}</Heading>}
          {description && <Description>{description}</Description>}
          {buttonText && (
            <CTAButton href={buttonLink || "/contact"}>
              <span>{buttonText}</span>
              <Arrow>→</Arrow>
            </CTAButton>
          )}
        </Inner>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing["4xl"]} 0;
  background: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.white};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 80% 20%,
      rgba(39, 69, 168, 0.35) 0%,
      transparent 60%
    );
    pointer-events: none;
  }
`;

const Inner = styled.div`
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Eyebrow = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: ${({ theme }) => theme.colors.primaryLight};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Heading = styled.h2`
  font-size: clamp(2rem, 4.5vw, 3.5rem);
  line-height: 1.15;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  letter-spacing: -0.02em;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-style: italic;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 1.1rem 2.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const Arrow = styled.span`
  display: inline-block;
  transition: transform ${({ theme }) => theme.transitions.base};

  ${CTAButton}:hover & {
    transform: translateX(6px);
  }
`;
