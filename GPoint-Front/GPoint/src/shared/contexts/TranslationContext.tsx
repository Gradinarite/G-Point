import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'bg';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Complete translations object
const translations = {
  en: {
    // Auth
    'auth.welcome': 'Welcome to GPoint',
    'auth.signIn': 'Sign in to your account',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.signInButton': 'Sign In',
    'auth.signingIn': 'Signing in...',
    'auth.noAccount': "Don't have an account?",
    'auth.createAccount': 'Create Account',
    'auth.createAccountTitle': 'Create Account',
    'auth.joinToday': 'Join GPoint today',
    'auth.fullName': 'Full Name',
    'auth.confirmPassword': 'Confirm Password',
    'auth.accountType': 'Account Type',
    'auth.user': 'User',
    'auth.specialist': 'Specialist',
    'auth.creatingAccount': 'Creating Account...',
    'auth.haveAccount': 'Already have an account?',
    'auth.signInLink': 'Sign In',
    
    // Navigation
    'nav.home': 'Home',
    'nav.appointments': 'Appointments',
    'nav.settings': 'Settings',
    'nav.statistics': 'Statistics',
    'nav.logout': 'Logout',
    
    // Home
    'home.welcome': 'Welcome',
    'home.searchServices': 'Search services or specialists...',
    'home.searchMyServices': 'Search my services...',
    'home.myServices': 'My Services',
    'home.createService': '+ Create Service',
    'home.availableServices': 'Available Services',
    'home.editService': 'Edit Service',
    'home.book': 'Book',
    'home.noServices': 'No services created yet. Click "Create Service" to add one.',
    'home.noServicesAvailable': 'No services available',
    'home.noSearchResults': 'No services match your search.',
    'home.loadingServices': 'Loading services...',
    'home.duration': 'min',
    
    // Appointments
    'appointments.title': 'My Appointments',
    'appointments.titleSpecialist': 'My Appointments Calendar',
    'appointments.subtitle': 'View and manage your scheduled appointments',
    'appointments.subtitleSpecialist': 'View appointments organized by service',
    'appointments.noAppointments': "You don't have any appointments yet.",
    'appointments.noAppointmentsUser': "Book a service to get started!",
    'appointments.noAppointmentsSpecialist': "Clients will book your services.",
    'appointments.scheduled': 'Scheduled',
    'appointments.cancel': 'Cancel',
    'appointments.cancelling': 'Cancelling...',
    'appointments.cancelAppointment': 'Cancel Appointment',
    'appointments.markComplete': 'Mark as Complete',
    'appointments.completing': 'Completing...',
    'appointments.with': 'with',
    'appointments.appointment': 'appointment',
    'appointments.appointments': 'appointments',
    
    // Modals
    'modal.close': 'Close',
    'modal.cancel': 'Cancel',
    'modal.confirm': 'Confirm',
    'modal.delete': 'Delete',
    'modal.save': 'Save',
    
    // Booking Modal
    'booking.title': 'Book Appointment',
    'booking.duration': 'Duration',
    'booking.minutes': 'minutes',
    'booking.selectDate': 'Select Date',
    'booking.selectTime': 'Select Time',
    'booking.loadingTimes': 'Loading available times...',
    'booking.noSlots': 'No available time slots for this date',
    'booking.confirmBooking': 'Confirm Booking',
    'booking.booking': 'Booking...',
    
    // Service Modal
    'service.createNew': 'Create New Service',
    'service.editService': 'Edit Service',
    'service.serviceName': 'Service Name',
    'service.description': 'Description',
    'service.descriptionPlaceholder': 'Describe your service...',
    'service.durationMinutes': 'Duration (minutes)',
    'service.timeSlots': 'Time Slots',
    'service.addTimeSlots': 'Add available time slots for this service',
    'service.date': 'Date',
    'service.startTime': 'Start Time',
    'service.endTime': 'End Time',
    'service.addSlot': 'Add Slot',
    'service.addedSlots': 'Added Time Slots',
    'service.existingSlots': 'Existing Time Slots',
    'service.newSlots': 'Add New Time Slots',
    'service.addMoreSlots': 'Add more available time slots',
    'service.noSlots': 'No time slots yet',
    'service.booked': '(Booked)',
    'service.newSlotsToAdd': 'New Time Slots to Add',
    'service.createButton': 'Create Service',
    'service.creating': 'Creating...',
    'service.updateButton': 'Update Service',
    'service.updating': 'Updating...',
    'service.deleteButton': 'Delete Service',
    
    // Confirmation Modals
    'confirm.cancelAppointment': 'Cancel Appointment',
    'confirm.cancelAppointmentMsg': 'Are you sure you want to cancel this appointment? This action cannot be undone.',
    'confirm.yesCancel': 'Yes, Cancel',
    'confirm.noKeep': 'No, Keep It',
    'confirm.completeAppointment': 'Complete Appointment',
    'confirm.completeAppointmentMsg': 'Mark this appointment as completed? The client will be notified.',
    'confirm.markComplete': 'Mark Complete',
    'confirm.notYet': 'Not Yet',
    'confirm.deleteService': 'Delete Service?',
    'confirm.deleteServiceMsg': 'This will delete the service and all its time slots. Booked appointments will also be cancelled. This action cannot be undone.',
    'confirm.yesDelete': 'Yes, Delete',
    'confirm.deleteSlot': 'Delete Time Slot?',
    'confirm.deleteSlotMsg': 'Are you sure you want to delete this time slot? This action cannot be undone.',
    'confirm.deleting': 'Deleting...',
    
    // Profile
    'profile.title': 'Profile',
    'profile.accountInfo': 'Account Information',
    'profile.role': 'Role',
    'profile.roleUser': 'User',
    'profile.roleSpecialist': 'Specialist',
    'profile.roleAdmin': 'Admin',
    'profile.editProfile': 'Edit Profile',
    'profile.saveChanges': 'Save Changes',
    'profile.saving': 'Saving...',
    
    // Settings
    'settings.title': 'Settings',
    'settings.manageAccount': 'Manage your account and preferences',
    'settings.appearance': 'Appearance',
    'settings.darkMode': 'Dark Mode',
    'settings.darkModeDesc': 'Switch between light and dark theme',
    'settings.language': 'Language',
    'settings.languageDesc': 'Choose your preferred language',
    'settings.notifications': 'Notifications',
    'settings.emailNotifications': 'Email Notifications',
    'settings.emailNotificationsDesc': 'Receive updates via email',
    'settings.smsNotifications': 'SMS Notifications',
    'settings.smsNotificationsDesc': 'Receive text message alerts',
    'settings.appointmentReminders': 'Appointment Reminders',
    'settings.appointmentRemindersDesc': 'Get notified before appointments',
    'settings.bookingPreferences': 'Booking Preferences',
    'settings.autoBooking': 'Auto-Booking',
    'settings.autoBookingDesc': 'Automatically confirm available slots',
    'settings.timezone': 'Timezone',
    'settings.timezoneDesc': 'Set your local timezone for appointments',
    
    // Statistics
    'stats.title': 'Appointment Statistics',
    'stats.subtitle': 'Overview of your appointments performance',
    'stats.total': 'Total Appointments',
    'stats.completed': 'Completed',
    'stats.cancelled': 'Cancelled',
    'stats.scheduled': 'Scheduled',
    'stats.completionVsCancellation': 'Completion vs Cancellation',
    'stats.successRate': 'Success Rate',
    'stats.noData': 'No appointment data available yet.',
    'stats.noDataDesc': 'Statistics will appear once you have appointments.',
    
    // Toast Messages
    'toast.loginSuccess': 'Welcome back',
    'toast.registerSuccess': 'Welcome to GPoint',
    'toast.profileUpdated': 'Profile updated successfully!',
    'toast.appointmentBooked': 'Appointment booked successfully!',
    'toast.appointmentCancelled': 'Appointment cancelled successfully',
    'toast.appointmentCompleted': 'Appointment marked as completed',
    'toast.serviceCreated': 'Service created successfully!',
    'toast.serviceUpdated': 'Service updated successfully!',
    'toast.serviceDeleted': 'Service deleted successfully',
    'toast.slotDeleted': 'Time slot deleted successfully',
    
    // Errors
    'error.fillAllFields': 'Please fill in all fields',
    'error.validEmail': 'Please enter a valid email address',
    'error.validName': 'Please enter a valid full name (at least 2 characters, letters only)',
    'error.strongPassword': 'Password must be at least 8 characters with uppercase, lowercase, and number',
    'error.passwordsMatch': 'Passwords do not match',
    'error.selectDate': 'Please select a date',
    'error.selectSlot': 'Please select a time slot',
    'error.pastDate': 'Cannot book appointments in the past',
    'error.serviceNameRequired': 'Service name is required',
    'error.serviceNameLength': 'Service name must be between 3 and 100 characters',
    'error.durationRange': 'Duration must be between 15 minutes and 8 hours',
    'error.addOneSlot': 'Please add at least one time slot',
    'error.fillSlotFields': 'Please fill in all time slot fields',
    'error.pastSlot': 'Cannot create slots for past dates',
    'error.endAfterStart': 'End time must be after start time',
    
    // Password Strength
    'password.tooShort': 'Password must be at least 8 characters',
    'password.needUppercase': 'Password must contain at least one uppercase letter',
    'password.needLowercase': 'Password must contain at least one lowercase letter',
    'password.needNumber': 'Password must contain at least one number',
    'password.strong': 'Strong password',
  },
  bg: {
    // Auth
    'auth.welcome': 'Добре дошли в GPoint',
    'auth.signIn': 'Влезте в профила си',
    'auth.email': 'Имейл',
    'auth.password': 'Парола',
    'auth.signInButton': 'Вход',
    'auth.signingIn': 'Влизане...',
    'auth.noAccount': 'Нямате акаунт?',
    'auth.createAccount': 'Създай Акаунт',
    'auth.createAccountTitle': 'Създаване на Акаунт',
    'auth.joinToday': 'Присъединете се към GPoint днес',
    'auth.fullName': 'Пълно име',
    'auth.confirmPassword': 'Потвърди паролата',
    'auth.accountType': 'Тип акаунт',
    'auth.user': 'Потребител',
    'auth.specialist': 'Специалист',
    'auth.creatingAccount': 'Създаване на акаунт...',
    'auth.haveAccount': 'Вече имате акаунт?',
    'auth.signInLink': 'Вход',
    
    // Navigation
    'nav.home': 'Начало',
    'nav.appointments': 'Срещи',
    'nav.settings': 'Настройки',
    'nav.statistics': 'Статистика',
    'nav.logout': 'Изход',
    
    // Home
    'home.welcome': 'Добре дошли',
    'home.searchServices': 'Търсене на услуги или специалисти...',
    'home.searchMyServices': 'Търсене на моите услуги...',
    'home.myServices': 'Моите услуги',
    'home.createService': '+ Създай услуга',
    'home.availableServices': 'Налични услуги',
    'home.editService': 'Редактирай услуга',
    'home.book': 'Резервирай',
    'home.noServices': 'Все още няма създадени услуги. Кликнете "Създай услуга" за да добавите.',
    'home.noServicesAvailable': 'Няма налични услуги',
    'home.noSearchResults': 'Няма услуги, отговарящи на търсенето.',
    'home.loadingServices': 'Зареждане на услуги...',
    'home.duration': 'мин',
    
    // Appointments
    'appointments.title': 'Моите срещи',
    'appointments.titleSpecialist': 'Календар със срещи',
    'appointments.subtitle': 'Преглед и управление на насрочените срещи',
    'appointments.subtitleSpecialist': 'Преглед на срещите, организирани по услуга',
    'appointments.noAppointments': 'Все още нямате срещи.',
    'appointments.noAppointmentsUser': 'Резервирайте услуга, за да започнете!',
    'appointments.noAppointmentsSpecialist': 'Клиентите ще резервират вашите услуги.',
    'appointments.scheduled': 'Насрочена',
    'appointments.cancel': 'Отмени',
    'appointments.cancelling': 'Отменяне...',
    'appointments.cancelAppointment': 'Отмяна на среща',
    'appointments.markComplete': 'Маркирай като завършена',
    'appointments.completing': 'Завършване...',
    'appointments.with': 'с',
    'appointments.appointment': 'среща',
    'appointments.appointments': 'срещи',
    
    // Modals
    'modal.close': 'Затвори',
    'modal.cancel': 'Отказ',
    'modal.confirm': 'Потвърди',
    'modal.delete': 'Изтрий',
    'modal.save': 'Запази',
    
    // Booking Modal
    'booking.title': 'Резервиране на среща',
    'booking.duration': 'Продължителност',
    'booking.minutes': 'минути',
    'booking.selectDate': 'Избери дата',
    'booking.selectTime': 'Избери час',
    'booking.loadingTimes': 'Зареждане на свободни часове...',
    'booking.noSlots': 'Няма свободни часове за тази дата',
    'booking.confirmBooking': 'Потвърди резервацията',
    'booking.booking': 'Резервиране...',
    
    // Service Modal
    'service.createNew': 'Създаване на нова услуга',
    'service.editService': 'Редактиране на услуга',
    'service.serviceName': 'Име на услугата',
    'service.description': 'Описание',
    'service.descriptionPlaceholder': 'Опишете вашата услуга...',
    'service.durationMinutes': 'Продължителност (минути)',
    'service.timeSlots': 'Времеви слотове',
    'service.addTimeSlots': 'Добавете свободни часове за тази услуга',
    'service.date': 'Дата',
    'service.startTime': 'Начален час',
    'service.endTime': 'Краен час',
    'service.addSlot': 'Добави слот',
    'service.addedSlots': 'Добавени времеви слотове',
    'service.existingSlots': 'Съществуващи времеви слотове',
    'service.newSlots': 'Добавяне на нови времеви слотове',
    'service.addMoreSlots': 'Добавете още свободни часове',
    'service.noSlots': 'Все още няма времеви слотове',
    'service.booked': '(Резервиран)',
    'service.newSlotsToAdd': 'Нови времеви слотове за добавяне',
    'service.createButton': 'Създай услуга',
    'service.creating': 'Създаване...',
    'service.updateButton': 'Обнови услуга',
    'service.updating': 'Обновяване...',
    'service.deleteButton': 'Изтрий услуга',
    
    // Confirmation Modals
    'confirm.cancelAppointment': 'Отмяна на среща',
    'confirm.cancelAppointmentMsg': 'Сигурни ли сте, че искате да отмените тази среща? Това действие не може да бъде отменено.',
    'confirm.yesCancel': 'Да, отмени',
    'confirm.noKeep': 'Не, запази',
    'confirm.completeAppointment': 'Завършване на среща',
    'confirm.completeAppointmentMsg': 'Маркирай тази среща като завършена? Клиентът ще бъде уведомен.',
    'confirm.markComplete': 'Маркирай като завършена',
    'confirm.notYet': 'Още не',
    'confirm.deleteService': 'Изтриване на услуга?',
    'confirm.deleteServiceMsg': 'Това ще изтрие услугата и всичките ѝ времеви слотове. Резервираните срещи също ще бъдат отменени. Това действие не може да бъде отменено.',
    'confirm.yesDelete': 'Да, изтрий',
    'confirm.deleteSlot': 'Изтриване на времеви слот?',
    'confirm.deleteSlotMsg': 'Сигурни ли сте, че искате да изтриете този времеви слот? Това действие не може да бъде отменено.',
    'confirm.deleting': 'Изтриване...',
    
    // Profile
    'profile.title': 'Профил',
    'profile.accountInfo': 'Информация за акаунта',
    'profile.role': 'Роля',
    'profile.roleUser': 'Потребител',
    'profile.roleSpecialist': 'Специалист',
    'profile.roleAdmin': 'Администратор',
    'profile.editProfile': 'Редактирай профил',
    'profile.saveChanges': 'Запази промените',
    'profile.saving': 'Записване...',
    
    // Settings
    'settings.title': 'Настройки',
    'settings.manageAccount': 'Управлявайте вашия акаунт и предпочитания',
    'settings.appearance': 'Външен вид',
    'settings.darkMode': 'Тъмен режим',
    'settings.darkModeDesc': 'Превключване между светла и тъмна тема',
    'settings.language': 'Език',
    'settings.languageDesc': 'Изберете предпочитан език',
    'settings.notifications': 'Известия',
    'settings.emailNotifications': 'Имейл известия',
    'settings.emailNotificationsDesc': 'Получавайте актуализации по имейл',
    'settings.smsNotifications': 'SMS известия',
    'settings.smsNotificationsDesc': 'Получавайте текстови съобщения',
    'settings.appointmentReminders': 'Напомняния за срещи',
    'settings.appointmentRemindersDesc': 'Получавайте известия преди срещи',
    'settings.bookingPreferences': 'Предпочитания за резервации',
    'settings.autoBooking': 'Автоматична резервация',
    'settings.autoBookingDesc': 'Автоматично потвърждаване на свободни часове',
    'settings.timezone': 'Часова зона',
    'settings.timezoneDesc': 'Задайте вашата часова зона за срещи',
    
    // Statistics
    'stats.title': 'Статистика за срещите',
    'stats.subtitle': 'Преглед на вашите срещи',
    'stats.total': 'Общо срещи',
    'stats.completed': 'Завършени',
    'stats.cancelled': 'Отменени',
    'stats.scheduled': 'Насрочени',
    'stats.completionVsCancellation': 'Завършени спрямо отменени',
    'stats.successRate': 'Процент на успех',
    'stats.noData': 'Все още няма данни за срещи.',
    'stats.noDataDesc': 'Статистиката ще се появи след като имате срещи.',
    
    // Toast Messages
    'toast.loginSuccess': 'Добре дошли отново',
    'toast.registerSuccess': 'Добре дошли в GPoint',
    'toast.profileUpdated': 'Профилът е обновен успешно!',
    'toast.appointmentBooked': 'Срещата е резервирана успешно!',
    'toast.appointmentCancelled': 'Срещата е отменена успешно',
    'toast.appointmentCompleted': 'Срещата е маркирана като завършена',
    'toast.serviceCreated': 'Услугата е създадена успешно!',
    'toast.serviceUpdated': 'Услугата е обновена успешно!',
    'toast.serviceDeleted': 'Услугата е изтрита успешно',
    'toast.slotDeleted': 'Времевият слот е изтрит успешно',
    
    // Errors
    'error.fillAllFields': 'Моля, попълнете всички полета',
    'error.validEmail': 'Моля, въведете валиден имейл адрес',
    'error.validName': 'Моля, въведете валидно пълно име (поне 2 знака, само букви)',
    'error.strongPassword': 'Паролата трябва да е поне 8 знака с главна, малка буква и число',
    'error.passwordsMatch': 'Паролите не съвпадат',
    'error.selectDate': 'Моля, изберете дата',
    'error.selectSlot': 'Моля, изберете времеви слот',
    'error.pastDate': 'Не може да резервирате срещи в миналото',
    'error.serviceNameRequired': 'Име на услугата е задължително',
    'error.serviceNameLength': 'Името на услугата трябва да е между 3 и 100 знака',
    'error.durationRange': 'Продължителността трябва да е между 15 минути и 8 часа',
    'error.addOneSlot': 'Моля, добавете поне един времеви слот',
    'error.fillSlotFields': 'Моля, попълнете всички полета за времеви слот',
    'error.pastSlot': 'Не може да създавате слотове за минали дати',
    'error.endAfterStart': 'Крайният час трябва да е след началния',
    
    // Password Strength
    'password.tooShort': 'Паролата трябва да е поне 8 знака',
    'password.needUppercase': 'Паролата трябва да съдържа поне една главна буква',
    'password.needLowercase': 'Паролата трябва да съдържа поне една малка буква',
    'password.needNumber': 'Паролата трябва да съдържа поне едно число',
    'password.strong': 'Силна парола',
  }
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bg')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const languageTranslations = translations[language] as Record<string, string>;
    return languageTranslations[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
