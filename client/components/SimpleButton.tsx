export function SimpleButton({
  children, onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="w-full h-10 rounded-lg bg-primary-600 text-gray-50 hover:bg-primary-500 hover:bg-opacity-60 hover:text-primary-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
