import './Skeleton.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export function Skeleton({ width = '100%', height = '20px', borderRadius = '4px', className = '' }: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="service-card skeleton-card">
      <div className="skeleton-header">
        <Skeleton width="40px" height="40px" borderRadius="50%" />
        <div className="skeleton-info">
          <Skeleton width="120px" height="16px" />
          <Skeleton width="60px" height="14px" />
        </div>
      </div>
      <div className="skeleton-content">
        <Skeleton width="80%" height="24px" />
        <Skeleton width="100%" height="16px" />
        <Skeleton width="90%" height="16px" />
        <Skeleton width="120px" height="40px" borderRadius="8px" />
      </div>
    </div>
  );
}

export function AppointmentCardSkeleton() {
  return (
    <div className="appointment-card skeleton-card">
      <div className="skeleton-header">
        <div className="skeleton-date-box">
          <Skeleton width="40px" height="16px" />
          <Skeleton width="80px" height="14px" />
        </div>
        <Skeleton width="80px" height="24px" borderRadius="12px" />
      </div>
      <div className="skeleton-content">
        <Skeleton width="150px" height="20px" />
        <Skeleton width="100px" height="16px" />
        <Skeleton width="100%" height="40px" borderRadius="8px" />
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="stat-card skeleton-card">
      <Skeleton width="60px" height="60px" borderRadius="50%" />
      <div className="skeleton-stat-details">
        <Skeleton width="120px" height="18px" />
        <Skeleton width="60px" height="32px" />
      </div>
    </div>
  );
}
