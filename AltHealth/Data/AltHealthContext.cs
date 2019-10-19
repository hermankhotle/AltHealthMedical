using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AltHealthDBLayer.Models;

namespace AltHealth.Models
{
    public class AltHealthContext : DbContext
    {
        public AltHealthContext (DbContextOptions<AltHealthContext> options)
            : base(options)
        {
        }
        public DbSet<AltHealthDBLayer.Models.ClientData> ClientData { get; set; }
        public DbSet<AltHealthDBLayer.Models.InvoiceInfo> InvoiceInfo { get; set; }
        public DbSet<AltHealthDBLayer.Models.InvoiceItem> InvoiceItem { get; set; }
        public DbSet<AltHealthDBLayer.Models.Suppl_Info> Suppl_Info { get; set; }
        public DbSet<AltHealthDBLayer.Models.Supplement> Supplement { get; set; }
        
    }
}
