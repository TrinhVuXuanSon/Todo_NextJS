import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const DropdownMenu = ({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border dark:border-gray-600">
      <div className="py-1">
        <button
          onClick={onEdit}
          className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center dark:text-white"
        >
          <FiEdit className="w-4 h-4 mr-2" />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center dark:text-red-400"
        >
          <RiDeleteBinLine className="w-4 h-4 mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default DropdownMenu;