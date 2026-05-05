"use client";

import styled from "styled-components";
import { Container } from "@/components/layout/Container";
import type { ServiceItem } from "@/lib/types";

interface ServicesGridProps {
  services: ServiceItem[];
}

/**
 * Splits a description on periods into bullet items.
 * Filters out empty strings and trims whitespace.
 */
function parseBullets(description: string): string[] {
  return description
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  if (!services || services.length === 0) return null;

  return (
    <Section>
      <Container>
        <Grid>
          {services.map((service, index) => {
            const bullets = parseBullets(service.description);
            // First bullet often reads as a tagline-style intro
            const [tagline, ...rest] = bullets;

            return (
              <Card key={service.id}>
                <CardHeader>
                  <CardNumber>{String(index + 1).padStart(2, "0")}</CardNumber>
                  <CardTitle>{service.title}</CardTitle>
                  {tagline && <CardTagline>{tagline}.</CardTagline>}
                </CardHeader>

                {rest.length > 0 && (
                  <BulletList>
                    {rest.map((bullet, i) => (
                      <Bullet key={i}>
                        <BulletMark>›</BulletMark>
                        <BulletText>{bullet}</BulletText>
                      </Bullet>
                    ))}
                  </BulletList>
                )}
              </Card>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing["2xl"]} 0
    ${({ theme }) => theme.spacing["4xl"]};
  background: ${({ theme }) => theme.colors.white};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: ${({ theme }) => theme.colors.grayLighter};
  border: 1px solid ${({ theme }) => theme.colors.grayLighter};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing["2xl"]}
    ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  position: relative;
  transition: background ${({ theme }) => theme.transitions.base};
  border-bottom: 2px solid transparent;

  &:hover {
    background: ${({ theme }) => theme.colors.offWhite};
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CardHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CardNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.1em;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  opacity: 0.7;
`;

const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  color: ${({ theme }) => theme.colors.navy};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 1.2;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CardTagline = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-style: italic;
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.gray};
`;

const BulletList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.grayLighter};
`;

const Bullet = styled.li`
  display: grid;
  grid-template-columns: 1.2rem 1fr;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: start;
`;

const BulletMark = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.3;
`;

const BulletText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.charcoal};
`;
