import { useState, useEffect } from 'react';
import type { User } from '../shared/types/user';
import './Settings.css';

interface SettingsProps {
  user: User;
  onUserUpdate: (user: User) => void;
}

// Translation object
const translations = {
  en: {
    settings: 'Settings',
    manageAccount: 'Manage your account and preferences',
    appearance: 'Appearance',
    darkMode: 'Dark Mode',
    darkModeDesc: 'Switch between light and dark theme',
    language: 'Language',
    languageDesc: 'Choose your preferred language',
    notifications: 'Notifications',
    emailNotifications: 'Email Notifications',
    emailNotificationsDesc: 'Receive updates via email',
    smsNotifications: 'SMS Notifications',
    smsNotificationsDesc: 'Receive text message alerts',
    appointmentReminders: 'Appointment Reminders',
    appointmentRemindersDesc: 'Get notified before appointments',
    bookingPreferences: 'Booking Preferences',
    autoBooking: 'Auto-Booking',
    autoBookingDesc: 'Automatically confirm available slots',
    timezone: 'Timezone',
    timezoneDesc: 'Set your local timezone for appointments',
  },
  bg: {
    settings: 'Настройки',
    manageAccount: 'Управлявайте вашия акаунт и предпочитания',
    appearance: 'Външен вид',
    darkMode: 'Тъмен режим',
    darkModeDesc: 'Превключване между светла и тъмна тема',
    language: 'Език',
    languageDesc: 'Изберете предпочитан език',
    notifications: 'Известия',
    emailNotifications: 'Имейл известия',
    emailNotificationsDesc: 'Получавайте актуализации по имейл',
    smsNotifications: 'SMS известия',
    smsNotificationsDesc: 'Получавайте текстови съобщения',
    appointmentReminders: 'Напомняния за срещи',
    appointmentRemindersDesc: 'Получавайте известия преди срещи',
    bookingPreferences: 'Предпочитания за резервации',
    autoBooking: 'Автоматична резервация',
    autoBookingDesc: 'Автоматично потвърждаване на свободни часове',
    timezone: 'Часова зона',
    timezoneDesc: 'Задайте вашата часова зона за срещи',
  }
};

export default function Settings({ user, onUserUpdate }: SettingsProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [autoBooking, setAutoBooking] = useState(false);
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC');
  const [message, setMessage] = useState('');

  const t = translations[language as keyof typeof translations];

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
        <h1>{t.settings}</h1>
        <p>{t.manageAccount}</p>
      </div>

      <div className="settings-content">
        {message && <div className="success-message">{message}</div>}

        {/* Appearance Section */}
        <section className="settings-section">
          <h2>{t.appearance}</h2>
          <div className="settings-card">
            <div className="setting-item">
              <div className="setting-info">
                <h3>{t.darkMode}</h3>
                <p>{t.darkModeDesc}</p>
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
                <h3>{t.language}</h3>
                <p>{t.languageDesc}</p>
              </div>
              <select
                value={language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="setting-select"
              >
                <option value="en">English</option>
                <option value="bg">Български</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="settings-section">
          <h2>{t.notifications}</h2>
          <div className="settings-card">
            <div className="setting-item">
              <div className="setting-info">
                <h3>{t.emailNotifications}</h3>
                <p>{t.emailNotificationsDesc}</p>
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
                <h3>{t.smsNotifications}</h3>
                <p>{t.smsNotificationsDesc}</p>
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
                <h3>{t.appointmentReminders}</h3>
                <p>{t.appointmentRemindersDesc}</p>
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
          <h2>{t.bookingPreferences}</h2>
          <div className="settings-card">
            <div className="setting-item">
              <div className="setting-info">
                <h3>{t.autoBooking}</h3>
                <p>{t.autoBookingDesc}</p>
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
                <h3>{t.timezone}</h3>
                <p>{t.timezoneDesc}</p>
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
                <option value="Europe/Sofia">Sofia</option>
                <option value="Asia/Tokyo">Tokyo</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
