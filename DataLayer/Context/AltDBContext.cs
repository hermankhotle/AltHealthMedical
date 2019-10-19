using DataLayer.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataLayer.Context
{
    public class AltDBContext : IdentityDbContext
    {
        public AltDBContext(DbContextOptions options):base(options)
        {

        }

        public DbSet<RegistrationUser> RegistrationUsers { get; set; }
    }
}
