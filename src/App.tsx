import React, { useState } from 'react';
import Countdown from 'react-countdown';
import { Task } from '@/lib/interfaces';
import CreateTaskForm from '@/components/tasks/CreateTaskForm';
import { useToast } from '@/components/ui/use-toast';

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

export default function App() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Deploy the Todo Today App!',
      description:
        'Complete the inital MVP with the export feature. Jot down any additional requirements as tickets to be completed later.',
    },
    { id: '2', title: 'Task 2', description: 'Description 2' },
    { id: '3', title: 'Task 3', description: 'Description 3' },
    { id: '4', title: 'Task 4', description: 'Description 4' },
  ]);

  const createTask = (title: string, description: string | null) => {
    const newTask: Task = {
      id: String(tasks.length + 1), // TODO: this should come from the database
      title,
      description,
    };

    setTasks([...tasks, newTask]);

    toast({ description: 'Task created!' });
  };

  return (
    <>
      {' '}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* <PomodoroTimer /> */}

          <CreateTaskForm onSubmit={createTask} />

          {/* Action Panel */}
          <div className="my-4 flex justify-end">
            <button className="btn btn-primary">Add</button>
          </div>

          <div className="card card-bordered shaodw-xl bg-base-100">
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
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.id}>
                        <th>{task.id}</th>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col items-center space-y-4 ">
            {!isAddingNewTask && (
              <AddTaskAction onClick={() => setIsAddingNewTask(true)} />
            )}
            {isAddingNewTask && <CreateTaskForm />}

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
