import TemplateCard from '../components/templates/TemplateCard';

const TaskTemplateListPage = () => {
  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <h1>Task Template List</h1>
      <div className="grid grid-cols-3 gap-4">
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
      </div>
    </div>
  );
};

export default TaskTemplateListPage;
