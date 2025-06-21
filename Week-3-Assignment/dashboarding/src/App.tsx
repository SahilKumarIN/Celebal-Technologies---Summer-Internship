import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { TablesPage } from './components/Tables/TablesPage';
import { ChartsPage } from './components/Charts/ChartsPage';
import { CalendarPage } from './components/Calendar/CalendarPage';
import { KanbanPage } from './components/Kanban/KanbanPage';
import { SettingsPage } from './components/Settings/SettingsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'tables':
        return <TablesPage />;
      case 'charts':
        return <ChartsPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'kanban':
        return <KanbanPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          setIsCollapsed={setSidebarCollapsed}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto">
            {renderPage()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;