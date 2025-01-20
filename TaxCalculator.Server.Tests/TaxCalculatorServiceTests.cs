using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using TaxCalculator.Server.Data;
using TaxCalculator.Server.Data.Models;
using TaxCalculator.Server.Infrastructure.Services;
using TaxCalculator.Server.Interfaces;

namespace TaxCalculator.Server.Tests
{
    public class TaxCalculatorServiceTests
    {
        private readonly ApplicationDbContext _context;
        private readonly Mock<ILogger<TaxCalculatorService>> _mockLogger;
        private readonly ITaxCalculatorService _service;

        public TaxCalculatorServiceTests()
        {
            // Use InMemory Database
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _context = new ApplicationDbContext(options);

            // Seed the database with test data
            _context.TaxSceme.AddRange(
            new TaxSceme { MinSalary = 0, MaxSalary = 5000, TaxRate = 0 },
            new TaxSceme { MinSalary = 5000, MaxSalary = 20000, TaxRate = 0.20M },
            new TaxSceme { MinSalary = 20000, MaxSalary = int.MaxValue, TaxRate = 0.40M }
            );
            _context.SaveChanges();

            _mockLogger = new Mock<ILogger<TaxCalculatorService>>();

            _service = new TaxCalculatorService(_context, _mockLogger.Object);
        }

        [Fact]
        public void CalculateTax_ValidSalary_ReturnsCorrectResult()
        {
            // Arrange
            int grossAnnualSalary = 40000;

            // Act
            var result = _service.CalculateTax(grossAnnualSalary);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(40000, result.GrossAnnualSalary);
            Assert.Equal(3333.33m, result.GrossMonthlySalary);
            Assert.Equal(29000m, result.NetAnnualSalary);
            Assert.Equal(2416.67m, result.NetMonthlySalary);
            Assert.Equal(11000m, result.AnnualTaxPaid);
            Assert.Equal(916.67m, result.MonthlyTaxPaid);

        }

        [Fact]
        public void CalculateTax_NoMatchingTaxBracket_LogsErrorAndThrowsException()
        {
            // Arrange
            int grossAnnualSalary = -1; // Invalid salary to simulate no matching bracket

            // Act & Assert
            var exception = Assert.Throws<ArgumentException>(() => _service.CalculateTax(grossAnnualSalary));
            Assert.Equal("Gross annual salary must be a positive value.", exception.Message);

            // Verify that logger was called with an error message
            _mockLogger.Verify(
                logger => logger.Log(
                    LogLevel.Error,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((obj, t) => obj.ToString().Contains("Gross annual salary cannot be negative.")),
                    It.IsAny<Exception>(),
                    It.IsAny<Func<It.IsAnyType, Exception, string>>()),
                Times.Once);
        
        }
    }
}
