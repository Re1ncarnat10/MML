using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyMovieList.Controllers;
using MyMovieList.models;
using System.Linq;
using System.Threading.Tasks;

namespace MyMovieList.Server.Controllers
{

    //[Authorize]
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

        public class CreateMovieViewModel
        {
           
            public string? Title { get; set; }
            public string? Description { get; set; }
            public int ReleaseYear { get; set; }
        }

        // POST: api/Admin
        [HttpPost]
        public async Task<ActionResult<Movie>> CreateMovie(CreateMovieViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.SelectMany(x => x.Value.Errors.Select(e => e.ErrorMessage)).ToList();
                return BadRequest(new { errors = errors });
            }

            var movie = new Movie
            {
                Title = model.Title,
                Description = model.Description,
                ReleaseYear = model.ReleaseYear
            };

            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(MoviesController.GetMovie), "Movies", new { id = movie.MovieId }, movie);
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

