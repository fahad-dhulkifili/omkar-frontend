"use client";

import styled from "styled-components";
import { Container } from "@/components/layout/Container";
import type { TimelineItem } from "@/lib/types";

interface TimelineSectionProps {
  items: TimelineItem[];
}

export default function TimelineSection({ items }: TimelineSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <Section>
      <Container>
        <Header>
          <Eyebrow>The Journey</Eyebrow>
          <Heading>Two decades of building trust.</Heading>
        </Header>

        <List>
          {items.map((item) => (
            <Item key={item.id}>
              <Period>{item.period}</Period>
              <Body>
                <ItemHeading>{item.heading}</ItemHeading>
                <ItemDescription>{item.description}</ItemDescription>
              </Body>
            </Item>
          ))}
        </List>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing["3xl"]} 0;
  background: ${({ theme }) => theme.colors.offWhite};
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
  max-width: 600px;
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

const Heading = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.15;
  color: ${({ theme }) => theme.colors.navy};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  letter-spacing: -0.02em;
`;

const List = styled.ol`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.colors.grayLighter};
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayLighter};
  transition: padding ${({ theme }) => theme.transitions.base};

  &:hover {
    padding-left: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const Period = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.primary};
  padding-top: 0.4rem;
`;

const Body = styled.div``;

const ItemHeading = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.navy};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ItemDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.grayDark};
`;
