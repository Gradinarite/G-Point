# Database Setup Instructions

## Running the Seed Data Script

To populate your database with test data (specialists, services, and time slots), follow these steps:

### Option 1: Using SQL Server Management Studio (SSMS)

1. Open SQL Server Management Studio
2. Connect to your database server
3. Open the `seed-data.sql` file located in `GPoint.DataAccess/seed-data.sql`
4. Select your GPoint database from the dropdown
5. Click "Execute" or press F5
6. You should see a message: "Seed data inserted successfully!"

### Option 2: Using Visual Studio

1. Open Server Explorer (View → Server Explorer)
2. Connect to your SQL Server database
3. Right-click on your GPoint database → New Query
4. Copy and paste the contents of `seed-data.sql`
5. Execute the query

### Option 3: Using Command Line (sqlcmd)

```powershell
sqlcmd -S your_server_name -d GPointDb -i "C:\Users\stili\WebstormProjects\G-Point\GPoint\GPoint.DataAccess\seed-data.sql"
```

## What Data is Created

The script creates:

- **6 Specialists** (Role = 2):
  - John Smith (Haircut specialist)
  - Sarah Johnson (Massage therapist)
  - Michael Brown (Consultant)
  - Emily Davis (Hair stylist)
  - David Wilson (Treatment specialist)
  - Lisa Anderson (Physical therapist)

- **6 Services**:
  - Haircut (30 min)
  - Massage (60 min)
  - Consultation (45 min)
  - Styling (40 min)
  - Treatment (90 min)
  - Therapy (75 min)

- **Slots**: 7 days worth of hourly time slots (9 AM - 5 PM) for each service

## Testing the Application

After running the seed script:

1. Make sure your backend is running:
   ```powershell
   cd GPoint\GPoint.API
   dotnet run
   ```

2. Make sure your frontend is running:
   ```powershell
   cd GPoint-Front\GPoint
   npm run dev
   ```

3. Login to the application
4. Navigate to the Home tab
5. You should now see 6 services with specialist information
6. Click "Book" on any service
7. Select a date and time slot
8. Confirm the booking
9. Check the Appointments tab to see your booked appointment

## Troubleshooting

- If you get "Foreign key constraint" errors, make sure your Users table exists first
- If the script fails, you may need to comment out the DELETE statements at the beginning
- Check your connection string in `appsettings.json` or `.env` file
- Make sure the database name matches your actual database name
