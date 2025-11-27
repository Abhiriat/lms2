import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const Blog2Page = lazy(() => import('src/pages/blog2'));
export const StudentDashboardPage = lazy(() => import('src/pages/studentdashboard'));
export const TeacherPage = lazy(() => import('src/pages/teacherdashboard'));
export const TeacherStudentListPage = lazy(() => import('src/pages/teacherstudent'));
export const InstructorListPage = lazy(() => import('src/pages/instructors'));
export const QuizInterfacePage = lazy(() => import('src/pages/quizinterface'));
export const StudentListPage =lazy(()=> import('src/pages/studentlist'))
export const LMSPage =lazy(()=> import('src/pages/lms'))
export const LMSSpeakingPage =lazy(()=> import('src/pages/lmsspeaking'))
export const LMSWritingPage =lazy(()=> import('src/pages/lmswriting'))
export const QuizResultPage =lazy(()=> import('src/pages/quizresult'))
export const QuizDetailResultViewPage =lazy(()=> import('src/pages/quizdetailresultview'))
export const QuizSuccessPage = lazy(() => import('src/pages/quizsuccess'));
export const CoursesPage = lazy(() => import('src/pages/courses'));
export const QuizPage = lazy(() => import('src/pages/quiz'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ClassesViewPage = lazy(() => import('src/pages/classes'));
export const ClassDetailViewPage = lazy(() => import('src/pages/classdetail'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const IntroLmsPage = lazy(() => import('src/pages/introlms'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { path: 'admindashboard', element: <DashboardPage /> },
      { path: 'studentdashboard', element: <StudentDashboardPage/> },
      { path: 'teacherdashboard', element: <TeacherPage/> },
      { path: 'teacherstudent', element: <TeacherStudentListPage/> },
      { path: 'lmsintropage', element: <IntroLmsPage/> },
      { path: 'studentlist', element: <StudentListPage/> },
      { path: 'instructorlist', element: <InstructorListPage/> },
      { path: 'classview', element: <ClassesViewPage/> },
      { path: 'classdetail', element: <ClassDetailViewPage/> },
      { path: 'quizresult', element: <QuizResultPage/> },
      { path: 'quizdetailresultview/:id', element: <QuizDetailResultViewPage /> },
      { path: 'lmspage', element: <LMSPage/> },
      { path: 'lmsspeaking', element: <LMSSpeakingPage/> },
      { path: 'lmswriting', element: <LMSWritingPage/> },
      { path: 'quizinterface', element: <QuizInterfacePage/> },
      { path: 'quizsuccess', element: <QuizSuccessPage/> },
      { path: 'courses', element: <CoursesPage/> },
      { path: 'quiz', element: <QuizPage/> },
      { path: 'user', element: <UserPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'blog', element: <Blog2Page /> },
      { path: 'blog2', element: <Blog2Page /> },

    ],
  },
  {
    index:true,
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
