import { CONFIG } from 'src/config-global';

import { QuizDetailResultView } from 'src/sections/quizresult/quizdetailresult';

// ----------------------------------------------------------------------

export default function QuizDetailResultViewPage() {
  return (
    <>
      <title>{`Quiz Result Details |${CONFIG.appName}`}</title>
<QuizDetailResultView/>
      
    </>
  );
}
