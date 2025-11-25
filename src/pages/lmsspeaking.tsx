import { CONFIG } from 'src/config-global';

import { LMSSpeakingView } from 'src/sections/lmsspeaking';

// ----------------------------------------------------------------------

export default function LMSSpeakingPage() {
  return (
    <>
      <title>{`404 page not found! | Error - ${CONFIG.appName}`}</title>

      <LMSSpeakingView/>
    </>
  );
}
