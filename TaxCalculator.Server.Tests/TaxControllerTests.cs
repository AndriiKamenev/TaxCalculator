using Microsoft.AspNetCore.Mvc;
using Moq;
using TaxCalculator.Server.Controllers;
using TaxCalculator.Server.Data.v1.Request;
using TaxCalculator.Server.Data.v1.Response;
using TaxCalculator.Server.Interfaces;

namespace TaxCalculator.Server.Tests
{
    public class TaxControllerTests
    {
        private readonly Mock<ITaxCalculatorService> _mockService;
        private readonly TaxController _controller;

        public TaxControllerTests()
        {
            _mockService = new Mock<ITaxCalculatorService>();
            _controller = new TaxController(_mockService.Object);
        }

        [Fact]
        public void CalculateTax_ValidInput_ReturnsOkResult()
        {
            // Arrange
            var input = new SalaryInput { GrossAnnualSalary = 40000 };
            var expectedResult = new CalculationResult
            {
                GrossAnnualSalary = 40000,
                GrossMonthlySalary = 3333.33m,
                NetAnnualSalary = 29000m,
                NetMonthlySalary = 2416.67m,
                AnnualTaxPaid = 11000m,
                MonthlyTaxPaid = 916.67m
            };

            _mockService.Setup(s => s.CalculateTax(input.GrossAnnualSalary))
                .Returns(expectedResult);

            // Act
            var result = _controller.CalculateTax(input);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualResult = Assert.IsType<CalculationResult>(okResult.Value);

            Assert.Equal(expectedResult.GrossAnnualSalary, actualResult.GrossAnnualSalary);
            Assert.Equal(expectedResult.NetAnnualSalary, actualResult.NetAnnualSalary);
            Assert.Equal(expectedResult.AnnualTaxPaid, actualResult.AnnualTaxPaid);
        }

        [Fact]
        public void CalculateTax_InvalidInput_ReturnsBadRequest()
        {
            // Arrange
            _controller.ModelState.AddModelError("GrossAnnualSalary", "Required");

            // Act
            var result = _controller.CalculateTax(null);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

    }

}