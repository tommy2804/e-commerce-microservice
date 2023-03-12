export default function FormContainer({ onSubmit, children, title }) {
  return (
    <div className="antialiased bg-gradient-to-br from-blue-100 to-white">
      <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
        <div className="w-full md:w-full lg:w-6/12 mx-auto md:mx-0">
          <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">{title}</h2>
            <form onSubmit={onSubmit} className="w-full">
              {children}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
