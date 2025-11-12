import { useState } from "react";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { Dashboard } from "./components/Dashboard";
import { InputPipeline } from "./components/InputPipeline";
import { CustomerList } from "./components/CustomerList";
import { Settings } from "./components/Settings";
import { NotificationPanel } from "./components/NotificationPanel";
import { LeadsData } from "./components/LeadsData";
import { Toaster } from "./components/ui/sonner";

interface Notification {
  id: number;
  customerName: string;
  amount: number;
  timestamp: string;
  type: "withdrawal" | "deposit";
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
    // Check if it's a large withdrawal
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
    // You can add additional logic here to store follow-up data
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard notifications={notifications} />;
      case "input":
        return <InputPipeline onSubmit={handleTransactionSubmit} onFollowUpSubmit={handleFollowUpSubmit} />;
      case "leads":
        return <LeadsData />;
      case "customers":
        return <CustomerList />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard notifications={notifications} />;
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

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

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