using System;
using System.Collections.Generic;
using GPoint.DataAccess.Data;
using GPoint.DataAccess.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace GPoint.DataAccess.Context;

public partial class GPointDbContext : DbContext
{
    public GPointDbContext()
    {
    }

    public GPointDbContext(DbContextOptions<GPointDbContext> options)
        : base(options)
    {
    }
    
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Slot> Slots { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer(Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
