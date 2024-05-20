using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyMovieList.models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace MyMovieList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;

        public UserController(MyDbContext context, IConfiguration config, UserManager<User> userManager)
        {
            _context = context;
            _config = config;
            _userManager = userManager;
        }

        // GET: api/User
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            return _context.Users.ToList();
        }

        // GET: api/User/id
        [HttpGet("{id}")]
        public ActionResult<User> GetUser(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/User
        [HttpPost]
        public ActionResult<User> PostUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // PUT: api/User/id
        [HttpPut("{id}")]
        public IActionResult PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/User/id
        [HttpDelete("{id}")]
        public ActionResult<User> DeleteUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            _context.SaveChanges();

            return user;
        }

        // POST: api/User/register
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new User { UserName = model.Username, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                // Lista błędów
                var errors = result.Errors.Select(e => e.Description).ToList();
                // Błędy
                return BadRequest(new { errors });
            }

            // Generowanie tokena JWT
            var token = GenerateJwtToken(user);

            return CreatedAtAction("GetUser", new { id = user.Id }, new { user, token });
        }

        // POST: api/User/login
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] LoginRequest loginRequest)
        {
            if (string.IsNullOrEmpty(loginRequest.Username) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest("Nazwa użytkownika i hasło są wymagane.");
            }

            var user = await _userManager.FindByNameAsync(loginRequest.Username);

            if (user == null)
            {
                return BadRequest("Użytkownik o podanej nazwie nie istnieje.");
            }

            var isValid = await _userManager.CheckPasswordAsync(user, loginRequest.Password);

            if (!isValid)
            {
                return BadRequest("Podane hasło jest nieprawidłowe.");
            }

            // Generowanie tokena JWT
            var token = GenerateJwtToken(user);

            return Ok(new { token });
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
    {
        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
    };

            var userRoles = await _userManager.GetRolesAsync(user);
            foreach (var role in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_config["Jwt:ExpireDays"]));

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        public class LoginRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        public class RegisterModel
        {
            public string Username { get; set; }
            public string Password { get; set; }
            public string Email { get; set; }
        }
    }
}
