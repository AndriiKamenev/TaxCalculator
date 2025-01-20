using Microsoft.AspNetCore.Mvc;
using TaxCalculator.Server.Data.v1.Request;
using TaxCalculator.Server.Interfaces;

namespace TaxCalculator.Server.Controllers
{
    [Route("api/tax")]
    [ApiController]
    public class TaxController : ControllerBase
    {
        private readonly ITaxCalculatorService _taxCalculatorService;

        public TaxController(ITaxCalculatorService taxCalculatorService)
        {
            _taxCalculatorService = taxCalculatorService;
        }

        [HttpPost("calculate")]
        public IActionResult CalculateTax([FromBody] SalaryInput input)
        {
            try
            {
                if (input == null || input.GrossAnnualSalary < 0)
                {
                    return BadRequest(new { error = "Gross annual salary must be a positive value." });
                }

                var result = _taxCalculatorService.CalculateTax(input.GrossAnnualSalary);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "An unexpected error occurred." });
            }
        }
    }
}
