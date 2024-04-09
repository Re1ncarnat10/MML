using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace MyMovieList.models
{
    public class User : IdentityUser<int>
    {
        [Required]
        [StringLength(16)]
        public override string Username { get; set; }

        [Required]
        [StringLength(30)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [StringLength(30)]
        [DataType(DataType.EmailAddress)]
        public override string Email { get; set; }

        // Relacje
        public virtual ICollection<UserMovie> UserMovies { get; set; }
    }
}


