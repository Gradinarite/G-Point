using GPoint.App.Interfaces;
using GPoint.App.Services;
using GPoint.DataAccess.Context;
using GPoint.DataAccess.Data;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Swagger;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

builder.Services.AddAuthorization();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy  =>
        {
            policy.WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

builder.Services.AddOpenApi();
builder.Services.AddDbContext<GPointDbContext>(options =>
    options.UseSqlServer("Server=tcp:gpointserver.database.windows.net,1433;Initial Catalog=GPoint;Persist Security Info=False;User ID=GPOINT-ADMIN;Password=SecretPassword211125!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;"));

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IServiceService, ServiceService>();
builder.Services.AddScoped<ISlotService, SlotService>();
builder.Services.AddScoped<IAppointmentService, AppointmentService>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReact");
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();