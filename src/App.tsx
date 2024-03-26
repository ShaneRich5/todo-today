import { Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Layout from './components/shared/Layout';
import ProjectListPage from './pages/TaskTemplateListPage';

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/templates" element={<ProjectListPage />} />
    </Route>
  </Routes>
);

export default App;
