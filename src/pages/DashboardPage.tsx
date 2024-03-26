import React, { useCallback, useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { AvailableStatus, Task } from '@/lib/interfaces';
import DeleteTaskModal from '@/components/tasks/DeleteTaskModal';
import CreateTaskModal from '@/components/tasks/CreateTaskModal';
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
import TaskCard from '../components/tasks/TaskCard';

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

const DashboardPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [metas, setMetas] = useState<string[]>([]);
  const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  const fetchTaskList = useCallback(async () => {
    const results = await getTaskCollection();
    setTasks(results.docs.map((doc) => doc.data()));
  }, []);

  useEffect(() => {
    fetchTaskList();
  }, []);

  const handleCreatingNewMeta = (key: string) => {
    setMetas([...metas, key]);
    document.getElementById('create-meta-modal')?.close();
    console.log({ description: `Add meta: ${key}` });
  };

  const handleCreatingNewTask = (
    title: string,
    description: string | null,
    taskMeta: { [key: string]: string }
  ) => {
    const newTask: Task = {
      id: String(tasks.length + 1), // TODO: this should come from the database
      title,
      description,
      meta: taskMeta,
      status: STATUS.TODO,
    };

    createTaskDocument(newTask);
    fetchTaskList();

    document.getElementById('create-task-modal')?.close();

    console.log({ description: 'Task created!' });
  };

  const handleTaskDeletion = useCallback(async () => {
    if (!taskIdToDelete) {
      console.log({ description: 'No task selected to delete' });
    } else {
      await deleteTaskDocument(taskIdToDelete);
      await fetchTaskList();
    }

    document.getElementById('delete-task-modal')?.close();
  }, [taskIdToDelete]);

  const handleTaskStatusChange = useCallback(
    async (task: Task, status: AvailableStatus) => {
      const updatedTask = {
        ...task,
        status,
      };

      await updateTaskDocument(updatedTask);
      await fetchTaskList();

      console.log({ description: 'Task status updated!' });
    },
    []
  );

  const parseMetaFromTask = (task: Task, meta: string) => {
    console.log(task, meta);
    if (task.meta && task.meta[meta]) {
      return task.meta[meta];
    }
    return null;
  };

  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      {/* <PomodoroTimer /> */}

      <CreateMetaModal onSubmit={handleCreatingNewMeta} />
      <CreateTaskModal onSubmit={handleCreatingNewTask} metas={metas} />
      <DeleteTaskModal
        onConfirm={() => handleTaskDeletion()}
        onCancel={() => document.getElementById('delete-task-modal')?.close()}
      />

      {/* Action Panel */}
      <div className="space-y-4">
        <div className="flex justify-end">
          <div className="flex space-x-2">
            <CSVLink data={sampleCsvData}>
              <button className="btn btn-outline btn-sm">Export</button>
            </CSVLink>
            <button
              className="btn btn-outline btn-sm"
              onClick={() =>
                document.getElementById('create-meta-modal')?.showModal()
              }
            >
              Add Meta
            </button>
            <button
              className="btn btn-outline btn-sm"
              onClick={() =>
                document.getElementById('create-task-modal')?.showModal()
              }
            >
              Add Task
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {tasks
            .filter((task) => task.status === 'in-progress')
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </div>

        <div className="card card-bordered bg-base-100">
          <div className="card-body">
            <div className="-ml-5 flex justify-between">
              <h2 className="card-title text-md ">Tasks</h2>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">Show Completed</span>
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={showCompletedTasks}
                    onChange={(event) =>
                      setShowCompletedTasks(event.target.checked)
                    }
                  />
                </label>
              </div>
            </div>
            {/* May need to move this out out of card-body */}
            <div className="overflow-x-auto -mx-8">
              <table className="table table-zebra table-sm">
                {/* head */}
                <thead>
                  <tr>
                    <th>Actions</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th className="w-44 text-center">Status</th>
                    {metas.map((meta) => (
                      <th key={meta}>{meta}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tasks.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No tasks added yet
                      </td>
                    </tr>
                  )}
                  {organizeTasksByStatus(tasks)
                    .filter(
                      (task) =>
                        showCompletedTasks ||
                        (!showCompletedTasks &&
                          task.status !== STATUS.COMPLETED)
                    )
                    .map((task) => (
                      <tr key={task.id}>
                        <th className="w-44">
                          <div className="space-x-2">
                            <button className="btn btn-sm btn-primary">
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline"
                              onClick={() => {
                                document
                                  .getElementById('delete-task-modal')
                                  ?.showModal();
                                setTaskIdToDelete(task.id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </th>
                        <td>{task.title}</td>
                        <td>{truncate(task.description ?? '', 29)}</td>
                        <td>
                          <select
                            className="select select-bordered w-full max-w-xs select-sm"
                            value={task.status}
                            onChange={(event) =>
                              handleTaskStatusChange(
                                task,
                                event.target.value as AvailableStatus
                              )
                            }
                          >
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
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
      </div>
    </div>
  );
};

export default DashboardPage;
