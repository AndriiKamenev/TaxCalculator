using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using TaxCalculator.Server.Data;
using TaxCalculator.Server.Data.Models;
using TaxCalculator.Server.Infrastructure.Repositories;
namespace TaxCalculator.Server.Tests
{
    public class TaxScemeRepositoryTests
    {
        private readonly ApplicationDbContext _context;
        private readonly Mock<ILogger<TaxScemeRepository>> _mockLogger;
        private readonly TaxScemeRepository _repository;

        public TaxScemeRepositoryTests()
        {
            // Configure the in-memory database
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "TaxScemeTestDb")
                .Options;

            // Initialize the ApplicationDbContext with the in-memory database
            _context = new ApplicationDbContext(options);

            // Mock the logger
            _mockLogger = new Mock<ILogger<TaxScemeRepository>>();

            // Initialize the repository with the real context and mocked logger
            _repository = new TaxScemeRepository(_context, _mockLogger.Object);
        }

        [Fact]
        public void GetApplicableTaxScemes_ShouldReturnApplicableTaxScemes()
        {
            // Arrange
            int grossAnnualSalary = 50000;

            // Seed the in-memory database
            _context.TaxSceme.AddRange(new List<TaxSceme>
        {
            new TaxSceme { Id = 1, MinSalary = 0, MaxSalary = 5000, TaxRate = 0m },
            new TaxSceme { Id = 2, MinSalary = 5000, MaxSalary = 200000, TaxRate =  0.2m },
            new TaxSceme { Id = 3, MinSalary = 20000, MaxSalary = null, TaxRate = 0.4m }
        });
            _context.SaveChanges();

            // Act
            var result = _repository.GetApplicableTaxScemes(grossAnnualSalary);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(3, result.Count());
            Assert.Equal(3, result.First().Id);
        }
    }
}
