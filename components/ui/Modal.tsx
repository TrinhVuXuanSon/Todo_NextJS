const Modal = ({
  isOpen,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[500px]">
        <div className="mb-4">
          <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;