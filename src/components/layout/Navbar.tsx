"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Container } from "./Container";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  const isLight = transparent && !scrolled;

  return (
    <Nav $solid={!isLight}>
      <Container>
        <Inner>
          <Logo href="/">
            <Image
              src={isLight ? "/img/logo-white.png" : "/img/logo.png"}
              alt="Omkar Manpower"
              width={160}
              height={40}
              priority
            />
          </Logo>

          <DesktopLinks>
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} $isLight={isLight}>
                {link.label}
              </NavLink>
            ))}
          </DesktopLinks>

          <CTAButton href="/contact">Get in Touch</CTAButton>

          <MobileToggle
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            $isLight={isLight}
          >
            <span />
            <span />
            <span />
          </MobileToggle>
        </Inner>
      </Container>

      <MobileMenu $open={menuOpen}>
        {NAV_LINKS.map((link) => (
          <MobileLink
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </MobileLink>
        ))}
      </MobileMenu>
    </Nav>
  );
}

const Nav = styled.nav<{ $solid: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: all ${({ theme }) => theme.transitions.base};

  ${({ $solid, theme }) =>
    $solid
      ? css`
          background: ${theme.colors.white};
          box-shadow: ${theme.shadows.md};
        `
      : css`
          background: transparent;
        `}
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const DesktopLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $isLight: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ $isLight, theme }) =>
    $isLight ? "rgba(255, 255, 255, 0.85)" : theme.colors.charcoal};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  transition: color ${({ theme }) => theme.transitions.base};

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width ${({ theme }) => theme.transitions.base};
  }

  &:hover {
    color: ${({ $isLight, theme }) =>
      $isLight ? theme.colors.white : theme.colors.primary};
    &::after {
      width: 100%;
    }
  }
`;

const CTAButton = styled(Link)`
  padding: 0.75rem 1.75rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    display: none;
  }
`;

const MobileToggle = styled.button<{ $isLight: boolean }>`
  display: none;
  flex-direction: column;
  gap: 5px;

  span {
    width: 24px;
    height: 2px;
    background: ${({ $isLight, theme }) =>
      $isLight ? theme.colors.white : theme.colors.navy};
    transition: background ${({ theme }) => theme.transitions.base};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    display: flex;
  }
`;

const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ $open, theme }) =>
    $open ? theme.spacing.lg : "0 " + theme.spacing.lg};
  border-top: ${({ $open, theme }) =>
    $open ? "1px solid " + theme.colors.grayLighter : "none"};
  max-height: ${({ $open }) => ($open ? "400px" : "0")};
  overflow: hidden;
  transition:
    max-height ${({ theme }) => theme.transitions.slow},
    padding ${({ theme }) => theme.transitions.slow};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    display: flex;
  }
`;

const MobileLink = styled(Link)`
  padding: ${({ theme }) => theme.spacing.sm} 0;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.charcoal};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayLighter};

  &:last-child {
    border-bottom: none;
  }
`;
