using System.ComponentModel.DataAnnotations;

namespace MyMovieList.models
{
    public class User
    {
        public int UserId { get; set; }

        [Required]
        [StringLength(16)]
        public string Username { get; set; }

        [Required]
        [StringLength(30)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [StringLength(30)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        // Relacje
        public virtual ICollection<UserMovie> UserMovies { get; set; }
    }
}

