import authProvider from '../../Component/authProvider';
import dataProvider from '../../Component/dataProvider ';
import { Admin, Resource } from 'react-admin';
import ListQuestion from '../../Component/questions/listQuestions';
import CreatQuestion from '../../Component/questions/creatQuestion';
import EditQuestion from '../../Component/questions/editQuestion';
import CreateType from '../../Component/types/createType';
import ListType from '../../Component/types/listTypes';
import EditType from '../../Component/types/editType';
import ListCode from '../../Component/students/listCode';
import EditCode from '../../Component/students/editCode';
import GeneratCode from '../../Component/students/generateCode';
import ListScore from '../../Component/students/listScore';
import QuizIcon from '@mui/icons-material/Quiz';
import AbcIcon from '@mui/icons-material/Abc';
import CodeIcon from '@mui/icons-material/Code';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import Login from './login';
import Home from './homepage';

function DashboardAdmin() {
  return (
    <div className="Admin">
      <Admin
        dashboard={Home}
        basename="/admin"
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={Login}
        title="my page title"
        requireAuth
      >
        <Resource
          icon={QuizIcon}
          name="question"
          list={ListQuestion}
          edit={EditQuestion}
          create={CreatQuestion}
          options={{ label: 'Questiones' }}
        />
        <Resource
          icon={AbcIcon}
          name="type"
          list={ListType}
          edit={EditType}
          create={CreateType}
          options={{ label: 'Types' }}
        />
        <Resource
          icon={CodeIcon}
          name="student-code"
          list={ListCode}
          edit={EditCode}
          create={GeneratCode}
          options={{ label: 'Students Codes' }}
        />
        <Resource
          icon={ScoreboardIcon}
          name="student-code/student-results"
          list={ListScore}
          options={{ label: 'Resultes' }}
        />
      </Admin>
    </div>
  );
}

export default DashboardAdmin;
