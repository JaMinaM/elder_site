import { MessagesSection } from "@/components/sections/messages";
import { HealthSection } from "../sections/health/HealthSection";
import { SocialSection } from "../sections/social";
import { CommunitySection } from "../sections/groups";

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
    case "messages":
      return <MessagesSection />;
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
