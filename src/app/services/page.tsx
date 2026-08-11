"use client";

import Link from "next/link";
import styled from "styled-components";
import { useServicePillars } from "@/lib/queries";
import Navbar from "@/components/layout/Navbar";
import { Container } from "@/components/layout/Container";
import CTASection from "@/components/home/CTASection";
import { ShieldCheck } from "lucide-react";

export default function ServicesPage() {
  const { data: pillars, isLoading, error } = useServicePillars();

  if (isLoading) return <State>Loading...</State>;
  if (error) return <State>Error: {error.message}</State>;
  if (!pillars || pillars.length === 0) return <State>No content found.</State>;

  return (
    <>
      <Navbar />
      <Header>
        <Container>
          <HeaderInner>
            <HeaderContent>
              <Eyebrow>What We Deliver</Eyebrow>
              <Heading>
                Four Pillars of
                <br />
                <Highlight>Enterprise Resilience.</Highlight>
              </Heading>
              <Lead>
                From defence-grade security to fully managed payroll — Omkar
                Group operates as a single-window partner across the entire
                enterprise operations spectrum.
              </Lead>
            </HeaderContent>
            <HeaderIcon>
              <ShieldCheck size={220} strokeWidth={0.75} />
            </HeaderIcon>
          </HeaderInner>
        </Container>
      </Header>

      <PillarsSection>
        <Container>
          <Grid>
            {pillars.map((pillar, index) => (
              <PillarCard
                key={pillar.documentId}
                href={`/services/${pillar.slug}`}
              >
                <CardNumber>{String(index + 1).padStart(2, "0")}</CardNumber>
                <CardName>{pillar.name}</CardName>
                {pillar.tagline && <CardTagline>{pillar.tagline}</CardTagline>}
                {pillar.introduction && (
                  <CardIntro>{pillar.introduction}</CardIntro>
                )}
                <CardMeta>
                  {pillar.subServices?.length || 0} service areas
                </CardMeta>
                <CardLink>
                  Explore <Arrow>→</Arrow>
                </CardLink>
              </PillarCard>
            ))}
          </Grid>
        </Container>
      </PillarsSection>

      <CTASection
        heading="One partner. Every operational need."
        description="Whether you need to secure a facility, staff a project, or outsource compliance — we bring 25+ years of tested methodology to your requirement."
        buttonText="Request a Consultation"
        buttonLink="/contact"
      />
    </>
  );
}

const State = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.gray};
`;

const Header = styled.section`
  padding: ${({ theme }) => theme.spacing["4xl"]} 0
    ${({ theme }) => theme.spacing["2xl"]};
  background: ${({ theme }) => theme.colors.white};
  margin-top: 80px;
`;
const HeaderInner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
`;

const HeaderIcon = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.06;
  pointer-events: none;
  line-height: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
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
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.navy};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  letter-spacing: -0.02em;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Highlight = styled.em`
  font-style: italic;
  color: ${({ theme }) => theme.colors.primaryLight};
`;

const Lead = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-style: italic;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.grayDark};
  max-width: 680px;
`;

const PillarsSection = styled.section`
  padding: ${({ theme }) => theme.spacing["2xl"]} 0
    ${({ theme }) => theme.spacing["4xl"]};
  background: ${({ theme }) => theme.colors.white};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: ${({ theme }) => theme.colors.grayLighter};
  border: 1px solid ${({ theme }) => theme.colors.grayLighter};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const PillarCard = styled(Link)`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing["2xl"]};
  display: flex;
  flex-direction: column;
  transition: background ${({ theme }) => theme.transitions.base};
  border-bottom: 3px solid transparent;

  &:hover {
    background: ${({ theme }) => theme.colors.offWhite};
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CardNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.5;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardName = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  color: ${({ theme }) => theme.colors.navy};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 1.2;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CardTagline = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardIntro = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.grayDark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex: 1;
`;

const CardMeta = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardLink = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.navy};

  ${PillarCard}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Arrow = styled.span`
  display: inline-block;
  transition: transform ${({ theme }) => theme.transitions.base};

  ${PillarCard}:hover & {
    transform: translateX(4px);
  }
`;
