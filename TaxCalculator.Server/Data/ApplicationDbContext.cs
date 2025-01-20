using Microsoft.EntityFrameworkCore;
using TaxCalculator.Server.Data.Models;

namespace TaxCalculator.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        #region Constructor
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }
        #endregion Constructor

        #region Properties
        public DbSet<TaxSceme> TaxSceme { get; set; }
        #endregion Properties

        #region Methods
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaxSceme>().HasData(
                new TaxSceme { Id = 1, MinSalary = 0, MaxSalary = 5000, TaxRate = 0 },
                new TaxSceme { Id = 2, MinSalary = 5000, MaxSalary = 20000, TaxRate = 0.20M },
                new TaxSceme { Id = 3, MinSalary = 20000, MaxSalary = null, TaxRate = 0.40M }
            );

            // Specify precision and scale for decimal properties
            modelBuilder.Entity<TaxSceme>()
                .Property(t => t.MinSalary)
                .HasPrecision(7, 2);  // Precision: 7 total digits, Scale: 2 digits after the decimal point

            modelBuilder.Entity<TaxSceme>()
                .Property(t => t.MaxSalary)
                .HasPrecision(7, 2);  // Precision: 7 total digits, Scale: 2 digits after the decimal point

            modelBuilder.Entity<TaxSceme>()
                .Property(t => t.TaxRate)
                .HasPrecision(2, 2);  // Precision: 2 total digits, Scale: 2 digits after the decimal point (for tax rates)

            // Map Entity names to DB Table names
            modelBuilder.Entity<TaxSceme>().ToTable("TaxSceme");
        }
        #endregion Methods
    }
}
