// src/layouts/dashboard/DashboardLayout.tsx
import type { Breakpoint } from '@mui/material/styles';

import { merge } from 'es-toolkit';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { _langs, _notifications } from 'src/_mock';

import { NavMobile, NavDesktop } from './nav';
import { layoutClasses } from '../core/classes';
import { _account } from '../nav-config-account';
import { dashboardLayoutVars } from './css-vars';
import { useNavData } from '../nav-config-dashboard';
import { MainSection } from '../core/main-section';
import { Searchbar } from '../components/searchbar';
import { _workspaces } from '../nav-config-workspace';
import { MenuButton } from '../components/menu-button';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { AccountPopover } from '../components/account-popover';
import { LanguagePopover } from '../components/language-popover';
import { NotificationsPopover } from '../components/notifications-popover';

// Icons (replace with your actual icon component, e.g. Iconify)
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import type { MainSectionProps } from '../core/main-section';
import type { HeaderSectionProps } from '../core/header-section';
import type { LayoutSectionProps } from '../core/layout-section';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type DashboardLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    main?: MainSectionProps;
  };
};

export function DashboardLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'lg',
}: DashboardLayoutProps) {
  const theme = useTheme();

  const navData = useNavData();

  // Mobile nav
  const { value: openMobile, onTrue: onOpenMobile, onFalse: onCloseMobile } = useBoolean();

  // Collapsible sidebar state (you can persist it if you want)
  const { value: collapsed, onToggle: toggleCollapsed } = useBoolean(false);

  // Optional: persist collapsed state
  // useEffect(() => {
  //   localStorage.setItem('sidebar-collapsed', String(collapsed));
  // }, [collapsed]);

  // useEffect(() => {
  //   const saved = localStorage.getItem('sidebar-collapsed');
  //   if (saved !== null) toggleCollapsed(saved === 'true');
  // }, []);

  const renderHeader = () => {
    const headerSlotProps: HeaderSectionProps['slotProps'] = {
      container: { maxWidth: false },
    };

    const headerSlots: HeaderSectionProps['slots'] = {
      topArea: (
        <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
          This is an info Alert.
        </Alert>
      ),
      leftArea: (
        <>
          {/* Mobile menu button */}
          <MenuButton
            onClick={onOpenMobile}
            sx={{
              mr: 1,
              ml: -1,
              [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
            }}
          />
          <NavMobile
            data={navData}
            open={openMobile}
            onClose={onCloseMobile}
            workspaces={_workspaces}
          />

          {/* Collapse toggle button - Desktop only */}
          <Tooltip title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            <IconButton
              onClick={toggleCollapsed}
              sx={{
                display: { xs: 'none', [layoutQuery]: 'flex' },
                ml: -1,
                color: 'text.secondary',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Tooltip>
        </>
      ),
      rightArea: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 0.75 } }}>
          {/* <Searchbar /> */}
          <LanguagePopover />
          <NotificationsPopover data={_notifications} />
          <AccountPopover data={_account} />
        </Box>
      ),
    };

    return (
      <HeaderSection
        disableElevation
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderFooter = () => null;

  const renderMain = () => (
    <MainSection {...slotProps?.main}>{children}</MainSection>
  );
  const NavDesktopAny = NavDesktop as unknown as any;

  return (
    <LayoutSection
      /** Header */
      headerSection={renderHeader()}
      /** Sidebar - Collapsible */
      sidebarSection={
        <NavDesktopAny
          data={navData}
          layoutQuery={layoutQuery}
          workspaces={_workspaces}
          collapsed={collapsed}
          onToggleCollapse={toggleCollapsed} // optional: allow items to collapse too
        />
      }
      /** Footer */
      footerSection={renderFooter()}
      /** Global CSS Vars - Dynamic width */
      cssVars={{
        ...dashboardLayoutVars(theme),
        '--layout-nav-vertical-width': collapsed ? '95px' : '280px',
        '--layout-nav-vertical-width-collapsed': '95px',
        '--layout-nav-vertical-width-expanded': '280px',
        ...cssVars,
      }}
      /** Smooth main content shift when sidebar collapses */
      sx={[
        {
          [`& .${layoutClasses.sidebarContainer}`]: {
            [theme.breakpoints.up(layoutQuery)]: {
              pl: 'var(--layout-nav-vertical-width)',
              transition: theme.transitions.create(['padding-left'], {
                easing: 'var(--layout-transition-easing)',
                duration: 'var(--layout-transition-duration)',
              }),
            },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {renderMain()}
    </LayoutSection>
  );
}