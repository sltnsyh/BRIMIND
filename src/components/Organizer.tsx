import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  Calendar,
  Clock,
  CheckSquare,
  Plus,
  Trash2,
  GripVertical,
  Bell,
} from "lucide-react";

export function Organizer() {
  const [activeTab, setActiveTab] = useState<
    "calendar" | "tasks" | "agenda" | "reminders"
  >("calendar");

  const [tasks, setTasks] = useState([
    { id: 1, text: "Hubungi Nasabah Budi", done: false },
    { id: 2, text: "Review Pipeline Baru", done: false },
  ]);

  const [agenda] = useState([
    { id: 1, title: "Meeting Tim Kredit", time: "09:00" },
    { id: 2, title: "Follow Up Debitur", time: "14:30" },
  ]);

  const [reminders] = useState([
    { id: 1, text: "Monitoring nasabah harian", time: "08:00" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [dragId, setDragId] = useState<number | null>(null);

  const tabs = [
    { id: "calendar", label: "Kalender", icon: Calendar },
    { id: "tasks", label: "Tugas", icon: CheckSquare },
    { id: "agenda", label: "Agenda", icon: Clock },
    { id: "reminders", label: "Reminder", icon: Bell },
  ];

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const handleDragStart = (id: number) => setDragId(id);

  const handleDrop = (id: number) => {
    if (dragId === null) return;

    const list = [...tasks];
    const dragIndex = list.findIndex((t) => t.id === dragId);
    const dropIndex = list.findIndex((t) => t.id === id);

    const [dragged] = list.splice(dragIndex, 1);
    list.splice(dropIndex, 0, dragged);

    setTasks(list);
    setDragId(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Organizer</h2>

      {/* Top Tabs */}
      <div className="grid grid-cols-4 gap-2">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;

          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`py-3 flex flex-col items-center rounded-xl border text-xs transition ${
                isActive
                  ? "bg-blue-100 text-blue-700 border-blue-300"
                  : "bg-gray-100 text-gray-600 border-gray-200"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Content Switch */}
      {activeTab === "calendar" && <CalendarView />}
      {activeTab === "tasks" && (
        <TasksView
          tasks={tasks}
          newTask={newTask}
          setNewTask={setNewTask}
          toggleTask={toggleTask}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
        />
      )}
      {activeTab === "agenda" && <AgendaView agenda={agenda} />}
      {activeTab === "reminders" && <RemindersView reminders={reminders} />}
    </div>
  );
}

/* ------------------------------------------------------
   📅 COMPACT WEEK CALENDAR (NEVER WRAPS)
-------------------------------------------------------*/
function CalendarView() {
  const today = new Date();

  // Convert JS Sunday(0) → Monday(1)
  const jsDay = today.getDay();
  const dayOfWeek = jsDay === 0 ? 6 : jsDay - 1;

  // Monday as start of week
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek);

  // Build 7-day week
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return {
      day: d.getDate(),
      isToday: d.toDateString() === today.toDateString(),
    };
  });

  const month = today.toLocaleString("id-ID", { month: "long" });
  const year = today.getFullYear();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">
          {month} {year}
        </CardTitle>
      </CardHeader>

      <CardContent>

        {/* Weekday Header */}
        <div className="flex w-full">
          {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
            <div
              key={d}
              className="flex-1 text-center text-[11px] sm:text-xs font-medium text-gray-600"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Days Row */}
        <div className="flex w-full gap-1 mt-1">
          {weekDays.map((d, i) => (
            <div
              key={i}
              className={`flex-1 py-2 rounded-md text-[12px] sm:text-sm text-center select-none ${
                d.isToday
                  ? "bg-blue-300 text-black font-semibold shadow-sm"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {d.day}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------
   📌 TASKS VIEW (DRAG & DROP)
-------------------------------------------------------*/
function TasksView({
  tasks,
  newTask,
  setNewTask,
  toggleTask,
  handleDragStart,
  handleDrop,
}: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tugas</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">

        {/* Add Task */}
        <div className="flex gap-2">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Tambah tugas…"
            className="flex-1 px-3 py-2 border rounded-lg text-sm"
          />

          <Button
            onClick={() => {
              if (!newTask.trim()) return;
              tasks.push({
                id: Date.now(),
                text: newTask,
                done: false,
              });
              setNewTask("");
            }}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Task List */}
        {tasks.map((t: any) => (
          <div
            key={t.id}
            draggable
            onDragStart={() => handleDragStart(t.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(t.id)}
            className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg"
          >
            <GripVertical className="w-4 h-4 text-gray-500" />

            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleTask(t.id)}
              className="w-4 h-4"
            />

            <span
              className={`flex-1 text-sm ${
                t.done ? "line-through text-gray-400" : ""
              }`}
            >
              {t.text}
            </span>

            <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------
   📘 AGENDA VIEW
-------------------------------------------------------*/
function AgendaView({ agenda }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agenda Hari Ini</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {agenda.map((a: any) => (
          <div
            key={a.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
          >
            <span>{a.title}</span>
            <span className="text-gray-600 text-sm">{a.time}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------
   🔔 REMINDERS VIEW
-------------------------------------------------------*/
function RemindersView({ reminders }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reminder</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {reminders.map((r: any) => (
          <div
            key={r.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
          >
            <span>{r.text}</span>
            <span className="text-gray-600 text-sm">{r.time}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
