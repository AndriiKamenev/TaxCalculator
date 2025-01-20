using TaxCalculator.Server.Data.v1.Response;

namespace TaxCalculator.Server.Interfaces
{
    public interface ITaxCalculatorService
    {
        CalculationResult CalculateTax(int grossAnnualSalary);
    }
}
