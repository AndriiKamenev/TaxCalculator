using TaxCalculator.Server.Data.Models;

namespace TaxCalculator.Server.Interfaces
{
    public interface ITaxScemeRepository
    {
        IEnumerable<TaxSceme> GetApplicableTaxScemes(int grossAnnualSalary);
    }
}
