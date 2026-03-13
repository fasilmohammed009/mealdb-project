import { useState } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { TABS, TAB_CONFIG, STYLES } from "./constants/userConstants";
import {
  LoadingSpinner,
  ErrorState,
  UserCard,
  PhotoCard,
  TabButton,
  PaginationControls
} from "./components/UserComponent";

/**
 * Dummy Component - Explorer Hub
 * Displays users and photos data in a tabbed interface
 */
export default function Dummy() {
  const [activeTab, setActiveTab] = useState(TABS.USERS);
  const { users, photos, loading, error, refetch, pagination, goToPage } = useFetchData();

  // Loading State
  if (loading) return <LoadingSpinner />;

  // Error State
  if (error) return <ErrorState error={error} onRetry={refetch} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-5xl font-bold text-center mb-8 text-gray-800">
          Explorer Hub
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12" role="tablist">
          {TAB_CONFIG.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
          
        </div>

        {/* Content Areas */}
        {activeTab === TABS.USERS && (
          <div className={STYLES.GRID_USERS} role="tabpanel">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}

        {activeTab === TABS.PHOTOS && (
          <div>
            <div className={STYLES.GRID_PHOTOS} role="tabpanel">
              {photos.map((photo) => (
                <PhotoCard key={photo._id} photo={photo} />
              ))}
            </div>
            {/* Pagination Controls */}
            <PaginationControls pagination={pagination} onPageChange={goToPage} />
          </div>
        )}
      </div>
    </div>
  );
}