using BusinessDirectory.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BusinessDirectory.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(ApplicationDbContext db, IConfiguration config)
    {
        // Tworzy bazę jeśli nie istnieje. W projekcie studenckim wystarczające - nie używamy migracji.
        await db.Database.EnsureCreatedAsync();

        if (!await db.Kategorie.AnyAsync())
        {
            db.Kategorie.AddRange(
                new Kategoria { Nazwa = "IT" },
                new Kategoria { Nazwa = "Gastronomia" },
                new Kategoria { Nazwa = "Budownictwo" },
                new Kategoria { Nazwa = "Motoryzacja" },
                new Kategoria { Nazwa = "Usługi" },
                new Kategoria { Nazwa = "Prawo" }
            );
            await db.SaveChangesAsync();
        }

        if (!await db.Firmy.AnyAsync())
        {
            var kat = await db.Kategorie.ToDictionaryAsync(k => k.Nazwa, k => k.Id);
            db.Firmy.AddRange(
                new Firma { Nazwa = "Tech-Solution", Opis = "Naprawa komputerów i nowoczesne sieci bezprzewodowe.", KategoriaId = kat["IT"], Telefon = "+48 600 100 200", Email = "kontakt@tech-solution.pl" },
                new Firma { Nazwa = "Pyszne Bułki", Opis = "Tradycyjne wypieki na naturalnym zakwasie.", KategoriaId = kat["Gastronomia"], Telefon = "+48 601 200 300", Adres = "ul. Piekarska 5, Warszawa" },
                new Firma { Nazwa = "Złota Rączka", Opis = "Kompleksowe remonty mieszkań i domów.", KategoriaId = kat["Budownictwo"], Telefon = "+48 602 300 400" },
                new Firma { Nazwa = "Auto-Fix", Opis = "Szybka diagnostyka i mechanika pojazdowa.", KategoriaId = kat["Motoryzacja"], Telefon = "+48 603 400 500", Adres = "ul. Mechaniczna 12, Kraków" },
                new Firma { Nazwa = "Eko-Ogród", Opis = "Projektowanie i pielęgnacja terenów zielonych.", KategoriaId = kat["Usługi"], Strona = "https://eko-ogrod.example" },
                new Firma { Nazwa = "Kancelaria Lex", Opis = "Doradztwo prawne dla osób prywatnych i firm.", KategoriaId = kat["Prawo"], Email = "biuro@kancelaria-lex.pl" }
            );
            await db.SaveChangesAsync();
        }

        if (!await db.Admini.AnyAsync())
        {
            var username = config["AdminSeed:Username"] ?? "admin";
            var password = config["AdminSeed:Password"] ?? "admin123";
            db.Admini.Add(new Admin
            {
                Username = username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password)
            });
            await db.SaveChangesAsync();
        }
    }
}
