using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServices
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddCors((opt) =>
            {
                opt.AddPolicy("CrosPolicy", policy =>
                {
                    policy.AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(cnf => cnf.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));
            services.AddAutoMapper(typeof(MappingProfile).Assembly);
            return services;
        }
    }
}