import Layout from '@/commonComponent/layout';
import { routersData } from '@/config';
import AdminManage from '@/pages/adminManage';
import CorretExam from '@/pages/corretExam';
import CorretExamList from '@/pages/corretExamList';
import Exam from '@/pages/exam';
import ExamHistory from '@/pages/examHistory';
import ExamSelect from '@/pages/examSelect';
import FilePreview from '@/pages/filePreview';
import Login from '@/pages/login';
import PersonInfo from '@/pages/personInfo';
import ReadExam from '@/pages/readExam';
import StudentManage from '@/pages/studentManage';
import SubjectAdd from '@/pages/subjectAdd';
import SubjectManage from '@/pages/subjectManage';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
      <Route element={<Layout />}>
        <Route path={routersData.login.path} element={<Login />} />
        <Route path={routersData.adminManage.path} element={<AdminManage />} />
        <Route path={routersData.corretExam.path} element={<CorretExam />} />
        <Route path={routersData.corretExamList.path} element={<CorretExamList />} />
        <Route path={routersData.exam.path} element={<Exam />} />
        <Route path={routersData.examHistory.path} element={<ExamHistory />} />
        <Route path={routersData.examSelect.path} element={<ExamSelect />} />
        <Route path={routersData.personInfo.path} element={<PersonInfo />} />
        <Route path={routersData.readExam.path} element={<ReadExam />} />
        <Route path={routersData.studentManage.path} element={<StudentManage />} />
        <Route path={routersData.subjectManage.path} element={<SubjectManage />} />
        <Route path={routersData.subjectAdd.path} element={<SubjectAdd />} />
        <Route path={routersData.filePreview.path} element={<FilePreview />} />
        <Route path="/*" element={<Navigate to={routersData.login.path} replace />} />
      </Route>
      {/* <Route path="/login" element={<Login />} />    */}
       </Routes>
  );
}
export default App;
