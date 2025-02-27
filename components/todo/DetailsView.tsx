import { DetailsViewProps } from "@/types/todo";

const DetailsView = ({
  todo,
  editText,
  onEditChange,
  onSave,
  onDelete,
  onBack,
}: DetailsViewProps) => (
  <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow mt-8">
    <h2 className="text-2xl font-bold mb-6">Chi tiết công việc</h2>
    <div>
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-2">
          Tên công việc
        </label>
        <input
          type="text"
          value={editText}
          onChange={(e) => onEditChange(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          title="name"
        />
      </div>
      <div>
        <label className="block font-medium text-gray-700 mb-2">
          Trạng thái
        </label>
        {todo && (
          <span
            className={todo.completed ? "text-green-600" : "text-yellow-600"}
          >
            {todo.completed ? "Đã hoàn thành" : "Đang thực hiện"}
          </span>
        )}
      </div>
      <div className="flex gap-4 justify-end pt-4">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Quay lại
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Lưu
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Xóa
        </button>
      </div>
    </div>
  </div>
);

export default DetailsView;
