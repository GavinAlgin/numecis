"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";

/* -------------------- Button -------------------- */
function Button({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800"
    >
      {children}
    </button>
  );
}

/* -------------------- Switch -------------------- */
function Switch({ checked, onChange }: any) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-10 h-6 flex items-center rounded-full p-1 transition ${
        checked ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
          checked ? "translate-x-4" : ""
        }`}
      />
    </button>
  );
}

/* -------------------- Checkbox -------------------- */
function Checkbox({ checked, onChange }: any) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="h-4 w-4"
    />
  );
}

/* -------------------- Page -------------------- */
function NotificationSettings() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [whatsappAlerts, setWhatsappAlerts] = useState(false);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
        <Sidebar
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
        />
        <div className="flex w-full justify-center py-12 overflow-y-auto">
            <div className="w-full max-w-[640px] flex flex-col gap-12">
                {/* Header */}
                <div>
                <h1 className="text-2xl font-semibold">Notifications</h1>
                <p className="text-sm text-gray-500">
                    Control how and when you receive notifications
                </p>
                </div>

                {/* WhatsApp Integration */}
                <div className="flex items-center gap-4 rounded-lg bg-green-50 p-4">
                <img
                    className="w-8"
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                />
                <div className="flex flex-col flex-1">
                    <span className="font-medium">
                    Connect WhatsApp
                    </span>
                    <span className="text-sm text-gray-500">
                    Receive real-time alerts directly on WhatsApp
                    </span>
                </div>
                <Button>Connect</Button>
                </div>

                {/* Channels */}
                <div className="flex flex-col gap-6">
                <h2 className="text-lg font-semibold">Channels</h2>

                <div className="flex justify-between items-center">
                    <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-500">
                        Receive email notifications
                    </p>
                    </div>
                    <Switch checked={emailAlerts} onChange={setEmailAlerts} />
                </div>

                <div className="flex justify-between items-center">
                    <div>
                    <p className="font-medium">SMS</p>
                    <p className="text-sm text-gray-500">
                        Receive text message alerts
                    </p>
                    </div>
                    <Switch checked={smsAlerts} onChange={setSmsAlerts} />
                </div>

                <div className="flex justify-between items-center">
                    <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-sm text-gray-500">
                        Receive WhatsApp notifications
                    </p>
                    </div>
                    <Switch
                    checked={whatsappAlerts}
                    onChange={setWhatsappAlerts}
                    />
                </div>

                <div className="flex justify-between items-center">
                    <div>
                    <p className="font-medium">Push notifications</p>
                    <p className="text-sm text-gray-500">
                        Browser / mobile push notifications
                    </p>
                    </div>
                    <Switch checked={pushAlerts} onChange={setPushAlerts} />
                </div>
                </div>

                <div className="h-px bg-gray-200" />

                {/* Notification Types */}
                <div className="flex flex-col gap-6">
                <h2 className="text-lg font-semibold">Notification Types</h2>

                {[
                    "New login detected",
                    "Password changed",
                    "New device connected",
                    "Billing updates",
                    "Product updates",
                    "Marketing & promotions",
                ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                    <span className="text-sm">{item}</span>
                    <Checkbox checked={true} onChange={() => {}} />
                    </div>
                ))}
                </div>

                <div className="h-px bg-gray-200" />

                {/* Preferences Matrix */}
                <div className="flex flex-col gap-6">
                <h2 className="text-lg font-semibold">Detailed Preferences</h2>

                <div className="grid grid-cols-4 gap-4 text-sm font-medium">
                    <span></span>
                    <span>Email</span>
                    <span>SMS</span>
                    <span>WhatsApp</span>
                </div>

                {[
                    "Event invitations",
                    "Event reminders",
                    "Event updates",
                    "Comments & mentions",
                ].map((label, i) => (
                    <div key={i} className="grid grid-cols-4 gap-4 items-center">
                    <span className="text-sm text-gray-600">{label}</span>
                    <Checkbox checked={true} onChange={() => {}} />
                    <Checkbox checked={false} onChange={() => {}} />
                    <Checkbox checked={false} onChange={() => {}} />
                    </div>
                ))}
                </div>

                <div className="h-px bg-gray-200" />

                {/* Frequency */}
                <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Notification Frequency</h2>

                <select className="border rounded-lg px-3 py-2 text-sm">
                    <option>Real-time</option>
                    <option>Every 15 minutes</option>
                    <option>Hourly digest</option>
                    <option>Daily summary</option>
                </select>
                </div>

                {/* Save */}
                <div className="flex justify-end">
                <Button>Save preferences</Button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default NotificationSettings;