export const MainLayoutContainer = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block w-64">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <SideNav activePage={activePage} setActivePage={setActivePage} />
            </CardContent>
          </Card>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};
