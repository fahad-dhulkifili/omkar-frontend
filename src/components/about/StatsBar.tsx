"use client";

import styled from "styled-components";
import { Container } from "@/components/layout/Container";
import type { StatItem } from "@/lib/types";

interface StatsBarProps {
  stats: StatItem[];
  background?: "light" | "dark";
}

export default function StatsBar({
  stats,
  background = "light",
}: StatsBarProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <Section $background={background}>
      <Container>
        <Grid $count={stats.length}>
          {stats.map((stat) => (
            <Stat key={stat.id} $background={background}>
              <Value $background={background}>{stat.value}</Value>
              <Label $background={background}>{stat.label}</Label>
            </Stat>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

const Section = styled.section<{ $background: "light" | "dark" }>`
  padding: ${({ theme }) => theme.spacing["2xl"]} 0;
  background: ${({ $background, theme }) =>
    $background === "dark" ? theme.colors.navy : theme.colors.offWhite};
`;

const Grid = styled.div<{ $count: number }>`
  display: grid;
  grid-template-columns: ${({ $count }) => `repeat(${$count}, 1fr)`};
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Stat = styled.div<{ $background: "light" | "dark" }>`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
`;

const Value = styled.div<{ $background: "light" | "dark" }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 3.5vw, 3rem);
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.div<{ $background: "light" | "dark" }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ $background, theme }) =>
    $background === "dark" ? "rgba(255, 255, 255, 0.7)" : theme.colors.gray};
`;
