import { CONFIG } from 'src/config-global';

import { InstructorsListView } from 'src/sections/instructors';

// ----------------------------------------------------------------------

export default function InstructorListPage() {
  return (
    <>
      <title>{`404 page not found! | Error - ${CONFIG.appName}`}</title>
<InstructorsListView/>
      
    </>
  );
}
