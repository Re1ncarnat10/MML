using Microsoft.EntityFrameworkCore;
using MyMovieList.models;
using System.Collections.Generic;

namespace MyMovieList.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options)
            : base(options)
        {
        }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<UserMovie> UserMovies { get; set; }
    }

}
