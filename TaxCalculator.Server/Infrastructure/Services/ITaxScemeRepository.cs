using TaxCalculator.Server.Data.Models;

namespace TaxCalculator.Server.Infrastructure.Services
{
    public interface ITaxScemeRepository
    {
        IEnumerable<TaxSceme> GetApplicableTaxScemes(int grossAnnualSalary);
    }
}
