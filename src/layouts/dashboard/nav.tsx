import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useEffect, useState } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronRight from '@mui/icons-material/ChevronRight';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';

import type { NavItem } from '../nav-config-dashboard';
import type { WorkspacesPopoverProps } from '../components/workspaces-popover';

// ----------------------------------------------------------------------

export type NavContentProps = {
  data: NavItem[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  workspaces: WorkspacesPopoverProps['data'];
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  slots,
  workspaces,
  layoutQuery,
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 2.5,
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        bgcolor: '#173345',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        borderRight: `2px dashed ${varAlpha(theme.vars.palette.grey['500Channel'], 0.3)}`,
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
  workspaces,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
          bgcolor:'#173345'
        },
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

// Single nav item (with optional children)
function NavItemComponent({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const active = item.path ? item.path === pathname : false;
  const hasChildren = !!item.children?.length;

  const handleToggle = () => {
    if (hasChildren) setOpen((prev) => !prev);
  };

  return (
    <>
      <ListItem disableGutters disablePadding>
        <ListItemButton
          disableGutters
          component={item.path && !hasChildren ? RouterLink : 'div'}
          href={item.path && !hasChildren ? item.path : undefined}
          onClick={handleToggle}
          sx={[
            (theme) => ({
              pl: 2,
              py: 1,
              gap: 2,
              pr: 1.5,
              borderRadius: 0.75,
              typography: 'body2',
              fontWeight: 'fontWeightMedium',
              color: 'white',
              minHeight: 44,
              ...(active && {
                fontWeight: 'fontWeightSemiBold',
                bgcolor: varAlpha('white', 0.08),
                '&:hover': { bgcolor: varAlpha('white', 0.16) },
              }),
              ...(hasChildren && {
                '&:hover': { bgcolor: varAlpha('white', 0.08) },
              }),
            }),
          ]}
        >
          <Box component="span" sx={{ width: 24, height: 24 }}>
            {item.icon}
          </Box>

          <Box component="span" sx={{ flexGrow: 1 }}>
            {item.title}
          </Box>

          {hasChildren && (
            <Box component="span" sx={{ transition: 'transform 0.2s' }}>
              {open ? <ExpandMore /> : <ChevronRight />}
            </Box>
          )}

          {item.info && item.info}
        </ListItemButton>
      </ListItem>

      {/* Submenu */}
      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ pl: 2 }}>
            {item.children!.map((child) => (
              <ListItem disableGutters disablePadding key={child.title}>
                <ListItemButton
                  component={RouterLink}
                  href={child.path}
                  sx={[
                    (theme) => ({
                      py: 0.95,
                      gap: 2,
                      borderRadius: 0.75,
                      typography: 'body2',
                      color: child.path === pathname ? 'white' : 'white',
                      fontWeight: child.path === pathname ? 'fontWeightSemiBold' : 'normal',
                      '&:hover': {
                        bgcolor: varAlpha('white', 0.08),
                      },
                    }),
                  ]}
                >
                  {child.icon && (
                    <Box component="span" sx={{ width: 20, height: 20, mr: 1 }}>
                      {child.icon}
                    </Box>
                  )}
                  <Box component="span">{child.title}</Box>
                </ListItemButton>
              </ListItem>
            ))}
          </Box>
        </Collapse>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

export function NavContent({ data, slots, workspaces, sx }: NavContentProps) {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Logo />
      </Box>

      {slots?.topArea}

      <Scrollbar fillContent>
        <Box
          component="nav"
          sx={[
            {
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          <Box component="ul" sx={{ gap: 0.5, display: 'flex', flexDirection: 'column' }}>
            {data.map((item) => (
              <NavItemComponent key={item.title} item={item} />
            ))}
          </Box>
        </Box>
      </Scrollbar>

      <Box
        sx={{
          mt: 'auto',
          py: 2.5,
          textAlign: 'center',
          borderTop: (theme) => `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
          color: 'grey.500',
          fontSize: '0.75rem',
        }}
      >
        Developed by{' '}
        <Box component="span" sx={{ fontWeight: 600, color: 'white' }}>
          Team Mera Pind
        </Box>
      </Box>

      {slots?.bottomArea}
    </>
  );
}