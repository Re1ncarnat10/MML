using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyMovieList.models;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MyMovieList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public MoviesController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Movies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movie>>> GetMovies()
        {
            return await _context.Movies.ToListAsync();
        }

        // GET: api/Movies/id
        [HttpGet("{id}")]
        public async Task<ActionResult<Movie>> GetMovie(int id)
        {
            var movie = await _context.Movies.FindAsync(id);

            if (movie == null)
            {
                return NotFound();
            }

            return movie;
        }

        // Metody dla użytkownika do dodawania filmów do listy, usuwania filmów z listy, zmiany statusu filmu na liście, dodawania filmu do ulubionych, dodawania oceny filmu

        // POST: api/Movies/AddToMyList/id
        [Authorize]
        [HttpPost("AddToMyList/{id}")]
        public async Task<ActionResult> AddToMyList(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Pobierz identyfikator użytkownika z kontekstu autentykacji

            var userMovie = await _context.UserMovies.FirstOrDefaultAsync(u => u.UserId == int.Parse(userId) && u.MovieId == id);
            if (userMovie != null)
            {
                return BadRequest("Film jest już na liście użytkownika");
            }

            userMovie = new UserMovie { UserId = int.Parse(userId), MovieId = id };
            _context.UserMovies.Add(userMovie);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/Movies/UpdateMyList/id
        [Authorize]
        [HttpPut("UpdateMyList/{id}")]
        public async Task<ActionResult> UpdateMyList(int id, UserMovie userMovieUpdate)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Pobierz identyfikator użytkownika z kontekstu autentykacji

            var userMovie = await _context.UserMovies.FirstOrDefaultAsync(u => u.UserId == int.Parse(userId) && u.MovieId == id);
            if (userMovie == null)
            {
                return NotFound();
            }

            userMovie.StatusId = userMovieUpdate.StatusId;
            userMovie.IsFavorite = userMovieUpdate.IsFavorite;
            userMovie.Rating = userMovieUpdate.Rating;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Movies/MyList
        [Authorize]
        [HttpGet("MyList")]
        public async Task<ActionResult<IEnumerable<UserMovie>>> GetMyList()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Pobierz identyfikator użytkownika z kontekstu autentykacji

            var userMovies = await _context.UserMovies
                .Include(u => u.Movie)
                .Include(u => u.Status)
                .Where(u => u.UserId == int.Parse(userId))
                .ToListAsync();

            return userMovies;
        }
        // DELETE: api/Movies/RemoveFromMyList/id
        [Authorize]
        [HttpDelete("RemoveFromMyList/{id}")]
        public async Task<ActionResult> RemoveFromMyList(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Pobierz identyfikator użytkownika z kontekstu autentykacji

            var userMovie = await _context.UserMovies.FirstOrDefaultAsync(u => u.UserId == int.Parse(userId) && u.MovieId == id);
            if (userMovie == null)
            {
                return NotFound();
            }

            _context.UserMovies.Remove(userMovie);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}


