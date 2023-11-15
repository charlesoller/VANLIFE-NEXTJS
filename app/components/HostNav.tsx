"use client"

import { Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';

import { usePathname } from 'next/navigation';

import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconMessageDots,
  IconSettings,
  IconLogout
} from '@tabler/icons-react';
import classes from '../modules/HostNav.module.css'

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
  path?: string;
}

function NavbarLink({ icon: Icon, label, active, onClick, path }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined} component='a' href={path}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const pages = [
  { icon: IconHome2, label: 'Dashboard', path:'/host' },
  { icon: IconGauge, label: 'Manage Listings', path:'/host/create-listing' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics', path: '/host/income' },
  { icon: IconMessageDots, label: 'Reviews', path: '/host/reviews'},
  { icon: IconSettings, label: 'Settings', path: '/' }
];

export default function HostNav() {
  const pathName = usePathname();

  const links = pages.map(link => (
    <NavbarLink
      {...link}
      key={link.label}
      active={pathName === link.path}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconLogout} label="Logout" />
      </Stack>
    </nav>
  );
}
