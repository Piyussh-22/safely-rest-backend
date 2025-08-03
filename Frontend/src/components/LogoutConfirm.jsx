// components/LogoutConfirm.jsx
import Modal from "./Modal";

const LogoutConfirm = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Are you sure you want to logout?
      </h2>
      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </Modal>
  );
};

export default LogoutConfirm;
