import type { LinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { RouterLink } from 'src/routes/components';
import { mergeClasses } from 'minimal-shared/utils';
import { logoClasses } from './classes';

// Replace this path with your actual logo location
import MyLogo from '../../../public/assets/Logo.png'; // ← YOUR LOGO HERE
// Or if it's SVG:
// import MyLogo from '../../../public/assets/logo.svg';

// ----------------------------------------------------------------------

export type LogoProps = LinkProps & {
  disabled?: boolean;
};

export function Logo({
  sx,
  disabled,
  className,
  href = '/',
  ...other
}: LogoProps) {
  return (
    <LogoRoot
      component={RouterLink}
      href={href}
      aria-label="Home"
      underline="none"
      className={mergeClasses([logoClasses.root, className])}
      sx={[
        {
           width: 50,
                height: 50,
                // mt:2,
                mb:2,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...(disabled && { pointerEvents: 'none', opacity: 0.48 }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <img
        src={MyLogo}
        alt="My Logo"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </LogoRoot>
  );
}

const LogoRoot = styled(Link)(() => ({
  flexShrink: 0,
  display: 'inline-flex',
}));