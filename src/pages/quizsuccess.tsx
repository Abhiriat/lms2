import { CONFIG } from 'src/config-global';

import { QuizSuccess } from 'src/sections/quiz/quizsuccess';
// ----------------------------------------------------------------------

export default function QuizSuccessPage() {
  return (
    <>
      <title>{`Quiz Success | ${CONFIG.appName}`}</title>
      <QuizSuccess />
    </>
  );
}