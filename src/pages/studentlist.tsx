import { CONFIG } from 'src/config-global';

import { StudentListView } from 'src/sections/student';

// ----------------------------------------------------------------------

export default function StudentListPage() {
  return (
    <>
      <title>{`404 page not found! | Error - ${CONFIG.appName}`}</title>
<StudentListView/>
      
    </>
  );
}
