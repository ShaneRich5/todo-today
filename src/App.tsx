import React, { useCallback, useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { AvailableStatus, Task } from '@/lib/interfaces';
import DeleteTaskModal from '@/components/tasks/DeleteTaskModal';
import CreateTaskModal from '@/components/tasks/CreateTaskModal';
import { useToast } from '@/components/ui/use-toast';
import { CSVLink } from 'react-csv';
import Calendar from '@/components/Calendar';
import { STATUS } from '@/lib/constants';
import { organizeTasksByStatus, truncate } from '@/lib/utils';
import {
  createTaskDocument,
  deleteTaskDocument,
  getTaskCollection,
  updateTaskDocument,
} from '@/lib/firebase';
import Navbar from './components/shared/Navbar';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Layout from './components/shared/Layout';

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

interface CountdownDisplayProps {
  minutes: number;
  seconds: number;
}

const CountdownDisplay: React.FC<CountdownDisplayProps> = ({
  minutes,
  seconds,
}) => (
  <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
    <div className="flex flex-col">
      <span className="countdown font-mono text-5xl">
        <span style={{ '--value': minutes }}></span>
      </span>
      min
    </div>
    <div className="flex flex-col">
      <span className="countdown font-mono text-5xl">
        <span style={{ '--value': seconds }}></span>
      </span>
      sec
    </div>
  </div>
);

const PomodoroTimer = () => {
  return (
    <div className="card card-bordered flex justify-center items-center py-10 mb-10 bg-slate-100">
      <Countdown
        date={Date.now() + 1500000}
        renderer={({ minutes, seconds, completed }) => {
          if (completed) {
            return <span>Time's up!</span>;
          } else {
            return <CountdownDisplay minutes={minutes} seconds={seconds} />;
          }
        }}
      />
      <button className="btn btn-outline mt-5 w-full max-w-40">Start</button>
    </div>
  );
};

const sampleCsvData = [
  ['firstname', 'lastname', 'email'],
  ['Ahmed', 'Tomi', 'ah@smthing.co.com'],
  ['Raed', 'Labes', 'rl@smthing.co.com'],
  ['Yezzi', 'Min l3b', 'ymin@cocococo.com'],
];

interface CreateMetaModalProps {
  onSubmit: (key: string) => void;
}

const CreateMetaModal: React.FC<CreateMetaModalProps> = ({ onSubmit }) => {
  const [key, setKey] = useState('');

  return (
    <dialog id="create-meta-modal" className="modal">
      <div className="modal-box">
        <div className="space-y-4">
          <label className="input input-bordered flex items-center gap-2">
            Key
            <input
              type="text"
              className="grow"
              placeholder="Used as the table column and header in the exports."
              onChange={(event) => setKey(event.target.value)}
            />
          </label>

          <button
            className="btn btn-primary w-full"
            onClick={() => onSubmit(key)}
          >
            Create
          </button>
        </div>

        <div className="modal-action mt-2">
          <form method="dialog" className="w-full">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn w-full">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<DashboardPage />} />
    </Route>
  </Routes>
);

export default App;
