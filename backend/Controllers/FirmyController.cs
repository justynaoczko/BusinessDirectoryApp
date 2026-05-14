using BusinessDirectory.Api.Data;
using BusinessDirectory.Api.DTOs;
using BusinessDirectory.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusinessDirectory.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FirmyController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public FirmyController(ApplicationDbContext db)
    {
        _db = db;
    }

    // GET /api/firmy?search=auto&kategoriaId=4
    [HttpGet]
    public async Task<ActionResult<IEnumerable<FirmaDto>>> GetAll(
        [FromQuery] string? search,
        [FromQuery] int? kategoriaId)
    {
        var query = _db.Firmy.Include(f => f.Kategoria).AsQueryable();

        if (kategoriaId.HasValue)
        {
            query = query.Where(f => f.KategoriaId == kategoriaId.Value);
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim().ToLower();
            query = query.Where(f =>
                f.Nazwa.ToLower().Contains(s) ||
                f.Opis.ToLower().Contains(s) ||
                (f.Kategoria != null && f.Kategoria.Nazwa.ToLower().Contains(s)));
        }

        var firmy = await query
            .OrderBy(f => f.Nazwa)
            .Select(f => MapToDto(f))
            .ToListAsync();

        return Ok(firmy);
    }

    // GET /api/firmy/5
    [HttpGet("{id:int}")]
    public async Task<ActionResult<FirmaDto>> GetOne(int id)
    {
        var firma = await _db.Firmy
            .Include(f => f.Kategoria)
            .FirstOrDefaultAsync(f => f.Id == id);

        if (firma == null) return NotFound();
        return Ok(MapToDto(firma));
    }

    // POST /api/firmy (admin)
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<FirmaDto>> Create([FromBody] FirmaCreateDto dto)
    {
        var kategoria = await _db.Kategorie.FindAsync(dto.KategoriaId);
        if (kategoria == null) return BadRequest($"Kategoria o id {dto.KategoriaId} nie istnieje.");

        var firma = new Firma
        {
            Nazwa = dto.Nazwa,
            Opis = dto.Opis,
            Adres = dto.Adres,
            Telefon = dto.Telefon,
            Email = dto.Email,
            Strona = dto.Strona,
            KategoriaId = dto.KategoriaId,
            DataDodania = DateTime.UtcNow
        };

        _db.Firmy.Add(firma);
        await _db.SaveChangesAsync();

        firma.Kategoria = kategoria;
        return CreatedAtAction(nameof(GetOne), new { id = firma.Id }, MapToDto(firma));
    }

    // PUT /api/firmy/5 (admin)
    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] FirmaUpdateDto dto)
    {
        var firma = await _db.Firmy.FindAsync(id);
        if (firma == null) return NotFound();

        if (firma.KategoriaId != dto.KategoriaId)
        {
            var kategoria = await _db.Kategorie.FindAsync(dto.KategoriaId);
            if (kategoria == null) return BadRequest($"Kategoria o id {dto.KategoriaId} nie istnieje.");
        }

        firma.Nazwa = dto.Nazwa;
        firma.Opis = dto.Opis;
        firma.Adres = dto.Adres;
        firma.Telefon = dto.Telefon;
        firma.Email = dto.Email;
        firma.Strona = dto.Strona;
        firma.KategoriaId = dto.KategoriaId;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    // DELETE /api/firmy/5 (admin)
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var firma = await _db.Firmy.FindAsync(id);
        if (firma == null) return NotFound();

        _db.Firmy.Remove(firma);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    private static FirmaDto MapToDto(Firma f) => new()
    {
        Id = f.Id,
        Nazwa = f.Nazwa,
        Opis = f.Opis,
        Adres = f.Adres,
        Telefon = f.Telefon,
        Email = f.Email,
        Strona = f.Strona,
        KategoriaId = f.KategoriaId,
        KategoriaNazwa = f.Kategoria?.Nazwa ?? string.Empty,
        DataDodania = f.DataDodania
    };
}
