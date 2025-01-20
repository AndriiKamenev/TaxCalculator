using System.ComponentModel.DataAnnotations;

namespace TaxCalculator.Server.Data.Models
{
    public class TaxSceme
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public decimal MinSalary { get; set; }
        public decimal? MaxSalary { get; set; } // NULL means no upper limit
        public decimal TaxRate { get; set; }
    }
}
