using Microsoft.Extensions.Logging;
using Moq;
using TaxCalculator.Server.Data.Models;
using TaxCalculator.Server.Infrastructure.Services;
using TaxCalculator.Server.Interfaces;

public class TaxCalculatorServiceTests
{
    private Mock<ITaxScemeRepository> _mockTaxScemeRepository;
    private Mock<ILogger<TaxCalculatorService>> _mockLogger;
    private TaxCalculatorService _taxCalculatorService;

    public TaxCalculatorServiceTests()
    {
        _mockTaxScemeRepository = new Mock<ITaxScemeRepository>();
        _mockLogger = new Mock<ILogger<TaxCalculatorService>>();
        _taxCalculatorService = new TaxCalculatorService(_mockTaxScemeRepository.Object, _mockLogger.Object);
    }

    [Fact]
    public void CalculateTax_ShouldReturnCalculationResult_WhenSalaryIsValid()
    {
        // Arrange
        int grossAnnualSalary = 40000;

        var taxScemes = new List<TaxSceme>
        {
            new TaxSceme { MinSalary = 0, MaxSalary = 5000, TaxRate = 0 },
            new TaxSceme { MinSalary = 5000, MaxSalary = 20000, TaxRate = 0.2m },
            new TaxSceme { MinSalary = 20000, MaxSalary = null, TaxRate = 0.4m }
        };

        // Mock the repository to return the tax schemes
        _mockTaxScemeRepository.Setup(repo => repo.GetApplicableTaxScemes(grossAnnualSalary)).Returns(taxScemes);

        // Act
        var result = _taxCalculatorService.CalculateTax(grossAnnualSalary);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(40000, result.GrossAnnualSalary);
        Assert.Equal(29000, result.NetAnnualSalary); // After tax calculation
        Assert.Equal(2416.67m, result.NetMonthlySalary); // Net monthly salary
        Assert.Equal(11000, result.AnnualTaxPaid); // Annual tax paid
        Assert.Equal(916.67m, result.MonthlyTaxPaid); // Monthly tax paid
    }

    [Fact]
    public void CalculateTax_ShouldThrowArgumentException_WhenSalaryIsNegative()
    {
        // Arrange
        int grossAnnualSalary = -1000;

        // Act & Assert
        var exception = Assert.Throws<ArgumentException>(() => _taxCalculatorService.CalculateTax(grossAnnualSalary));
        Assert.Equal("Gross annual salary must be a positive value.", exception.Message);
    }
    
}