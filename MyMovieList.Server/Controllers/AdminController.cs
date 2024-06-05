using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyMovieList.Controllers;
using MyMovieList.models;
using System.Linq;
using System.Threading.Tasks;

namespace MyMovieList.Server.Controllers
{

    [Authorize(Roles = "admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly MyDbContext _context;

        public AdminController(MyDbContext context)
        {
            _context = context;
        }

        // PUT: api/Admin/id
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMovie(int id, Movie movie)
        {
            if (id != movie.MovieId)
            {
                return BadRequest();
            }

            _context.Entry(movie).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        public class MovieViewModel
        {
            public int MovieId { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public int ReleaseYear { get; set; }
            public string GenreName { get; set; }
            public string Image { get; set; }
        }
        public class CreateMovieViewModel
        {
            public string Title { get; set; }
            public string Description { get; set; }
            public int ReleaseYear { get; set; }
            public string GenreName { get; set; }
            public string Image { get; set; }

        }


        // POST: api/Admin
        [HttpPost]
        public async Task<ActionResult<MovieViewModel>> CreateMovie(CreateMovieViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.SelectMany(x => x.Value.Errors.Select(e => e.ErrorMessage)).ToList();
                return BadRequest(new { errors = errors });
            }

            // Sprawdź, czy gatunek o podanej nazwie już istnieje
            var genre = await _context.Genres.FirstOrDefaultAsync(g => g.Name == model.GenreName);

            // Jeśli gatunek nie istnieje, utwórz nowy
            if (genre == null)
            {
                genre = new Genre { Name = model.GenreName };
                _context.Genres.Add(genre);
            }

            var movie = new Movie
            {
                Title = model.Title,
                Description = model.Description,
                ReleaseYear = model.ReleaseYear,
                Image = model.Image,
                MovieGenres = new List<MovieGenre> {
                 new MovieGenre { Genre = genre }
                },
               
            };

            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            var movieViewModel = new MovieViewModel
            {
                MovieId = movie.MovieId,
                Title = movie.Title,
                Description = movie.Description,
                ReleaseYear = movie.ReleaseYear,
                GenreName = genre.Name,
                Image  = movie.Image
            };

            return CreatedAtAction(nameof(MoviesController.GetMovie), "Movies", new { id = movie.MovieId }, movieViewModel);
        }




        // DELETE: api/Admin/id
        [HttpDelete("{id}")]
        public async Task<ActionResult<Movie>> DeleteMovie(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }

            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();

            return movie;
        }

        private bool MovieExists(int id)
        {
            return _context.Movies.Any(e => e.MovieId == id);
        }
    }
}

