import { CONFIG } from 'src/config-global';

import { QuizResultView } from 'src/sections/quizresult';

// ----------------------------------------------------------------------

export default function QuizResultPage() {
  return (
    <>
      <title>{`404 page not found! | Error - ${CONFIG.appName}`}</title>
<QuizResultView/>
      
    </>
  );
}
