import { _posts } from 'src/_mock';
import { CONFIG } from 'src/config-global';

import { AssignmentView } from 'src/sections/assignments';

// ----------------------------------------------------------------------

export default function AssignmentViewPage() {
  return (
    <>
      <title>{`Assignment - ${CONFIG.appName}`}</title>

      <AssignmentView />
    </>
  );
}
