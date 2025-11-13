-- Seed data for GPoint database
-- Run this script to populate the database with test specialists, services, and slots

-- Clear existing data (optional - comment out if you want to keep existing data)
DELETE FROM Appointments;
DELETE FROM Slots;
DELETE FROM Services;
DELETE FROM Users WHERE Role = 2; -- Only delete specialists

-- Insert Specialists (Role = 2)
DECLARE @Specialist1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Specialist2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Specialist3 UNIQUEIDENTIFIER = NEWID();
DECLARE @Specialist4 UNIQUEIDENTIFIER = NEWID();
DECLARE @Specialist5 UNIQUEIDENTIFIER = NEWID();
DECLARE @Specialist6 UNIQUEIDENTIFIER = NEWID();

INSERT INTO Users (Id, FullName, Email, PasswordHash, Role) VALUES
(@Specialist1, 'John Smith', 'john.smith@gpoint.com', 'password123', 2),
(@Specialist2, 'Sarah Johnson', 'sarah.johnson@gpoint.com', 'password123', 2),
(@Specialist3, 'Michael Brown', 'michael.brown@gpoint.com', 'password123', 2),
(@Specialist4, 'Emily Davis', 'emily.davis@gpoint.com', 'password123', 2),
(@Specialist5, 'David Wilson', 'david.wilson@gpoint.com', 'password123', 2),
(@Specialist6, 'Lisa Anderson', 'lisa.anderson@gpoint.com', 'password123', 2);

-- Insert Services
DECLARE @Service1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Service2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Service3 UNIQUEIDENTIFIER = NEWID();
DECLARE @Service4 UNIQUEIDENTIFIER = NEWID();
DECLARE @Service5 UNIQUEIDENTIFIER = NEWID();
DECLARE @Service6 UNIQUEIDENTIFIER = NEWID();

INSERT INTO Services (ServiceId, Name, Description, DurationInMinutes, SpecialistId) VALUES
(@Service1, 'Haircut', 'Professional haircut service with styling', 30, @Specialist1),
(@Service2, 'Massage', 'Relaxing full body massage therapy', 60, @Specialist2),
(@Service3, 'Consultation', 'Expert health and wellness consultation', 45, @Specialist3),
(@Service4, 'Styling', 'Professional hair styling for special occasions', 40, @Specialist4),
(@Service5, 'Treatment', 'Specialized therapeutic treatment session', 90, @Specialist5),
(@Service6, 'Therapy', 'Physical therapy and rehabilitation', 75, @Specialist6);

-- Insert Slots for the next 7 days (9 AM to 5 PM, hourly slots)
DECLARE @CurrentDate DATE = CAST(GETDATE() AS DATE);
DECLARE @DayOffset INT = 0;
DECLARE @Hour INT;
DECLARE @SlotDate DATETIME;

WHILE @DayOffset < 7
BEGIN
    SET @Hour = 9;
    WHILE @Hour < 17
    BEGIN
        SET @SlotDate = DATEADD(HOUR, @Hour, CAST(DATEADD(DAY, @DayOffset, @CurrentDate) AS DATETIME));
        
        -- Slots for Service 1 (Haircut)
        INSERT INTO Slots (Id, SpecialistId, ServiceId, StartTime, EndTime, IsBooked)
        VALUES (NEWID(), @Specialist1, @Service1, @SlotDate, DATEADD(MINUTE, 30, @SlotDate), 0);
        
        -- Slots for Service 2 (Massage)
        INSERT INTO Slots (Id, SpecialistId, ServiceId, StartTime, EndTime, IsBooked)
        VALUES (NEWID(), @Specialist2, @Service2, @SlotDate, DATEADD(MINUTE, 60, @SlotDate), 0);
        
        -- Slots for Service 3 (Consultation)
        INSERT INTO Slots (Id, SpecialistId, ServiceId, StartTime, EndTime, IsBooked)
        VALUES (NEWID(), @Specialist3, @Service3, @SlotDate, DATEADD(MINUTE, 45, @SlotDate), 0);
        
        -- Slots for Service 4 (Styling)
        INSERT INTO Slots (Id, SpecialistId, ServiceId, StartTime, EndTime, IsBooked)
        VALUES (NEWID(), @Specialist4, @Service4, @SlotDate, DATEADD(MINUTE, 40, @SlotDate), 0);
        
        -- Slots for Service 5 (Treatment)
        INSERT INTO Slots (Id, SpecialistId, ServiceId, StartTime, EndTime, IsBooked)
        VALUES (NEWID(), @Specialist5, @Service5, @SlotDate, DATEADD(MINUTE, 90, @SlotDate), 0);
        
        -- Slots for Service 6 (Therapy)
        INSERT INTO Slots (Id, SpecialistId, ServiceId, StartTime, EndTime, IsBooked)
        VALUES (NEWID(), @Specialist6, @Service6, @SlotDate, DATEADD(MINUTE, 75, @SlotDate), 0);
        
        SET @Hour = @Hour + 1;
    END
    
    SET @DayOffset = @DayOffset + 1;
END

-- Verify the data
SELECT 'Specialists' AS DataType, COUNT(*) AS Count FROM Users WHERE Role = 2
UNION ALL
SELECT 'Services', COUNT(*) FROM Services
UNION ALL
SELECT 'Slots', COUNT(*) FROM Slots;

PRINT 'Seed data inserted successfully!';
