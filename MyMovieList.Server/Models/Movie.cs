using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace MyMovieList.models
{
    public class Movie
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MovieId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int ReleaseYear { get; set; }

        // Relacje
        public virtual ICollection<MovieGenre> MovieGenres { get; set; }
        public virtual ICollection<UserMovie> UserMovies { get; set; }

        // Średnia ocena filmu
        public double GetAverageRating()
        {
            if (UserMovies == null || UserMovies.Count == 0)
            {
                return 0;
            }

            double sum = 0;
            int count = 0;

            foreach (var userMovie in UserMovies)
            {
                if (userMovie.Rating.HasValue)
                {
                    sum += userMovie.Rating.Value;
                    count++;
                }
            }

            return count > 0 ? sum / count : 0;
        }

        // Zliczanie statusów ulubionych
        public int GetFavoritesCount()
        {
            if (UserMovies == null)
            {
                return 0;
            }

            return UserMovies.Count(um => um.IsFavorite);
        }
    }

}

