"use client";

import styled from "styled-components";
import { Container } from "@/components/layout/Container";

interface ServicesHeroProps {
  heading: string;
  introduction?: string;
}

export default function ServicesHero({
  heading,
  introduction,
}: ServicesHeroProps) {
  return (
    <Section>
      <Container>
        <Inner>
          <Eyebrow>What We Deliver</Eyebrow>
          <Heading>{heading}</Heading>
          {introduction && <Lead>{introduction}</Lead>}
        </Inner>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing["4xl"]} 0
    ${({ theme }) => theme.spacing["2xl"]};
  background: ${({ theme }) => theme.colors.white};
  margin-top: 80px;
`;

const Inner = styled.div`
  max-width: 880px;
`;

const Eyebrow = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Heading = styled.h1`
  font-size: clamp(2.5rem, 5.5vw, 4.5rem);
  line-height: 1.05;
  color: ${({ theme }) => theme.colors.navy};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  letter-spacing: -0.02em;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Lead = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-style: italic;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.grayDark};
  max-width: 700px;
`;
