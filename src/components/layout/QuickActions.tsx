export const QuickActions = ({ setActivePage }) => {
  const quickActions = [
    {
      label: "Emergency Call",
      icon: <AlertCircle className="w-6 h-6" />,
      color: "red",
      onClick: () => (window.location.href = "tel:911"),
    },
    {
      label: "Video Chat",
      icon: <Video className="w-6 h-6" />,
      color: "blue",
      onClick: () => setActivePage("video-chat"),
    },
    {
      label: "Medication",
      icon: <Heart className="w-6 h-6" />,
      color: "pink",
      onClick: () => setActivePage("health"),
    },
    {
      label: "Help",
      icon: <HelpCircle className="w-6 h-6" />,
      color: "green",
      onClick: () => setActivePage("help"),
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {quickActions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-all duration-200 
              ${
                action.color === "red"
                  ? "bg-red-50 hover:bg-red-100 text-red-700"
                  : ""
              }
              ${
                action.color === "blue"
                  ? "bg-blue-50 hover:bg-blue-100 text-blue-700"
                  : ""
              }
              ${
                action.color === "pink"
                  ? "bg-pink-50 hover:bg-pink-100 text-pink-700"
                  : ""
              }
              ${
                action.color === "green"
                  ? "bg-green-50 hover:bg-green-100 text-green-700"
                  : ""
              }
              hover:shadow-md border-2 border-transparent
              ${action.color === "red" ? "hover:border-red-200" : ""}
              ${action.color === "blue" ? "hover:border-blue-200" : ""}
              ${action.color === "pink" ? "hover:border-pink-200" : ""}
              ${action.color === "green" ? "hover:border-green-200" : ""}`}
        >
          {action.icon}
          <span className="text-sm font-medium">{action.label}</span>
        </button>
      ))}
    </div>
  );
};
