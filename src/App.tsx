import { useState } from "react";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { InputPipeline } from "./components/InputPipeline";
import { CustomerList } from "./components/CustomerList";
import { Settings } from "./components/Settings";
import { NotificationPanel } from "./components/NotificationPanel";
import { LeadsData } from "./components/LeadsData";
import { Organizer } from "./components/Organizer";     // <-- NEW
import { BottomNav } from "./components/BottomNav";      // <-- NAVIGATION
import { Toaster } from "./components/ui/sonner";

interface Notification {
  id: number;
  customerName: string;
  amount: number;
  timestamp: string;
  type: "withdrawal" | "deposit";
}

function PesanPage() {
  return (
    <div className="text-center text-gray-600 py-10">
      Belum ada pesan
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      customerName: "Ahmad Rizky Pratama",
      amount: 125000000,
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      type: "withdrawal",
    },
    {
      id: 2,
      customerName: "Dewi Ayu Lestari",
      amount: 875000000,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      type: "withdrawal",
    },
    {
      id: 3,
      customerName: "Budi Santoso",
      amount: 156200000,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      type: "withdrawal",
    },
  ]);

  const handleTransactionSubmit = (data: any) => {
    if (data.transactionType === "withdrawal" && data.amount >= 50000) {
      const newNotification: Notification = {
        id: Date.now(),
        customerName: data.customerName,
        amount: data.amount,
        timestamp: data.timestamp,
        type: "withdrawal",
      };
      setNotifications([newNotification, ...notifications]);
    }
  };

  const handleFollowUpSubmit = (data: any) => {
    console.log("Follow-up submitted:", data);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard
            notifications={notifications}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        );

      case "input":
        return (
          <InputPipeline
            onSubmit={handleTransactionSubmit}
            onFollowUpSubmit={handleFollowUpSubmit}
          />
        );

      case "leads":
        return <LeadsData />;

      case "customers":
        return <CustomerList />;

      case "organizer":
        return <Organizer />;   // <-- REAL ORGANIZER PAGE

      case "pesan":
        return <PesanPage />;

      case "settings":
        return <Settings />;  // <-- Akun

      default:
        return (
          <Dashboard
            notifications={notifications}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header
        onNotificationClick={() => setShowNotifications(true)}
        notificationCount={notifications.length}
      />

      <main className="max-w-md mx-auto px-4 py-4">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Notification Panel */}
      {showNotifications && (
        <NotificationPanel
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          onClearAll={handleClearNotifications}
        />
      )}

      <Toaster position="top-center" />
    </div>
  );
}
