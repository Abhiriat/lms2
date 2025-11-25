import { CONFIG } from 'src/config-global';

import { LMSWritingView } from 'src/sections/lmswriting';

// ----------------------------------------------------------------------

export default function LMSWritingPage() {
  return (
    <>
      <title>{`404 page not found! | Error - ${CONFIG.appName}`}</title>

      <LMSWritingView/>
    </>
  );
}
