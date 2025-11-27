import { _posts } from 'src/_mock';
import { CONFIG } from 'src/config-global';

import { ClassDetailView } from 'src/sections/classdetail';

// ----------------------------------------------------------------------

export default function ClassDetailViewPage() {
  return (
    <>
      <title>{`Class Detail - ${CONFIG.appName}`}</title>

      <ClassDetailView />
    </>
  );
}
