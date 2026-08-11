"use client";

import styled from "styled-components";
import { useClientSectors } from "@/lib/queries";
import Navbar from "@/components/layout/Navbar";
import { Container } from "@/components/layout/Container";
import CTASection from "@/components/home/CTASection";
import Reveal from "@/components/layout/Reveal";
import { Award } from "lucide-react";

export default function PortfolioPage() {
  const { data: sectors, isLoading, error } = useClientSectors();

  if (isLoading) return <State>Loading...</State>;
  if (error) return <State>Error: {error.message}</State>;
  if (!sectors || sectors.length === 0) return <State>No content found.</State>;

  return (
    <>
      <Navbar />
      <Header>
        <Container>
          <HeaderInner>
            <HeaderContent>
              <Eyebrow>Our Clients &amp; References</Eyebrow>
              <Heading>
                From the Nation's
                <br />
                <Highlight>Most Trusted Institutions.</Highlight>
              </Heading>
              <Lead>
                Over 20 years, we have served institutions where there is no
                margin for error — starting with the Ministry of Defence, and
                expanding into public sector bodies, central government
                departments, and India's largest FMCG companies.
              </Lead>
            </HeaderContent>
            <HeaderIcon>
              <Award size={220} strokeWidth={0.75} />
            </HeaderIcon>
          </HeaderInner>
        </Container>
      </Header>
      <Reveal>
        <SectorsWrapper>
          <Container>
            {sectors.map((sector) => (
              <SectorCard key={sector.documentId}>
                <SectorHeader>
                  <SectorTag>{sector.tag}</SectorTag>
                  <SectorName>{sector.name}</SectorName>
                </SectorHeader>

                <SectorBody>
                  <ClientsColumn>
                    {sector.clients && sector.clients.length > 0 && (
                      <ClientList>
                        {sector.clients.map((client) => (
                          <ClientItem key={client.id}>{client.text}</ClientItem>
                        ))}
                      </ClientList>
                    )}
                  </ClientsColumn>

                  {sector.rolesDeployed && sector.rolesDeployed.length > 0 && (
                    <RolesColumn>
                      <RolesLabel>Roles Deployed</RolesLabel>
                      <RolesList>
                        {sector.rolesDeployed.map((role) => (
                          <RoleChip key={role.id}>{role.name}</RoleChip>
                        ))}
                      </RolesList>
                    </RolesColumn>
                  )}
                </SectorBody>
              </SectorCard>
            ))}
          </Container>
        </SectorsWrapper>
      </Reveal>
      <Reveal>
        <CTASection
          heading="Your operation deserves proven capability."
          description="From defence establishments to corporate enterprises — we bring 25+ years of tested methodology to every deployment."
          buttonText="Get in Touch"
          buttonLink="/contact"
        />
      </Reveal>
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
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.grayDark};
  max-width: 680px;
`;

const SectorsWrapper = styled.section`
  padding: 0 0 ${({ theme }) => theme.spacing["3xl"]};
  background: ${({ theme }) => theme.colors.white};
`;

const SectorCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.grayLighter};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayLighter};
  background: ${({ theme }) => theme.colors.offWhite};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const SectorTag = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.primary};
  padding: 0.3rem 0.8rem;
`;

const SectorName = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.navy};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

const SectorBody = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ClientsColumn = styled.div``;

const ClientList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ClientItem = styled.li`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.charcoal};
  padding-left: ${({ theme }) => theme.spacing.md};
  position: relative;

  &::before {
    content: "›";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;

const RolesColumn = styled.div``;

const RolesLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const RolesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const RoleChip = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.grayDark};
  border: 1px solid ${({ theme }) => theme.colors.grayLighter};
  padding: 0.35rem 0.7rem;
  background: ${({ theme }) => theme.colors.offWhite};
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;
