export const renderMainContent = ({
  activePage,
  isEditMode,
  setIsEditMode,
  dashboardCards,
  moveCard,
  setActivePage,
}) => {
  switch (activePage) {
    case "health":
      return <HealthSection />;
    case "social":
      return <SocialSection />;
    case "community":
      return <CommunitySection />;
    default:
      return (
        <HomeContent
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          dashboardCards={dashboardCards}
          moveCard={moveCard}
          setActivePage={setActivePage}
        />
      );
  }
};
