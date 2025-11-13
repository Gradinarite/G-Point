SET QUOTED_IDENTIFIER ON;
GO

IF EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Appointments_SlotId' AND object_id = OBJECT_ID('Appointments'))
BEGIN
    DROP INDEX [IX_Appointments_SlotId] ON [Appointments];
END
GO

CREATE UNIQUE INDEX [IX_Appointments_SlotId] 
ON [Appointments]([SlotId]) 
WHERE [Status] IN (1, 2);
GO
