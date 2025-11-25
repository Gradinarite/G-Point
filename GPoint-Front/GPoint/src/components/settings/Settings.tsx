import { useState, useEffect } from 'react';
import type { User } from '../../shared/types/user';
import { useTranslation } from '../../shared/contexts/TranslationContext';
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
  const [timezone, setTimezone] = useState('UTC');
  const [message, setMessage] = useState('');

  const { language, setLanguage, t } = useTranslation();

  // Load settings from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedEmailNotifications = localStorage.getItem('emailNotifications') !== 'false';
    const savedSmsNotifications = localStorage.getItem('smsNotifications') === 'true';
    const savedAppointmentReminders = localStorage.getItem('appointmentReminders') !== 'false';
    const savedAutoBooking = localStorage.getItem('autoBooking') === 'true';
    const savedTimezone = localStorage.getItem('timezone') || 'UTC';

    setDarkMode(savedDarkMode);
    setEmailNotifications(savedEmailNotifications);
    setSmsNotifications(savedSmsNotifications);
    setAppointmentReminders(savedAppointmentReminders);
    setAutoBooking(savedAutoBooking);
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
    if (setting === 'language') {
      setLanguage(value as 'en' | 'bg');
      return;
    }

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
      case 'timezone':
        setTimezone(value as string);
        break;
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>{t('settings.title')}</h1>
        <p>{t('settings.manageAccount')}</p>
      </div>

      <div className="settings-content">
        {message && <div className="success-message">{message}</div>}

        {/* Appearance Section */}
        <section className="settings-section">
          <h2>{t('settings.appearance')}</h2>
          <div className="settings-card">
            <div className="setting-item">
              <div className="setting-info">
                <h3>{t('settings.darkMode')}</h3>
                <p>{t('settings.darkModeDesc')}</p>
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
                <h3>{t('settings.language')}</h3>
                <p>{t('settings.languageDesc')}</p>
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
          <h2>{t('settings.notifications')}</h2>
          <div className="settings-card">
            <div className="setting-item">
              <div className="setting-info">
                <h3>{t('settings.emailNotifications')}</h3>
                <p>{t('settings.emailNotificationsDesc')}</p>
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
                <h3>{t('settings.smsNotifications')}</h3>
                <p>{t('settings.smsNotificationsDesc')}</p>
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
                <h3>{t('settings.appointmentReminders')}</h3>
                <p>{t('settings.appointmentRemindersDesc')}</p>
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
          <h2>{t('settings.bookingPreferences')}</h2>
          <div className="settings-card">
            <div className="setting-item">
              <div className="setting-info">
                <h3>{t('settings.autoBooking')}</h3>
                <p>{t('settings.autoBookingDesc')}</p>
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
                <h3>{t('settings.timezone')}</h3>
                <p>{t('settings.timezoneDesc')}</p>
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
