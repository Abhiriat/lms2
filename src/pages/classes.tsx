import { _posts } from 'src/_mock';
import { CONFIG } from 'src/config-global';

import { ClassesView } from 'src/sections/classes';

// ----------------------------------------------------------------------

export default function ClassesViewPage() {
  return (
    <>
      <title>{`Classes - ${CONFIG.appName}`}</title>

      <ClassesView />
    </>
  );
}
