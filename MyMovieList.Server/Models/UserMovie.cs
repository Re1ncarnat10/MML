namespace MyMovieList.models
{
    public class UserMovie
    {
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public int MovieId { get; set; }
        public virtual Movie Movie { get; set; }
        public int StatusId { get; set; }
        public virtual Status Status { get; set; }
        public bool IsFavorite { get; set; }
        public int? Rating { get; set; }
    }
}
