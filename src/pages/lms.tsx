import { CONFIG } from 'src/config-global';

import { LMSView } from 'src/sections/lms';

// ----------------------------------------------------------------------

export default function LMSPage() {
  return (
    <>
      <title>{`404 page not found! | Error - ${CONFIG.appName}`}</title>

      <LMSView/>
    </>
  );
}
