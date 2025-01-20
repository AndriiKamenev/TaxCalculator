using NuGet.DependencyResolver;
using TaxCalculator.Server.Data;
using TaxCalculator.Server.Data.v1.Response;
using TaxCalculator.Server.Interfaces;

namespace TaxCalculator.Server.Infrastructure.Services
{
    public class TaxCalculatorService: ITaxCalculatorService, IDisposable
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<TaxCalculatorService> _logger;

        public TaxCalculatorService(ApplicationDbContext context, ILogger<TaxCalculatorService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public TaxCalculatorService(ApplicationDbContext @object)
        {
            this.@object = @object;
        }

        public CalculationResult CalculateTax(int grossAnnualSalary)
        {
            try
            {
                if (grossAnnualSalary < 0)
                {
                    _logger.LogError("Gross annual salary cannot be negative.");
                    throw new ArgumentException("Gross annual salary must be a positive value.");
                }

                // Find the applicable tax scemes using LINQ
                var taxScemes = _context.TaxSceme
                    .Where(tb => tb.MinSalary <= grossAnnualSalary)
                    .OrderByDescending(tb => tb.MinSalary);
                    //.FirstOrDefault();

                if (taxScemes == null)
                {
                    _logger.LogError("No tax sceme found for salary: {Salary}", grossAnnualSalary);
                    throw new InvalidOperationException("No applicable tax sceme found.");
                }

                decimal annualTax = 0;
                foreach (var taxSceme in taxScemes)
                {
                    annualTax += (Math.Min(grossAnnualSalary, taxSceme.MaxSalary ?? grossAnnualSalary) - taxSceme.MinSalary) * taxSceme.TaxRate;
                }

                var netAnnualSalary = grossAnnualSalary - annualTax;

                var calculationResult = new CalculationResult
                {
                    GrossAnnualSalary = grossAnnualSalary,
                    GrossMonthlySalary = Math.Round(grossAnnualSalary / 12m, 2),
                    NetAnnualSalary = Math.Round(netAnnualSalary, 2),
                    NetMonthlySalary = Math.Round(netAnnualSalary / 12m, 2),
                    AnnualTaxPaid = Math.Round(annualTax, 2),
                    MonthlyTaxPaid = Math.Round(annualTax / 12m, 2)
                };


                _logger.LogInformation("Tax calculated successfully for salary: {Salary}", grossAnnualSalary);
                return calculationResult;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while calculating tax.");
                throw;
            }
        }

        #region Dispose

        // Flag: Has Dispose already been called?
        private bool _disposed;
        private ApplicationDbContext @object;

        // Instantiate a SafeHandle instance.
        readonly System.Runtime.InteropServices.SafeHandle _handle = new Microsoft.Win32.SafeHandles.SafeFileHandle(IntPtr.Zero, true);

        private void Dispose(bool disposing)
        {
            if (_disposed)
                return;

            if (disposing)
            {
                _handle.Dispose();
            }
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        ~TaxCalculatorService()
        {
            Dispose(false);
        }

        // https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose
        #endregion

    }
}
