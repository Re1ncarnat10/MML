namespace MyMovieList.models
{
    public class Genre
    {
        public int GenreId { get; set; }
        public string Name { get; set; }

        // Relacje
        public virtual ICollection<MovieGenre> MovieGenres { get; set; }
    }

    public class MovieGenre
    {
        public int MovieId { get; set; }
        public virtual Movie Movie { get; set; }
        public int GenreId { get; set; }
        public virtual Genre Genre { get; set; }
    }
}
