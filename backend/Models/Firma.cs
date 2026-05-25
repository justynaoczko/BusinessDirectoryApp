using System.ComponentModel.DataAnnotations;

namespace BusinessDirectory.Api.Models;

public class Firma
{
    public int Id { get; set; }

    [Required]
    [MaxLength(120)]
    public string Nazwa { get; set; } = string.Empty;

    [Required]
    [MaxLength(1000)]
    public string Opis { get; set; } = string.Empty;

    [MaxLength(200)]
    public string? Adres { get; set; }

    [MaxLength(40)]
    public string? Telefon { get; set; }

    [MaxLength(120)]
    public string? Email { get; set; }

    [MaxLength(200)]
    public string? Strona { get; set; }

    public int KategoriaId { get; set; }
    public Kategoria? Kategoria { get; set; }

    public DateTime DataDodania { get; set; } = DateTime.UtcNow;
}
