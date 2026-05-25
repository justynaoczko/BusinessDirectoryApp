using BusinessDirectory.Api.Data;
using BusinessDirectory.Api.DTOs;
using BusinessDirectory.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusinessDirectory.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly TokenService _tokenService;

    public AuthController(ApplicationDbContext db, TokenService tokenService)
    {
        _db = db;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginDto dto)
    {
        var admin = await _db.Admini.FirstOrDefaultAsync(a => a.Username == dto.Username);
        if (admin == null)
        {
            return Unauthorized(new { message = "Nieprawidłowy login lub hasło." });
        }

        var ok = BCrypt.Net.BCrypt.Verify(dto.Password, admin.PasswordHash);
        if (!ok)
        {
            return Unauthorized(new { message = "Nieprawidłowy login lub hasło." });
        }

        var (token, expiresAt) = _tokenService.CreateToken(admin);
        return Ok(new LoginResponseDto
        {
            Token = token,
            Username = admin.Username,
            ExpiresAt = expiresAt
        });
    }

    [HttpGet("me")]
    [Authorize(Roles = "Admin")]
    public IActionResult Me()
    {
        return Ok(new { username = User.Identity?.Name, role = "Admin" });
    }
}
