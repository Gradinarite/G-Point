using System;
using System.Collections.Generic;
using GPoint.DataAccess.Data;
using GPoint.DataAccess.Data.Entities;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;

namespace GPoint.DataAccess.Context;

public partial class GPointDbContext : DbContext
{
    public GPointDbContext()
    {
        Env.Load();
    }

    public GPointDbContext(DbContextOptions<GPointDbContext> options)
        : base(options)
    {
        Env.Load();
    }

    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Slot> Slots { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        Env.Load();
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer("Server=tcp:gpointserver.database.windows.net,1433;Initial Catalog=GPoint;Persist Security Info=False;User ID=GPOINT-ADMIN;Password=SecretPassword211125!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;");
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Slot>()
            .HasOne(s => s.Specialist)
            .WithMany(u => u.Slots)
            .HasForeignKey(s => s.SpecialistId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Slot>()
            .HasOne(s => s.Service)
            .WithMany(sv => sv.Slots)
            .HasForeignKey(s => s.ServiceId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Appointment>()
            .HasOne(a => a.Slot)
            .WithOne(s => s.Appointment)
            .HasForeignKey<Appointment>(a => a.SlotId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Appointment>()
            .HasOne(a => a.Service)
            .WithMany()
            .HasForeignKey(a => a.ServiceId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Appointment>()
            .HasOne(a => a.User)
            .WithMany(u => u.Appointments)
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Appointment>()
            .HasOne(a => a.Specialist)
            .WithMany(u => u.SpecialistAppointments)
            .HasForeignKey(a => a.SpecialistId)
            .OnDelete(DeleteBehavior.Restrict);

        base.OnModelCreating(modelBuilder);
    }
    
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}