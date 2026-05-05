"use client";

import styled from "styled-components";
import { Container } from "@/components/layout/Container";
import type { Industry } from "@/lib/types";

interface IndustriesSectionProps {
  industries: Industry[];
}

export default function IndustriesSection({
  industries,
}: IndustriesSectionProps) {
  if (!industries || industries.length === 0) return null;

  return (
    <Section>
      <Container>
        <Eyebrow>Industries We Serve</Eyebrow>
        <List>
          {industries.map((industry) => (
            <Item key={industry.id}>
              <Dash>—</Dash>
              <Name>{industry.name}</Name>
            </Item>
          ))}
        </List>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing["3xl"]} 0
    ${({ theme }) => theme.spacing["4xl"]};
  background: ${({ theme }) => theme.colors.white};
`;

const Eyebrow = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  max-width: 500px;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayLighter};
  transition: padding-left ${({ theme }) => theme.transitions.base};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.grayLighter};
  }

  &:hover {
    padding-left: ${({ theme }) => theme.spacing.sm};
  }
`;

const Dash = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Name = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.navy};
`;
