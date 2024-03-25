import { AvailableStatus } from '@/lib/interfaces';

interface StatusBadgeProps {
  status: AvailableStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  if (status === 'completed') {
    return <div className="badge badge-success">Completed</div>;
  }

  if (status === 'in-progress') {
    return <div className="badge badge-info">In Progress</div>;
  }

  return <div className="badge">To Do</div>;
};

export default StatusBadge;
