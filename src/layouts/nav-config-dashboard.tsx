import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';
import { useUserRole } from 'src/context/UserRoleContext';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const useNavData = (): NavItem[] => {
  const { role } = useUserRole();

  const commonItems: NavItem[] = [
    {
      title: 'Courses',
      path: '/courses',
      icon: icon('ic-blog'),
    },
    {
      title: 'User',
      path: '/user',
      icon: icon('ic-user'),
    },
    {
      title: 'Students',
      path: '/studentlist',
      icon: icon('ic-blog'),
    },
    {
      title: 'Product',
      path: '/products',
      icon: icon('ic-cart'),
      info: (
        <Label color="error" variant="inverted">
          +3
        </Label>
      ),
    },
    {
      title: 'Blog',
      path: '/blog',
      icon: icon('ic-blog'),
    },
    {
      title: 'Sign in',
      path: '/sign-in',
      icon: icon('ic-lock'),
    },
    {
      title: 'Not found',
      path: '/404',
      icon: icon('ic-disabled'),
    },
  ];

  if (role === 'student') {
    return [
      {
        title: 'Student Dashboard',
        path: '/studentdashboard',
        icon: icon('ic-analytics'),
      },
       {
      title: 'Quiz',
      path: '/quiz',
      icon: icon('ic-sharp-quiz'),
    },
     {
      title: 'Courses',
      path: '/courses',
      icon: icon('ic-course'),
    },
    {
      title: 'Classes',
      path: '/classview',
      icon: icon('ic-class'),
    },
      
    ];
  }else if(role==='teacher'){
    return[{
        title: 'Teacher Dashboard',
        path: '/teacherdashboard',
        icon: icon('ic-analytics'),
      }, {
      title: 'Students',
      path: '/teacherstudent',
      icon: icon('ic-student'),
    },]
  }

  return [
    {
      title: 'Dashboard',
      path: '/admindashboard',
      icon: icon('ic-analytics'),
    },
    {
      title: 'Students',
      path: '/studentlist',
      icon: icon('ic-student'),
    },
     {
      title: 'Instructors',
      path: '/instructorlist',
      icon: icon('ic-instructor'),
    },
     {
      title: 'Quiz Result',
      path: '/quizresult',
      icon: icon('ic-result'),
    },
  ];
};