"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Container } from "./Container";
import { useServicePillars } from "@/lib/queries";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", hasDropdown: true },
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const { data: pillars } = useServicePillars();
  const pathname = usePathname();

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
            {NAV_LINKS.map((link) =>
              link.hasDropdown && pillars && pillars.length > 0 ? (
                <DropdownWrap
                  key={link.href}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <NavLink
                    key={link.href}
                    href={link.href}
                    $isLight={isLight}
                    $active={pathname.startsWith("/services")}
                  >
                    {link.label}
                  </NavLink>
                  <Dropdown $open={servicesOpen}>
                    {pillars.map((pillar) => (
                      <DropdownLink
                        key={pillar.documentId}
                        href={`/services/${pillar.slug}`}
                      >
                        {pillar.name}
                      </DropdownLink>
                    ))}
                  </Dropdown>
                </DropdownWrap>
              ) : (
                <NavLink
                  key={link.href}
                  href={link.href}
                  $isLight={isLight}
                  $active={pathname === link.href}
                >
                  {link.label}
                </NavLink>
              ),
            )}
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
          <div key={link.href}>
            <MobileLink
              href={link.href}
              onClick={() => {
                if (link.hasDropdown) {
                  setServicesOpen(!servicesOpen);
                } else {
                  setMenuOpen(false);
                }
              }}
            >
              {link.label}
              {link.hasDropdown && <Chevron $open={servicesOpen}>›</Chevron>}
            </MobileLink>
            {link.hasDropdown && servicesOpen && pillars && (
              <MobileSubMenu>
                {pillars.map((pillar) => (
                  <MobileSubLink
                    key={pillar.documentId}
                    href={`/services/${pillar.slug}`}
                    onClick={() => {
                      setMenuOpen(false);
                      setServicesOpen(false);
                    }}
                  >
                    {pillar.name}
                  </MobileSubLink>
                ))}
              </MobileSubMenu>
            )}
          </div>
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

const DropdownWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Dropdown = styled.div<{ $open: boolean }>`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%)
    translateY(${({ $open }) => ($open ? "12px" : "4px")});
  min-width: 320px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  transition: all ${({ theme }) => theme.transitions.base};
  z-index: 200;

  /* invisible bridge so hover doesn't drop when moving into the menu */
  &::before {
    content: "";
    position: absolute;
    top: -14px;
    left: 0;
    right: 0;
    height: 14px;
  }
`;

const DropdownLink = styled(Link)`
  display: block;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.charcoal};
  transition: all ${({ theme }) => theme.transitions.base};
  border-left: 2px solid transparent;

  &:hover {
    background: ${({ theme }) => theme.colors.offWhite};
    color: ${({ theme }) => theme.colors.primary};
    border-left-color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavLink = styled(Link)<{ $isLight: boolean; $active?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ $isLight, $active, theme }) =>
    $active
      ? $isLight
        ? theme.colors.white
        : theme.colors.primary
      : $isLight
        ? "rgba(255, 255, 255, 0.85)"
        : theme.colors.charcoal};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  transition: color ${({ theme }) => theme.transitions.base};

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    width: ${({ $active }) => ($active ? "100%" : "0")};
    height: 1px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width ${({ theme }) => theme.transitions.base};
  }

  &:hover::after {
    width: 100%;
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
  max-height: ${({ $open }) => ($open ? "600px" : "0")};
  overflow: hidden;
  transition:
    max-height ${({ theme }) => theme.transitions.slow},
    padding ${({ theme }) => theme.transitions.slow};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    display: flex;
  }
`;

const MobileLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.charcoal};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayLighter};
`;

const Chevron = styled.span<{ $open: boolean }>`
  display: inline-block;
  transition: transform ${({ theme }) => theme.transitions.base};
  transform: rotate(${({ $open }) => ($open ? "90deg" : "0deg")});
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const MobileSubMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.offWhite};
`;

const MobileSubLink = styled(Link)`
  padding: ${({ theme }) => theme.spacing.sm} 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.grayDark};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayLighter};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
