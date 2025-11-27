import { _posts } from 'src/_mock';
import { CONFIG } from 'src/config-global';

import { LMSIntroView } from 'src/sections/lmsintro';

// ----------------------------------------------------------------------

export default function IntroLmsPage() {
  return (
    <>
      <title>{`Blog - ${CONFIG.appName}`}</title>

      <LMSIntroView />
    </>
  );
}
