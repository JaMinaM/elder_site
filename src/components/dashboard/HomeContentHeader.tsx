export const HomeContentHeader = ({ isEditMode, setIsEditMode }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">Welcome Back, JaMina!</h2>
      <button
        onClick={() => setIsEditMode(!isEditMode)}
        className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
      >
        {isEditMode ? (
          <>
            <Check className="w-5 h-5" />
            <span>Done</span>
          </>
        ) : (
          <>
            <Settings className="w-5 h-5" />
            <span>Customize Layout</span>
          </>
        )}
      </button>
    </div>
  );
};
