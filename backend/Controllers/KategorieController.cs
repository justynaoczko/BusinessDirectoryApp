using BusinessDirectory.Api.Data;
using BusinessDirectory.Api.DTOs;
using BusinessDirectory.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusinessDirectory.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class KategorieController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public KategorieController(ApplicationDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<KategoriaDto>>> GetAll()
    {
        var kategorie = await _db.Kategorie
            .OrderBy(k => k.Nazwa)
            .Select(k => new KategoriaDto
            {
                Id = k.Id,
                Nazwa = k.Nazwa,
                LiczbaFirm = k.Firmy.Count
            })
            .ToListAsync();

        return Ok(kategorie);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<KategoriaDto>> Create([FromBody] KategoriaCreateDto dto)
    {
        var istnieje = await _db.Kategorie.AnyAsync(k => k.Nazwa == dto.Nazwa);
        if (istnieje) return Conflict($"Kategoria '{dto.Nazwa}' już istnieje.");

        var kategoria = new Kategoria { Nazwa = dto.Nazwa };
        _db.Kategorie.Add(kategoria);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAll), new KategoriaDto
        {
            Id = kategoria.Id,
            Nazwa = kategoria.Nazwa,
            LiczbaFirm = 0
        });
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var kategoria = await _db.Kategorie.Include(k => k.Firmy).FirstOrDefaultAsync(k => k.Id == id);
        if (kategoria == null) return NotFound();
        if (kategoria.Firmy.Any()) return Conflict("Nie można usunąć kategorii, która ma przypisane firmy.");

        _db.Kategorie.Remove(kategoria);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
