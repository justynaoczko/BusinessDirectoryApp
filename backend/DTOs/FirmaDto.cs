using System.ComponentModel.DataAnnotations;

namespace BusinessDirectory.Api.DTOs;

public class FirmaDto
{
    public int Id { get; set; }
    public string Nazwa { get; set; } = string.Empty;
    public string Opis { get; set; } = string.Empty;
    public string? Adres { get; set; }
    public string? Telefon { get; set; }
    public string? Email { get; set; }
    public string? Strona { get; set; }
    public int KategoriaId { get; set; }
    public string KategoriaNazwa { get; set; } = string.Empty;
    public DateTime DataDodania { get; set; }
}

public class FirmaCreateDto
{
    [Required, MaxLength(120)]
    public string Nazwa { get; set; } = string.Empty;

    [Required, MaxLength(1000)]
    public string Opis { get; set; } = string.Empty;

    [MaxLength(200)]
    public string? Adres { get; set; }

    [MaxLength(40)]
    public string? Telefon { get; set; }

    [MaxLength(120), EmailAddress]
    public string? Email { get; set; }

    [MaxLength(200)]
    public string? Strona { get; set; }

    [Required]
    public int KategoriaId { get; set; }
}

public class FirmaUpdateDto : FirmaCreateDto
{
}
