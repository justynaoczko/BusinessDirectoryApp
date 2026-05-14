using BusinessDirectory.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BusinessDirectory.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Firma> Firmy => Set<Firma>();
    public DbSet<Kategoria> Kategorie => Set<Kategoria>();
    public DbSet<Admin> Admini => Set<Admin>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Firma>()
            .HasOne(f => f.Kategoria)
            .WithMany(k => k.Firmy)
            .HasForeignKey(f => f.KategoriaId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Kategoria>()
            .HasIndex(k => k.Nazwa)
            .IsUnique();

        modelBuilder.Entity<Admin>()
            .HasIndex(a => a.Username)
            .IsUnique();
    }
}
