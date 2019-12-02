using MessageBoardBackend.Data;
using MessageBoardBackend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace MessageBoardBackend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // SetUp Im memory database
            services.AddDbContext<ApiContext>(opt =>
                opt.UseInMemoryDatabase("MessageBoardBackend"));            

            //To Enable Cors
            services.AddCors(options => options.AddPolicy("Cors",
                builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                }));

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret phrase"));

            //To Setup Authentication Middleware

            services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(cfg => {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = signingKey,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true
                };
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            //Add Authentication Middleware
            app.UseAuthentication();

            app.UseHttpsRedirection();
            app.UseCors("Cors");
            app.UseMvc();

            var context = serviceProvider.GetService<ApiContext>();
            SeedData(context);
        }

        public void SeedData(ApiContext context)
        {
            context.Messages.Add(new Message
            {
                Owner = "John",
                Text = "Hello"
            });
            context.Messages.Add(new Message
            {
                Owner = "Tim",
                Text = "Hi"
            });

            context.Users.Add(new User
            {
                Email = "a",
                FirstName = "Tim",
                LastName = "Dan",
                Password = "a",
                Id="1"
            });

            context.SaveChanges();  
        }
    }
}
