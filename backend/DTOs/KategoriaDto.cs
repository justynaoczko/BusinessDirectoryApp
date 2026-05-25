using System.ComponentModel.DataAnnotations;

namespace BusinessDirectory.Api.DTOs;

public class KategoriaDto
{
    public int Id { get; set; }
    public string Nazwa { get; set; } = string.Empty;
    public int LiczbaFirm { get; set; }
}

public class KategoriaCreateDto
{
    [Required, MaxLength(80)]
    public string Nazwa { get; set; } = string.Empty;
}
