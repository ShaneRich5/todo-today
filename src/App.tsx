import React, { useState } from 'react';
import Countdown from 'react-countdown';
import { Task } from '@/lib/interfaces';
import CreateTaskModal from '@/components/tasks/CreateTaskModal';
import { useToast } from '@/components/ui/use-toast';
import { CSVLink, CSVDownload } from 'react-csv';
import Calendar from './components/Calendar';

const TaskCard = () => {
  return (
    <div className="card w-96 bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">Card title!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn">Buy Now</button>
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

const sampleTasks = [
  {
    id: '1',
    title: 'Deploy the Todo Today App!',
    description:
      'Complete the inital MVP with the export feature. Jot down any additional requirements as tickets to be completed later.',
  },
  { id: '2', title: 'Task 2', description: 'Description 2' },
];

export default function App() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [metas, setMetas] = useState<string[]>([]);

  const createMeta = (key: string) => {
    setMetas([...metas, key]);
    document.getElementById('create-meta-modal')?.close();
    toast({ description: `Add meta: ${key}` });
  };

  const createTask = (
    title: string,
    description: string | null,
    taskMeta: { [key: string]: string }
  ) => {
    const newTask: Task = {
      id: String(tasks.length + 1), // TODO: this should come from the database
      title,
      description,
      meta: taskMeta,
    };

    setTasks([...tasks, newTask]);

    document.getElementById('create-task-modal')?.close();

    toast({ description: 'Task created!' });
  };

  const parseMetaFromTask = (task: Task, meta: string) => {
    console.log(task, meta);
    if (task.meta && task.meta[meta]) {
      return task.meta[meta];
    }
    return null;
  };

  return (
    <>
      {' '}
      <header className="shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Todo Today
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* <PomodoroTimer /> */}

          <CreateMetaModal onSubmit={createMeta} />
          <CreateTaskModal onSubmit={createTask} metas={metas} />

          {/* Action Panel */}
          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="flex space-x-2">
                <CSVLink data={sampleCsvData}>
                  <button className="btn btn-primary">Export</button>
                </CSVLink>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    document.getElementById('create-meta-modal')?.showModal()
                  }
                >
                  Add Meta
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    document.getElementById('create-task-modal')?.showModal()
                  }
                >
                  Add Task
                </button>
              </div>
            </div>

            <div className="card card-bordered bg-base-100">
              <div className="card-body">
                <h2 className="card-title">Project A</h2>
                {/* May need to move this out out of card-body */}
                <div className="overflow-x-auto -mx-8">
                  <table className="table table-zebra">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Description</th>
                        {metas.map((meta) => (
                          <th key={meta}>{meta}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task) => (
                        <tr key={task.id}>
                          <th>{task.id}</th>
                          <td>{task.title}</td>
                          <td>{task.description}</td>
                          {metas.map((meta) => (
                            <td key={`task-${meta}`}>
                              {parseMetaFromTask(task, meta)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="card card-bordered bg-base-100">
              <Calendar />
            </div>
          </div>

          {/* <div className="flex flex-col items-center space-y-4 ">
            {!isAddingNewTask && (
              <AddTaskAction onClick={() => setIsAddingNewTask(true)} />
            )}
            {isAddingNewTask && <CreateTaskModal />}

            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </div> */}
        </div>
      </main>
    </>
  );
}
