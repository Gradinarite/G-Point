import { useState, useEffect } from 'react';
import type { User } from '../shared/types/user';
import './Settings.css';

interface SettingsProps {
  user: User;
  onUserUpdate: (user: User) => void;
}

export default function Settings({ user, onUserUpdate }: SettingsProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [autoBooking, setAutoBooking] = useState(false);
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC');
  const [message, setMessage] = useState('');

  // Load settings from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedEmailNotifications = localStorage.getItem('emailNotifications') !== 'false';
    const savedSmsNotifications = localStorage.getItem('smsNotifications') === 'true';
    const savedAppointmentReminders = localStorage.getItem('appointmentReminders') !== 'false';
    const savedAutoBooking = localStorage.getItem('autoBooking') === 'true';
    const savedLanguage = localStorage.getItem('language') || 'en';
    const savedTimezone = localStorage.getItem('timezone') || 'UTC';

    setDarkMode(savedDarkMode);
    setEmailNotifications(savedEmailNotifications);
    setSmsNotifications(savedSmsNotifications);
    setAppointmentReminders(savedAppointmentReminders);
    setAutoBooking(savedAutoBooking);
    setLanguage(savedLanguage);
    setTimezone(savedTimezone);

    // Apply dark mode
    if (savedDarkMode) {
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    localStorage.setItem('darkMode', checked.toString());
    
    if (checked) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  };

  const handleSettingChange = (setting: string, value: boolean | string) => {
    localStorage.setItem(setting, value.toString());
    
    switch (setting) {
      case 'emailNotifications':
        setEmailNotifications(value as boolean);
        break;
      case 'smsNotifications':
        setSmsNotifications(value as boolean);
        break;
      case 'appointmentReminders':
        setAppointmentReminders(value as boolean);
        break;
      case 'autoBooking':
        setAutoBooking(value as boolean);
        break;
      case 'language':
        setLanguage(value as string);
        break;
      case 'timezone':
        setTimezone(value as string);
        break;
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account and preferences</p>
      </div>

      <div className="settings-content">
        {message && <div className="success-message">{message}</div>}

        {/* Appearance Section */}
        <section className="settings-section">
          <h2>Appearance</h2>
          <div className="settings-card">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Dark Mode</h3>
                <p>Switch between light and dark theme</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => handleDarkModeToggle(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Language</h3>
                <p>Choose your preferred language</p>
              </div>
              <select
                value={language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="setting-select"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="settings-section">
          <h2>Notifications</h2>
          <div className="settings-card">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Email Notifications</h3>
                <p>Receive updates via email</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>SMS Notifications</h3>
                <p>Receive text message alerts</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={smsNotifications}
                  onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Appointment Reminders</h3>
                <p>Get notified before appointments</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={appointmentReminders}
                  onChange={(e) => handleSettingChange('appointmentReminders', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </section>

        {/* Booking Preferences Section */}
        <section className="settings-section">
          <h2>Booking Preferences</h2>
          <div className="settings-card">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Auto-Booking</h3>
                <p>Automatically confirm available slots</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={autoBooking}
                  onChange={(e) => handleSettingChange('autoBooking', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Timezone</h3>
                <p>Set your local timezone for appointments</p>
              </div>
              <select
                value={timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
                className="setting-select"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
                <option value="Asia/Tokyo">Tokyo</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
