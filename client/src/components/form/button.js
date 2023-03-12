export default function Button({ onClick, type, children }) {
  return (
    <button
      className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10"
      type={type}
      onClick={onClick}>
      {children}
    </button>
  );
}
