using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TaxCalculator.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaxSceme",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MinSalary = table.Column<decimal>(type: "decimal(7,2)", precision: 7, scale: 2, nullable: false),
                    MaxSalary = table.Column<decimal>(type: "decimal(7,2)", precision: 7, scale: 2, nullable: true),
                    TaxRate = table.Column<decimal>(type: "decimal(2,2)", precision: 2, scale: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaxSceme", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "TaxSceme",
                columns: new[] { "Id", "MaxSalary", "MinSalary", "TaxRate" },
                values: new object[,]
                {
                    { 1, 5000m, 0m, 0m },
                    { 2, 20000m, 5000m, 0.20m },
                    { 3, null, 20000m, 0.40m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaxSceme");
        }
    }
}
