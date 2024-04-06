namespace MyMovieList.models
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        // Relacje
        public virtual ICollection<UserMovie> UserMovies { get; set; }
    }
}
