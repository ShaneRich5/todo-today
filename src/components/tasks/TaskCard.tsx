import { Task } from '../../lib/interfaces';

interface TaskCardProp {
  task: Task;
}

const TaskCard: React.FC<TaskCardProp> = ({ task }) => {
  return (
    <div className="card card-bordered bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{task.title}</h2>
        <p>{task.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">View</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
