interface DeleteTaskModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  onConfirm,
  onCancel,
}) => (
  <dialog id="delete-task-modal" className="modal">
    <div className="modal-box">
      <h3 className="font-bold text-lg">Confirm deletion</h3>
      <p>Are you sure you want to delete this task?</p>
      <button className="btn btn-warning w-full mt-4" onClick={onConfirm}>
        Delete
      </button>
      <button className="btn btn-outline w-full mt-2" onClick={onCancel}>
        Cancel
      </button>
    </div>
    <form method="dialog" className="modal-backdrop">
      <button className="btn" onClick={onCancel}>
        Cancel
      </button>
    </form>
  </dialog>
);

export default DeleteTaskModal;
