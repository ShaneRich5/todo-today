import { useState } from 'react';

interface CreateTaskFormProps {
  onSubmit: (title: string, description: string | null) => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<null | string>(null);

  return (
    <div className="card w-96 card-bordered flex justify-center items-center py-10 mb-10 shadow-xl bg-base-100">
      <form
        className="w-full space-y-2 px-4"
        onSubmit={(e) => e.preventDefault()}
      >
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
          <button className="btn btn-ghost" onClick={() => setDescription('')}>
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
        <button
          className="btn btn-primary w-full"
          onClick={() => onSubmit(title, description)}
        >
          Create Task
        </button>
        <button className="btn btn-outline w-full">Cancel</button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
