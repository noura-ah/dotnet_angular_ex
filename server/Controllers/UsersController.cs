using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ex_1.Context;
using ex_1.Models;
using ex_1.Helpers;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography;

namespace ex_1
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _db;
        public UsersController(AppDbContext appDbContext)
        {
            _db= appDbContext;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User userObj){
            if(userObj == null)
                return BadRequest();
            var user =  _db.User.FirstOrDefault(x => x.Email == userObj.Email );
            if (user == null)
                return NotFound(new { Message = "Email not found "});
            if (!PasswordHasher.VerifyPassword(userObj.Password,user.Password))
                return BadRequest(new{ Message = "Password is incorrect"});

            var token = CreateJwt(user);
            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken,user);

            return Ok( new
            {
                Token = token,
                Id = user.Id,
                Message = "Login success" 
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User userObj){
            if (userObj == null)
                return BadRequest();

            if( CheckEmailExist(userObj.Email))
                return BadRequest(new {
                    Message = "Email exist!"
                });
            userObj.Password  = PasswordHasher.HashPassword(userObj.Password);
            await _db.User.AddAsync(userObj);
            await _db.SaveChangesAsync();

            return Ok(new {
                Message = "Success"
            });
        }

        [HttpGet("refresh")]
        public async Task<ActionResult<string>> RefreshToken(long id)
        {
            var refreshToken = Request.Cookies["refreshToken"];
            Console.Write(id);
            Console.Write("---------------------------");
            if(id == 0)
                return BadRequest();
            var user = await _db.User.FindAsync(id);
            if(!user.RefreshToken.Equals(refreshToken))
            {
                return Forbid();
            }
            else if (user.TokenExpires < DateTime.Now){
                return Forbid("Token Expired");
            }

            var token = CreateJwt(user);
            var newRefreshToken = GenerateRefreshToken();
            SetRefreshToken(newRefreshToken,user);

            return Ok(token);

        }

        private bool CheckEmailExist(string email) => _db.User.Any(x => x.Email == email);

        private string CreateJwt(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("secretsecretsecret");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Email, user.Email)    
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddSeconds(20), 
                SigningCredentials = credentials  
            };

            var token = tokenHandler.CreateToken(tokenDescription);
            return tokenHandler.WriteToken(token);
        }

        private RefreshToken GenerateRefreshToken () 
        {
            var refreshToken = new RefreshToken{
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Created = DateTime.Now,
                Expires = DateTime.Now.AddSeconds(100)
            };

            return refreshToken;
        }

        private void SetRefreshToken(RefreshToken newRefreshToken, User user)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };

            Response.Cookies.Append("refreshToken",newRefreshToken.Token, cookieOptions);

            user.RefreshToken = newRefreshToken.Token;
            user.TokenCreated = newRefreshToken.Created;
            user.TokenExpires = newRefreshToken.Expires;
            _db.SaveChanges();

        }
    }
}