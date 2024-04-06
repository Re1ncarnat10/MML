namespace MyMovieList.models
{
    public class Status
    {
        public int StatusId { get; set; }
        public string Name { get; set; }
        // Relacje
        public virtual ICollection<UserMovie> UserMovies { get; set; }
    }
}
