import { CONFIG } from 'src/config-global';

import { TeacherStudentListView } from 'src/sections/teacherstudent';

// ----------------------------------------------------------------------

export default function TeacherStudentListPage() {
  return (
    <>
      <title>{`404 page not found! | Error - ${CONFIG.appName}`}</title>
<TeacherStudentListView/>
      
    </>
  );
}
