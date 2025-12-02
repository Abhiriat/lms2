import { CONFIG } from 'src/config-global';

import { TeacherDetailView } from 'src/sections/teacherdetail';

// ----------------------------------------------------------------------

export default function TeacherDetailViewPage() {
  return (
    <>
      <title>{`Quiz Result Details |${CONFIG.appName}`}</title>
<TeacherDetailView/>
      
    </>
  );
}
