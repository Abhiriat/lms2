import { CONFIG } from 'src/config-global';

import { QuizView } from 'src/sections/quiz';

// ----------------------------------------------------------------------

export default function QuizPage() {
  return (
    <>
      <title>{`404 page not found! | Error - ${CONFIG.appName}`}</title>
<QuizView/>
      
    </>
  );
}
