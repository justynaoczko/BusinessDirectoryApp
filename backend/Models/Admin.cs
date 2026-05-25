using System.ComponentModel.DataAnnotations;

namespace BusinessDirectory.Api.Models;

public class Admin
{
    public int Id { get; set; }

    [Required]
    [MaxLength(60)]
    public string Username { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;
}
