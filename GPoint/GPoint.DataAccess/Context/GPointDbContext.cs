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
            optionsBuilder.UseSqlServer(Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection"));
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Slot>()
            .HasOne(s => s.Specialist)
            .WithMany(u => u.Slots)
            .HasForeignKey(s => s.SpecialistId)
            .OnDelete(DeleteBehavior.Restrict); // <- stop cascade here

        modelBuilder.Entity<Appointment>()
            .HasOne(a => a.Slot)
            .WithOne(s => s.Appointment)
            .HasForeignKey<Appointment>(a => a.SlotId)
            .OnDelete(DeleteBehavior.Cascade); // keep this cascade

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