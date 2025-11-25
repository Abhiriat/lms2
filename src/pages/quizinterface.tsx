import { CONFIG } from 'src/config-global';

import { QuizInterface } from 'src/sections/quiz/quizinterface';
// ----------------------------------------------------------------------

export default function QuizInterfacePage() {
  return (
    <>
      <title>{`Quiz Interface | ${CONFIG.appName}`}</title>
      <QuizInterface />
    </>
  );
}