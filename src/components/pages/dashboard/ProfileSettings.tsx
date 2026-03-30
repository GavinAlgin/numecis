"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";

/* -------------------- Button -------------------- */
function Button({
  children,
  variant = "primary",
  onClick,
  icon,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "destructive";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
}) {
  const base =
    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition";

  const styles = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-gray-100 text-black hover:bg-gray-200",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {icon}
      {children}
    </button>
  );
}

/* -------------------- TextField -------------------- */
function TextField({
  label,
  helpText,
  children,
}: {
  label?: string;
  helpText?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-800">{label}</label>
      )}
      {children}
      {helpText && (
        <span className="text-xs text-gray-500">{helpText}</span>
      )}
    </div>
  );
}

TextField.Input = function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
    />
  );
};

/* -------------------- Alert -------------------- */
function Alert({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="w-full rounded-lg border border-red-200 bg-red-50 p-4 flex flex-col gap-3">
      <div>
        <p className="font-medium text-red-600">{title}</p>
        <p className="text-sm text-red-500">{description}</p>
      </div>
      {actions}
    </div>
  );
}

/* -------------------- Page -------------------- */
function AccountSettings() {
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
            <div className="w-full max-w-[600px] flex flex-col gap-12">
                {/* Header */}
                <div>
                <h1 className="text-2xl font-semibold">Account</h1>
                <p className="text-sm text-gray-500">
                    Update your profile and personal details here
                </p>
                </div>

                {/* Profile */}
                <div className="flex flex-col gap-6">
                <h2 className="text-lg font-semibold">Profile</h2>

                {/* Avatar */}
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium">Avatar</span>
                    <div className="flex items-center gap-4">
                    <img
                        className="h-16 w-16 rounded-full object-cover"
                        src="https://res.cloudinary.com/subframe/image/upload/v1711417513/shared/kwut7rhuyivweg8tmyzl.jpg"
                    />
                    <div className="flex flex-col gap-2">
                        <Button variant="secondary">Upload</Button>
                        <span className="text-xs text-gray-500">
                        512x512 or larger recommended
                        </span>
                    </div>
                    </div>
                </div>

                {/* Name */}
                <div className="flex gap-4">
                    <TextField label="First name">
                    <TextField.Input placeholder="Josef" />
                    </TextField>
                    <TextField label="Last name">
                    <TextField.Input placeholder="Albers" />
                    </TextField>
                </div>

                {/* Email */}
                <TextField label="Email">
                    <TextField.Input placeholder="josef@subframe.com" />
                </TextField>
                </div>

                <div className="h-px bg-gray-200" />

                {/* Password */}
                <div className="flex flex-col gap-6">
                <h2 className="text-lg font-semibold">Password</h2>

                <TextField
                    label="New password"
                    helpText="At least 8 characters, one uppercase, one number">
                    <TextField.Input
                    type="password"
                    placeholder="Enter new password"
                    />
                </TextField>

                <TextField>
                    <TextField.Input
                    type="password"
                    placeholder="Re-type new password"
                    />
                </TextField>

                <Button>Change password</Button>
                </div>

                <div className="h-px bg-gray-200" />

                {/* Danger Zone */}
                <div className="flex flex-col gap-6">
                <h2 className="text-lg font-semibold text-red-600">
                    Danger zone
                </h2>

                <Alert
                    title="Delete account"
                    description="Permanently remove your account. This action is not reversible."
                    actions={<Button variant="destructive">Delete account</Button>}
                />
                </div>
            </div>
        </div>
    </div>
  );
}

export default AccountSettings;