"use client";

import Link from "next/link";
import styled from "styled-components";
import { ShieldCheck, Building2, Users, Wallet, Briefcase } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useServicePillars } from "@/lib/queries";

interface ServicesOverviewProps {
  heading?: string;
  subheading?: string;
}

const CARD_ICONS = [ShieldCheck, Building2, Users, Wallet, Briefcase];

export default function ServicesOverview({
  heading,
  subheading,
}: ServicesOverviewProps) {
  const { data: pillars } = useServicePillars();

  if (!pillars || pillars.length === 0) return null;

  return (
    <Section>
      <Container>
        <Header>
          <HeaderLeft>
            <Eyebrow>What We Deliver</Eyebrow>
            <Title>{heading || "Spectrum of Services"}</Title>
          </HeaderLeft>
          {subheading && <Lead>{subheading}</Lead>}
        </Header>

        <Grid>
          {pillars.map((pillar, index) => {
            const Icon = CARD_ICONS[index % CARD_ICONS.length];
            return (
              <Card key={pillar.documentId} href={`/services/${pillar.slug}`}>
                <BgIcon>
                  <Icon size={96} strokeWidth={1} />
                </BgIcon>
                <CardNumber>{String(index + 1).padStart(2, "0")}</CardNumber>
                <CardTitle>{pillar.name}</CardTitle>
                {pillar.tagline && (
                  <CardDescription>{pillar.tagline}</CardDescription>
                )}
                <CardLink>
                  Explore <Arrow>→</Arrow>
                </CardLink>
              </Card>
            );
          })}
        </Grid>

        <Footer>
          <ViewAllLink href="/services">
            <span>Explore All Services</span>
            <Arrow>→</Arrow>
          </ViewAllLink>
        </Footer>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing["4xl"]} 0
    ${({ theme }) => theme.spacing["3xl"]};
  background: ${({ theme }) => theme.colors.offWhite};
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing["2xl"]};
  align-items: end;
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const HeaderLeft = styled.div``;

const Eyebrow = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.navy};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  letter-spacing: -0.02em;
`;

const Lead = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-style: italic;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.grayDark};
  max-width: 460px;
  justify-self: end;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-self: start;
  }
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

const Card = styled(Link)`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing["2xl"]}
    ${({ theme }) => theme.spacing.xl};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all ${({ theme }) => theme.transitions.base};
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-4px);
  }
`;

const BgIcon = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.07;
  pointer-events: none;
  line-height: 0;
  transition: opacity ${({ theme }) => theme.transitions.base};

  ${Card}:hover & {
    opacity: 0.12;
  }
`;

const CardNumber = styled.div`
  position: relative;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.1em;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  opacity: 0.6;
`;

const CardTitle = styled.h3`
  position: relative;
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 1.2;
`;

const CardDescription = styled.p`
  position: relative;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.grayDark};
  flex: 1;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CardLink = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.navy};

  ${Card}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Footer = styled.div`
  margin-top: ${({ theme }) => theme.spacing["2xl"]};
  display: flex;
  justify-content: center;
`;

const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.navy};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  border-bottom: 1px solid ${({ theme }) => theme.colors.navy};
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Arrow = styled.span`
  display: inline-block;
  transition: transform ${({ theme }) => theme.transitions.base};

  ${ViewAllLink}:hover &, ${Card}:hover & {
    transform: translateX(4px);
  }
`;
