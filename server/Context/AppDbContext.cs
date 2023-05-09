using ex_1.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;


namespace ex_1.Context
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
        {

        }

        public DbSet<User> User {get; set; }

        public DbSet<Project> Project { get; set; }

    }


}