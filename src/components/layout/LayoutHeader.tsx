export const LayoutHeader = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  showNotifications,
  setShowNotifications,
  notifications,
  setNotifications,
}) => {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-blue-600 ml-2">
              GoldenConnect
            </h1>
          </div>
          <nav className="flex items-center gap-4">
            <div className="relative">
              <button
                className="p-2 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-6 h-6" />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>
              {showNotifications && (
                <NotificationPanel
                  notifications={notifications}
                  onClose={() => setShowNotifications(false)}
                  setNotifications={setNotifications}
                />
              )}
            </div>
            <button className="p-2">
              <Settings className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
