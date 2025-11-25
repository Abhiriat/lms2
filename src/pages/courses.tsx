import { CONFIG } from 'src/config-global';

import { CoursesView } from 'src/sections/courses';

// ----------------------------------------------------------------------

export default function CoursesPage() {
  return (
    <>
      <title>{`404 page not found! | Error - ${CONFIG.appName}`}</title>
<CoursesView/>
      
    </>
  );
}
