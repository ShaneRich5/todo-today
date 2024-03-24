import { useState } from 'react';

interface CreateTaskModalProps {
  metas: string[];
  onSubmit: (
    title: string,
    description: string | null,
    taskMeta: { [key: string]: string }
  ) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  onSubmit,
  metas = [],
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<null | string>(null);
  const [taskMeta, setTaskMeta] = useState<{ [key: string]: string }>({});

  return (
    // <div className="card w-96 card-bordered flex justify-center items-center py-10 mb-10 shadow-xl bg-base-100">
    <dialog id="create-task-modal" className="modal">
      <div className="modal-box bg-white">
        <form className="w-full space-y-2" onSubmit={(e) => e.preventDefault()}>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              type="text"
              placeholder="What are you working on?"
              className="input input-bordered w-full max-w-xs"
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          {description === null ? (
            <button
              className="btn btn-ghost"
              onClick={() => setDescription('')}
            >
              + Add Description
            </button>
          ) : (
            <label className="form-control">
              <div className="label">
                <span className="label-text">Description</span>
                <span className="label-text-alt">(optional)</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Bio"
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
              <div className="label">
                <span className="label-text-alt">
                  Limit this to 200 characters
                </span>
              </div>
            </label>
          )}
          {metas.map((meta) => (
            <label
              className="input input-bordered flex items-center gap-2"
              key={`create-task-${meta}`}
            >
              {meta}
              <input
                type="text"
                className="grow"
                placeholder=""
                onChange={(event) =>
                  setTaskMeta((prev) => ({
                    ...prev,
                    [meta]: event.target.value,
                  }))
                }
              />
            </label>
          ))}
          <button
            className="btn btn-primary w-full"
            onClick={() => onSubmit(title, description, taskMeta)}
          >
            Create Task
          </button>
        </form>
        <div className="modal-action mt-2">
          <form method="dialog" className="w-full">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn w-full">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CreateTaskModal;
