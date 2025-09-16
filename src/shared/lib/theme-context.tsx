"use client";

import { AdminSettings, Theme } from "@/shared/types";
import React, { createContext, useContext, useEffect, useState } from "react";

const defaultTheme: Theme = {
  primary: "#F08787",
  secondary: "#d946ef",
  accent: "#f97316",
  background: "#F3F2EC",
  text: "#1f2937",
  header: "#FFC7A7",
  footer: "#FEE2AD",
};

const defaultSettings: AdminSettings = {
  theme: defaultTheme,
  siteTitle: "Hong Anh",
  siteDescription: "From Noel with love",
  socialLinks: {
    instagram: "",
    dribbble: "",
    linkedin: "",
    twitter: "",
    github: "",
  },
};

interface ThemeContextType {
  theme: Theme;
  settings: AdminSettings;
  updateTheme: (newTheme: Partial<Theme>) => void;
  updateSettings: (newSettings: Partial<AdminSettings>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);

  useEffect(() => {
    // Load theme from API on mount
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings");
      if (response.ok) {
        const settingsData = await response.json();
        setSettings(settingsData);
        setTheme(settingsData.theme);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const updateTheme = async (newTheme: Partial<Theme>) => {
    const updatedTheme = { ...theme, ...newTheme };
    setTheme(updatedTheme);

    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: updatedTheme }),
      });
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  };

  const updateSettings = async (newSettings: Partial<AdminSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);

    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSettings),
      });
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, settings, updateTheme, updateSettings }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
