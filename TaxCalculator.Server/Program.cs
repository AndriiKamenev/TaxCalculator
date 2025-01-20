using Microsoft.EntityFrameworkCore;
using TaxCalculator.Server.Data;
using TaxCalculator.Server.Infrastructure.Services;
using TaxCalculator.Server.Interfaces;
using Lamar.Microsoft.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.WriteIndented = true;
    });

// Attention: the following commented section works pretty well, but was commented to provide registration
// using Lamar (lightweight IoC container for .NET) that is preferable approach for a big applications.

//// Register the service
//builder.Services.AddScoped<ITaxCalculatorService, TaxCalculatorService>();

////Add ApplicationDbContext and SQL Server support
//builder.Services.AddDbContext<ApplicationDbContext>(options =>
//    options.UseSqlServer(
//    builder.Configuration.GetConnectionString("TaxCalculatorConnection")
//    )
//);

// Use Lamar as the IoC container
builder.Host.UseLamar((context, registry) =>
{
    // Register DbContext
    registry.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(context.Configuration.GetConnectionString("TaxCalculatorConnection")));

    // Register services
    registry.For<ITaxCalculatorService>().Use<TaxCalculatorService>();

    // Optionally register other services as needed
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
