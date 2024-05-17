using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace MyMovieList.models
{
    public class User : IdentityUser<int>
    {
        public virtual ICollection<UserMovie> UserMovies { get; set; } = new List<UserMovie>();
        [Required]
        [StringLength(16)]
        public override string UserName { get; set; }

        [Required]
        [StringLength(30)]
        [DataType(DataType.EmailAddress)]
        public override string Email { get; set; }



    }
}


