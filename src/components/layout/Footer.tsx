"use client";

import Link from "next/link";
import styled from "styled-components";
import { Container } from "./Container";
import { useContactPage } from "@/lib/queries";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const { data: contact } = useContactPage();

  return (
    <FooterWrapper>
      <Container>
        <Grid>
          <Column>
            <Brand>Omkar Manpower</Brand>
            <Tagline>
              Your trusted partner in manpower and staffing solutions across
              India.
            </Tagline>
          </Column>

          <Column>
            <ColumnTitle>Quick Links</ColumnTitle>
            <LinkList>
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </LinkList>
          </Column>

          <Column>
            <ColumnTitle>Contact</ColumnTitle>
            <ContactInfo>
              {contact?.email && <li>{contact.email}</li>}
              {contact?.phone && <li>{contact.phone}</li>}
              {contact?.address && <li>{contact.address}</li>}
            </ContactInfo>
          </Column>
        </Grid>

        <Bottom>
          <Copyright>
            © {new Date().getFullYear()} Omkar Manpower Consultancy. All rights
            reserved.
          </Copyright>
        </Bottom>
      </Container>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.grayLight};
  padding: ${({ theme }) => theme.spacing["3xl"]} 0
    ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing["4xl"]};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: ${({ theme }) => theme.spacing["2xl"]};
  padding-bottom: ${({ theme }) => theme.spacing["2xl"]};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Brand = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Tagline = styled.p`
  color: ${({ theme }) => theme.colors.grayLight};
  max-width: 320px;
  line-height: 1.7;
`;

const ColumnTitle = styled.h4`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.grayLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: color ${({ theme }) => theme.transitions.base};

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const ContactInfo = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.grayLight};
  line-height: 1.6;
`;

const Bottom = styled.div`
  padding-top: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: center;
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;
