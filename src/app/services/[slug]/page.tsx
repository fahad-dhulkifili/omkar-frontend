"use client";

import { use } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useServicePillar } from "@/lib/queries";
import Navbar from "@/components/layout/Navbar";
import { Container } from "@/components/layout/Container";
import CTASection from "@/components/home/CTASection";

export default function ServicePillarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: pillar, isLoading, error } = useServicePillar(slug);

  if (isLoading) return <State>Loading...</State>;
  if (error) return <State>Error: {error.message}</State>;
  if (!pillar) return <State>Service not found.</State>;

  return (
    <>
      <Navbar />
      <Header>
        <Container>
          <Breadcrumb>
            <BreadcrumbLink href="/services">Services</BreadcrumbLink>
            <BreadcrumbSep>/</BreadcrumbSep>
            <BreadcrumbCurrent>{pillar.name}</BreadcrumbCurrent>
          </Breadcrumb>
          {pillar.tagline && <Eyebrow>{pillar.tagline}</Eyebrow>}
          <Heading>{pillar.h1Header || pillar.name}</Heading>
          {pillar.introduction && <Lead>{pillar.introduction}</Lead>}
        </Container>
      </Header>

      <SubServicesSection>
        <Container>
          {pillar.subServices?.map((sub, index) => (
            <SubServiceBlock key={sub.id}>
              <SubHeader>
                <SubNumber>{String(index + 1).padStart(2, "0")}</SubNumber>
                <SubTitleGroup>
                  <SubTitle>{sub.title}</SubTitle>
                  {sub.description && (
                    <SubDescription>{sub.description}</SubDescription>
                  )}
                </SubTitleGroup>
              </SubHeader>

              {sub.bullets && sub.bullets.length > 0 && (
                <BulletList>
                  {sub.bullets.map((bullet) => {
                    const colonIndex = bullet.text.indexOf(":");
                    const hasLabel = colonIndex > 0 && colonIndex < 60;
                    const label = hasLabel
                      ? bullet.text.slice(0, colonIndex)
                      : null;
                    const body = hasLabel
                      ? bullet.text.slice(colonIndex + 1).trim()
                      : bullet.text;

                    return (
                      <Bullet key={bullet.id}>
                        <BulletMark>›</BulletMark>
                        <BulletText>
                          {label && <BulletLabel>{label}. </BulletLabel>}
                          {body}
                        </BulletText>
                      </Bullet>
                    );
                  })}
                </BulletList>
              )}
            </SubServiceBlock>
          ))}
        </Container>
      </SubServicesSection>

      <CTASection
        heading="Ready to engineer the right fit?"
        description="Tell us about your requirement. We'll structure the workforce, manage the compliance, and stand by the standard."
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
  padding: ${({ theme }) => theme.spacing["3xl"]} 0
    ${({ theme }) => theme.spacing["2xl"]};
  background: ${({ theme }) => theme.colors.offWhite};
  margin-top: 80px;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  &:hover {
    text-decoration: underline;
  }
`;

const BreadcrumbSep = styled.span`
  color: ${({ theme }) => theme.colors.grayLight};
`;

const BreadcrumbCurrent = styled.span`
  color: ${({ theme }) => theme.colors.gray};
`;

const Eyebrow = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Heading = styled.h1`
  font-size: clamp(2.2rem, 4.5vw, 3.5rem);
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.navy};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  letter-spacing: -0.02em;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 900px;
`;

const Lead = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.grayDark};
  max-width: 760px;
`;

const SubServicesSection = styled.section`
  padding: ${({ theme }) => theme.spacing["3xl"]} 0
    ${({ theme }) => theme.spacing["4xl"]};
  background: ${({ theme }) => theme.colors.white};
`;

const SubServiceBlock = styled.div`
  padding: ${({ theme }) => theme.spacing["2xl"]} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayLighter};

  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const SubHeader = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 40px 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const SubNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.25;
  line-height: 1;
`;

const SubTitleGroup = styled.div``;

const SubTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  color: ${({ theme }) => theme.colors.navy};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 1.25;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const SubDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-style: italic;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.gray};
`;

const BulletList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  padding-left: calc(60px + ${({ theme }) => theme.spacing.lg});

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding-left: 0;
    gap: ${({ theme }) => theme.spacing.md};
  }
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
  line-height: 1.4;
`;

const BulletText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.grayDark};
`;

const BulletLabel = styled.strong`
  color: ${({ theme }) => theme.colors.navy};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;
