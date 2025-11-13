import { useState } from 'react';
import { 
    fetchUser, 
    fetchAllUsers, 
    fetchUserByEmail, 
    fetchSpecialists, 
    createUser, 
    updateUser, 
    deleteUser 
} from '../shared/api/user';
import { 
    fetchAppointment, 
    fetchAllAppointments, 
    fetchAppointmentsByUserId, 
    fetchAppointmentsBySpecialistId, 
    createAppointment, 
    updateAppointment, 
    deleteAppointment, 
    cancelAppointment 
} from '../shared/api/appointment';
import { 
    fetchService, 
    fetchAllServices, 
    fetchServicesBySpecialistId, 
    createService, 
    updateService, 
    deleteService 
} from '../shared/api/service';
import { 
    fetchSlot, 
    fetchAllSlots, 
    fetchSlotsBySpecialistId, 
    fetchSlotsByServiceId, 
    fetchAvailableSlots, 
    fetchAvailableSlotsByService, 
    createSlot, 
    updateSlot, 
    deleteSlot, 
    bookSlot, 
    releaseSlot 
} from '../shared/api/slot';

export function ApiTester() {
    const [activeTab, setActiveTab] = useState<'users' | 'appointments' | 'services' | 'slots'>('users');
    const [result, setResult] = useState<string>('');
    const [error, setError] = useState<string>('');
    
    // Form states
    const [testId, setTestId] = useState<string>('');
    const [testEmail, setTestEmail] = useState<string>('');
    const [testSpecialistId, setTestSpecialistId] = useState<string>('');
    const [testServiceId, setTestServiceId] = useState<string>('');
    const [testUserId, setTestUserId] = useState<string>('');
    const [testStartDate, setTestStartDate] = useState<string>('2025-11-13T09:00:00');
    const [testEndDate, setTestEndDate] = useState<string>('2025-11-13T17:00:00');

    const clearMessages = () => {
        setResult('');
        setError('');
    };

    // ==================== USER TESTS ====================
    const testFetchUser = async () => {
        clearMessages();
        try {
            const user = await fetchUser(testId);
            setResult(JSON.stringify(user, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testFetchAllUsers = async () => {
        clearMessages();
        try {
            const users = await fetchAllUsers();
            setResult(JSON.stringify(users, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testFetchUserByEmail = async () => {
        clearMessages();
        try {
            const user = await fetchUserByEmail(testEmail);
            setResult(JSON.stringify(user, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testFetchSpecialists = async () => {
        clearMessages();
        try {
            const specialists = await fetchSpecialists();
            setResult(JSON.stringify(specialists, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testCreateUser = async () => {
        clearMessages();
        try {
            const newUser = await createUser({
                fullName: "Test User",
                email: "test@example.com",
                password: "Test123!",
                role: 1
            });
            setResult(JSON.stringify(newUser, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testUpdateUser = async () => {
        clearMessages();
        try {
            const updated = await updateUser(testId, {
                fullName: "Updated User",
                email: "updated@example.com",
                role: 1
            });
            setResult(JSON.stringify(updated, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testDeleteUser = async () => {
        clearMessages();
        try {
            await deleteUser(testId);
            setResult('User deleted successfully');
        } catch (err) {
            setError((err as Error).message);
        }
    };

    // ==================== APPOINTMENT TESTS ====================
    const testFetchAppointment = async () => {
        clearMessages();
        try {
            const appointment = await fetchAppointment(testId);
            setResult(JSON.stringify(appointment, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testFetchAllAppointments = async () => {
        clearMessages();
        try {
            const appointments = await fetchAllAppointments();
            setResult(JSON.stringify(appointments, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testFetchAppointmentsByUserId = async () => {
        clearMessages();
        try {
            const appointments = await fetchAppointmentsByUserId(testUserId);
            setResult(JSON.stringify(appointments, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testFetchAppointmentsBySpecialistId = async () => {
        clearMessages();
        try {
            const appointments = await fetchAppointmentsBySpecialistId(testSpecialistId);
            setResult(JSON.stringify(appointments, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testCreateAppointment = async () => {
        clearMessages();
        try {
            const newAppointment = await createAppointment({
                userId: testUserId,
                specialistId: testSpecialistId,
                serviceId: testServiceId,
                slotId: testId
            });
            setResult(JSON.stringify(newAppointment, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testUpdateAppointment = async () => {
        clearMessages();
        try {
            const updated = await updateAppointment({
                id: testId,
                userId: testUserId,
                specialistId: testSpecialistId,
                serviceId: testServiceId,
                slotId: testId
            });
            setResult(JSON.stringify(updated, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testDeleteAppointment = async () => {
        clearMessages();
        try {
            await deleteAppointment(testId);
            setResult('Appointment deleted successfully');
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testCancelAppointment = async () => {
        clearMessages();
        try {
            await cancelAppointment(testId);
            setResult('Appointment cancelled successfully');
        } catch (err) {
            setError((err as Error).message);
        }
    };

    // ==================== SERVICE TESTS ====================
    const testFetchService = async () => {
        clearMessages();
        try {
            const service = await fetchService(testId);
            setResult(JSON.stringify(service, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testFetchAllServices = async () => {
        clearMessages();
        try {
            const services = await fetchAllServices();
            setResult(JSON.stringify(services, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testFetchServicesBySpecialistId = async () => {
        clearMessages();
        try {
            const services = await fetchServicesBySpecialistId(testSpecialistId);
            setResult(JSON.stringify(services, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testCreateService = async () => {
        clearMessages();
        try {
            const newService = await createService({
                name: "Test Service",
                description: "This is a test service",
                durationInMinutes: 60,
                specialistId: testSpecialistId
            });
            setResult(JSON.stringify(newService, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testUpdateService = async () => {
        clearMessages();
        try {
            const updated = await updateService({
                serviceId: testId,
                name: "Updated Service",
                description: "Updated description",
                durationInMinutes: 90,
                specialistId: testSpecialistId
            });
            setResult(JSON.stringify(updated, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testDeleteService = async () => {
        clearMessages();
        try {
            await deleteService(testId);
            setResult('Service deleted successfully');
        } catch (err) {
            setError((err as Error).message);
        }
    };

    // ==================== SLOT TESTS ====================
    const testFetchSlot = async () => {
        clearMessages();
        try {
            const slot = await fetchSlot(testId);
            setResult(JSON.stringify(slot, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testFetchAllSlots = async () => {
        clearMessages();
        try {
            const slots = await fetchAllSlots();
            setResult(JSON.stringify(slots, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testFetchSlotsBySpecialistId = async () => {
        clearMessages();
        try {
            const slots = await fetchSlotsBySpecialistId(testSpecialistId);
            setResult(JSON.stringify(slots, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testFetchSlotsByServiceId = async () => {
        clearMessages();
        try {
            const slots = await fetchSlotsByServiceId(testServiceId);
            setResult(JSON.stringify(slots, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testFetchAvailableSlots = async () => {
        clearMessages();
        try {
            const slots = await fetchAvailableSlots(testSpecialistId, testStartDate, testEndDate);
            setResult(JSON.stringify(slots, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testFetchAvailableSlotsByService = async () => {
        clearMessages();
        try {
            const slots = await fetchAvailableSlotsByService(testServiceId, testStartDate, testEndDate);
            setResult(JSON.stringify(slots, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testCreateSlot = async () => {
        clearMessages();
        try {
            const newSlot = await createSlot({
                serviceId: testServiceId,
                specialistId: testSpecialistId,
                startTime: testStartDate,
                endTime: testEndDate
            });
            setResult(JSON.stringify(newSlot, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testUpdateSlot = async () => {
        clearMessages();
        try {
            const updated = await updateSlot({
                id: testId,
                serviceId: testServiceId,
                specialistId: testSpecialistId,
                startTime: testStartDate,
                endTime: testEndDate
            });
            setResult(JSON.stringify(updated, null, 2));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testDeleteSlot = async () => {
        clearMessages();
        try {
            await deleteSlot(testId);
            setResult('Slot deleted successfully');
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testBookSlot = async () => {
        clearMessages();
        try {
            await bookSlot(testId);
            setResult('Slot booked successfully');
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const testReleaseSlot = async () => {
        clearMessages();
        try {
            await releaseSlot(testId);
            setResult('Slot released successfully');
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
            <h1>API Endpoint Tester</h1>
            
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button 
                    onClick={() => setActiveTab('users')}
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: activeTab === 'users' ? '#007bff' : '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Users
                </button>
                <button 
                    onClick={() => setActiveTab('appointments')}
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: activeTab === 'appointments' ? '#007bff' : '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Appointments
                </button>
                <button 
                    onClick={() => setActiveTab('services')}
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: activeTab === 'services' ? '#007bff' : '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Services
                </button>
                <button 
                    onClick={() => setActiveTab('slots')}
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: activeTab === 'slots' ? '#007bff' : '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Slots
                </button>
            </div>

            {/* Input Fields */}
            <div style={{ 
                marginBottom: '20px', 
                padding: '15px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '4px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px'
            }}>
                {/* Common inputs for all tabs */}
                <input 
                    type="text" 
                    placeholder="ID (for fetch/update/delete)" 
                    value={testId}
                    onChange={(e) => setTestId(e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ced4da', minWidth: '200px' }}
                />
                
                {/* User-specific inputs */}
                {activeTab === 'users' && (
                    <input 
                        type="text" 
                        placeholder="Email" 
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ced4da', minWidth: '200px' }}
                    />
                )}
                
                {/* Appointment-specific inputs */}
                {activeTab === 'appointments' && (
                    <>
                        <input 
                            type="text" 
                            placeholder="User ID" 
                            value={testUserId}
                            onChange={(e) => setTestUserId(e.target.value)}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ced4da', minWidth: '200px' }}
                        />
                        <input 
                            type="text" 
                            placeholder="Specialist ID" 
                            value={testSpecialistId}
                            onChange={(e) => setTestSpecialistId(e.target.value)}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ced4da', minWidth: '200px' }}
                        />
                        <input 
                            type="text" 
                            placeholder="Service ID" 
                            value={testServiceId}
                            onChange={(e) => setTestServiceId(e.target.value)}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ced4da', minWidth: '200px' }}
                        />
                    </>
                )}
                
                {/* Service-specific inputs */}
                {activeTab === 'services' && (
                    <input 
                        type="text" 
                        placeholder="Specialist ID" 
                        value={testSpecialistId}
                        onChange={(e) => setTestSpecialistId(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ced4da', minWidth: '200px' }}
                    />
                )}
                
                {/* Slot-specific inputs */}
                {activeTab === 'slots' && (
                    <>
                        <input 
                            type="text" 
                            placeholder="Specialist ID" 
                            value={testSpecialistId}
                            onChange={(e) => setTestSpecialistId(e.target.value)}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ced4da', minWidth: '200px' }}
                        />
                        <input 
                            type="text" 
                            placeholder="Service ID" 
                            value={testServiceId}
                            onChange={(e) => setTestServiceId(e.target.value)}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ced4da', minWidth: '200px' }}
                        />
                        <input 
                            type="datetime-local" 
                            placeholder="Start Date" 
                            value={testStartDate}
                            onChange={(e) => setTestStartDate(e.target.value)}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ced4da', minWidth: '200px' }}
                        />
                        <input 
                            type="datetime-local" 
                            placeholder="End Date" 
                            value={testEndDate}
                            onChange={(e) => setTestEndDate(e.target.value)}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ced4da', minWidth: '200px' }}
                        />
                    </>
                )}
            </div>

            {/* Test Buttons */}
            <div style={{ marginBottom: '20px' }}>
                <h3 style={{ marginBottom: '10px' }}>Operations:</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
                {activeTab === 'users' && (
                    <>
                        <button onClick={testFetchUser} style={buttonStyle} title="Requires: ID">📄 Fetch User by ID</button>
                        <button onClick={testFetchAllUsers} style={buttonStyle} title="No parameters needed">📋 Fetch All Users</button>
                        <button onClick={testFetchUserByEmail} style={buttonStyle} title="Requires: Email">📧 Fetch User by Email</button>
                        <button onClick={testFetchSpecialists} style={buttonStyle} title="No parameters needed">👥 Fetch Specialists</button>
                        <button onClick={testCreateUser} style={{ ...buttonStyle, backgroundColor: '#28a745' }} title="Uses default test data">➕ Create User</button>
                        <button onClick={testUpdateUser} style={{ ...buttonStyle, backgroundColor: '#ffc107', color: '#000' }} title="Requires: ID">✏️ Update User</button>
                        <button onClick={testDeleteUser} style={{ ...buttonStyle, backgroundColor: '#dc3545' }} title="Requires: ID">🗑️ Delete User</button>
                    </>
                )}
                {activeTab === 'appointments' && (
                    <>
                        <button onClick={testFetchAppointment} style={buttonStyle} title="Requires: ID">📄 Fetch by ID</button>
                        <button onClick={testFetchAllAppointments} style={buttonStyle} title="No parameters needed">📋 Fetch All</button>
                        <button onClick={testFetchAppointmentsByUserId} style={buttonStyle} title="Requires: User ID">👤 Fetch by User ID</button>
                        <button onClick={testFetchAppointmentsBySpecialistId} style={buttonStyle} title="Requires: Specialist ID">👨‍⚕️ Fetch by Specialist ID</button>
                        <button onClick={testCreateAppointment} style={{ ...buttonStyle, backgroundColor: '#28a745' }} title="Requires: User ID, Specialist ID, Service ID, ID (as Slot ID)">➕ Create Appointment</button>
                        <button onClick={testUpdateAppointment} style={{ ...buttonStyle, backgroundColor: '#ffc107', color: '#000' }} title="Requires: ID, User ID, Specialist ID, Service ID">✏️ Update Appointment</button>
                        <button onClick={testDeleteAppointment} style={{ ...buttonStyle, backgroundColor: '#dc3545' }} title="Requires: ID">🗑️ Delete Appointment</button>
                        <button onClick={testCancelAppointment} style={{ ...buttonStyle, backgroundColor: '#ff6b6b' }} title="Requires: ID">❌ Cancel Appointment</button>
                    </>
                )}
                {activeTab === 'services' && (
                    <>
                        <button onClick={testFetchService} style={buttonStyle} title="Requires: ID">📄 Fetch Service by ID</button>
                        <button onClick={testFetchAllServices} style={buttonStyle} title="No parameters needed">📋 Fetch All Services</button>
                        <button onClick={testFetchServicesBySpecialistId} style={buttonStyle} title="Requires: Specialist ID">👨‍⚕️ Fetch by Specialist ID</button>
                        <button onClick={testCreateService} style={{ ...buttonStyle, backgroundColor: '#28a745' }} title="Requires: Specialist ID">➕ Create Service</button>
                        <button onClick={testUpdateService} style={{ ...buttonStyle, backgroundColor: '#ffc107', color: '#000' }} title="Requires: ID (as Service ID), Specialist ID">✏️ Update Service</button>
                        <button onClick={testDeleteService} style={{ ...buttonStyle, backgroundColor: '#dc3545' }} title="Requires: ID">🗑️ Delete Service</button>
                    </>
                )}
                {activeTab === 'slots' && (
                    <>
                        <button onClick={testFetchSlot} style={buttonStyle} title="Requires: ID">📄 Fetch Slot by ID</button>
                        <button onClick={testFetchAllSlots} style={buttonStyle} title="No parameters needed">📋 Fetch All Slots</button>
                        <button onClick={testFetchSlotsBySpecialistId} style={buttonStyle} title="Requires: Specialist ID">👨‍⚕️ Fetch by Specialist ID</button>
                        <button onClick={testFetchSlotsByServiceId} style={buttonStyle} title="Requires: Service ID">🔧 Fetch by Service ID</button>
                        <button onClick={testFetchAvailableSlots} style={buttonStyle} title="Requires: Specialist ID, Start Date, End Date">📅 Get Available Slots</button>
                        <button onClick={testFetchAvailableSlotsByService} style={buttonStyle} title="Requires: Service ID, Start Date, End Date">🔍 Get Available by Service</button>
                        <button onClick={testCreateSlot} style={{ ...buttonStyle, backgroundColor: '#28a745' }} title="Requires: Service ID, Specialist ID, Start Date, End Date">➕ Create Slot</button>
                        <button onClick={testUpdateSlot} style={{ ...buttonStyle, backgroundColor: '#ffc107', color: '#000' }} title="Requires: ID, Service ID, Specialist ID, Start Date, End Date">✏️ Update Slot</button>
                        <button onClick={testDeleteSlot} style={{ ...buttonStyle, backgroundColor: '#dc3545' }} title="Requires: ID">🗑️ Delete Slot</button>
                        <button onClick={testBookSlot} style={{ ...buttonStyle, backgroundColor: '#17a2b8' }} title="Requires: ID (as Slot ID)">🔒 Book Slot</button>
                        <button onClick={testReleaseSlot} style={{ ...buttonStyle, backgroundColor: '#6c757d' }} title="Requires: ID (as Slot ID)">🔓 Release Slot</button>
                    </>
                )}
                </div>
            </div>

            {/* Results Display */}
            <div>
                {error && (
                    <div style={{ 
                        padding: '15px', 
                        backgroundColor: '#f8d7da', 
                        color: '#721c24', 
                        borderRadius: '4px',
                        marginBottom: '10px'
                    }}>
                        <strong>Error:</strong> {error}
                    </div>
                )}
                {result && (
                    <div style={{ 
                        padding: '15px', 
                        backgroundColor: '#d4edda', 
                        color: '#155724', 
                        borderRadius: '4px'
                    }}>
                        <strong>Result:</strong>
                        <pre style={{ 
                            marginTop: '10px', 
                            backgroundColor: '#f8f9fa', 
                            padding: '10px',
                            borderRadius: '4px',
                            overflow: 'auto',
                            maxHeight: '500px'
                        }}>
                            {result}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}

const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
};
