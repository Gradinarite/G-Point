import { useState, useEffect } from 'react';
import { fetchAppointmentsBySpecialistId } from '../shared/api/appointment';
import './Statistics.css';

interface StatisticsProps {
  userId: string;
}

interface Stats {
  total: number;
  completed: number;
  cancelled: number;
  scheduled: number;
}

export default function Statistics({ userId }: StatisticsProps) {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    completed: 0,
    cancelled: 0,
    scheduled: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, [userId]);

  const loadStatistics = async () => {
    try {
      const appointments = await fetchAppointmentsBySpecialistId(userId);
      
      const completed = appointments.filter(a => a.status === 2).length;
      const cancelled = appointments.filter(a => a.status === 3).length;
      const scheduled = appointments.filter(a => a.status === 1).length;
      
      setStats({
        total: appointments.length,
        completed,
        cancelled,
        scheduled
      });
    } catch (error) {
      console.error('Failed to load statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const completedPercentage = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
  const cancelledPercentage = stats.total > 0 ? (stats.cancelled / stats.total) * 100 : 0;

  if (loading) {
    return (
      <div className="statistics-container">
        <div className="statistics-header">
          <h1>Statistics</h1>
        </div>
        <div className="loading-state">Loading statistics...</div>
      </div>
    );
  }

  return (
    <div className="statistics-container">
      <div className="statistics-header">
        <h1>Appointment Statistics</h1>
        <p>Overview of your appointments performance</p>
      </div>

      <div className="statistics-content">
        <div className="stats-cards">
          <div className="stat-card total">
            <div className="stat-icon">📊</div>
            <div className="stat-details">
              <h3>Total Appointments</h3>
              <p className="stat-number">{stats.total}</p>
            </div>
          </div>

          <div className="stat-card completed">
            <div className="stat-icon">✅</div>
            <div className="stat-details">
              <h3>Completed</h3>
              <p className="stat-number">{stats.completed}</p>
              <p className="stat-percentage">{completedPercentage.toFixed(1)}%</p>
            </div>
          </div>

          <div className="stat-card cancelled">
            <div className="stat-icon">❌</div>
            <div className="stat-details">
              <h3>Cancelled</h3>
              <p className="stat-number">{stats.cancelled}</p>
              <p className="stat-percentage">{cancelledPercentage.toFixed(1)}%</p>
            </div>
          </div>

          <div className="stat-card scheduled">
            <div className="stat-icon">📅</div>
            <div className="stat-details">
              <h3>Scheduled</h3>
              <p className="stat-number">{stats.scheduled}</p>
            </div>
          </div>
        </div>

        {stats.total > 0 && (
          <div className="chart-section">
            <h2>Completion vs Cancellation</h2>
            <div className="pie-chart">
              <svg viewBox="0 0 200 200" className="pie-svg">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#e0e0e0"
                  strokeWidth="40"
                />
                {completedPercentage > 0 && (
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="40"
                    strokeDasharray={`${(completedPercentage / 100) * 502.65} 502.65`}
                    strokeDashoffset="0"
                    transform="rotate(-90 100 100)"
                  />
                )}
                {cancelledPercentage > 0 && (
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#f87171"
                    strokeWidth="40"
                    strokeDasharray={`${(cancelledPercentage / 100) * 502.65} 502.65`}
                    strokeDashoffset={`-${(completedPercentage / 100) * 502.65}`}
                    transform="rotate(-90 100 100)"
                  />
                )}
              </svg>
              <div className="chart-center">
                <p className="chart-title">Success Rate</p>
                <p className="chart-value">{(completedPercentage / (completedPercentage + cancelledPercentage) * 100 || 0).toFixed(1)}%</p>
              </div>
            </div>
            
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color completed"></div>
                <span>Completed ({stats.completed})</span>
              </div>
              <div className="legend-item">
                <div className="legend-color cancelled"></div>
                <span>Cancelled ({stats.cancelled})</span>
              </div>
            </div>
          </div>
        )}

        {stats.total === 0 && (
          <div className="empty-stats">
            <p>No appointment data available yet.</p>
            <p>Statistics will appear once you have appointments.</p>
          </div>
        )}
      </div>
    </div>
  );
}
