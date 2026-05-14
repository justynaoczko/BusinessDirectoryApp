using System.ComponentModel.DataAnnotations;

namespace BusinessDirectory.Api.Models;

public class Kategoria
{
    public int Id { get; set; }

    [Required]
    [MaxLength(80)]
    public string Nazwa { get; set; } = string.Empty;

    public ICollection<Firma> Firmy { get; set; } = new List<Firma>();
}
