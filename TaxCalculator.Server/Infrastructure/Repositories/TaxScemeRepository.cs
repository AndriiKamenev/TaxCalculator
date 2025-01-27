using TaxCalculator.Server.Data;
using TaxCalculator.Server.Data.Models;
using TaxCalculator.Server.Interfaces;

namespace TaxCalculator.Server.Infrastructure.Repositories
{
    public class TaxScemeRepository : ITaxScemeRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<TaxScemeRepository> _logger;

        public TaxScemeRepository(ApplicationDbContext context, ILogger<TaxScemeRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public IEnumerable<TaxSceme> GetApplicableTaxScemes(int grossAnnualSalary)
        {
            try
            {
                return _context.TaxSceme
                    .Where(tb => tb.MinSalary <= grossAnnualSalary)
                    .OrderByDescending(tb => tb.MinSalary)
                    .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching tax schemes for salary: {Salary}", grossAnnualSalary);
                throw new InvalidOperationException("Failed to fetch applicable tax schemes.", ex);
            }
        }
    }
}