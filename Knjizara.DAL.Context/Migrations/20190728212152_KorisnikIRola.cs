using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Knjizara.DAL.Context.Migrations
{
    public partial class KorisnikIRola : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    RolaId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Naziv = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.RolaId);
                });

            migrationBuilder.CreateTable(
                name: "Korisnici",
                columns: table => new
                {
                    KorisnikId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    KorisnickoIme = table.Column<string>(nullable: true),
                    Mail = table.Column<string>(nullable: true),
                    Ime = table.Column<string>(nullable: true),
                    Prezime = table.Column<string>(nullable: true),
                    Lozinka = table.Column<string>(nullable: true),
                    DatumRodjenja = table.Column<DateTime>(nullable: false),
                    Pol = table.Column<string>(nullable: true),
                    Telefon = table.Column<string>(nullable: true),
                    Plata = table.Column<double>(nullable: false),
                    RolaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnici", x => x.KorisnikId);
                    table.ForeignKey(
                        name: "FK_Korisnici_Role_RolaId",
                        column: x => x.RolaId,
                        principalTable: "Role",
                        principalColumn: "RolaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Korisnici_RolaId",
                table: "Korisnici",
                column: "RolaId");

            migrationBuilder.Sql("insert into Role (Naziv) values (N'Menadzer'), (N'Radnik')");

            migrationBuilder.Sql("insert into Korisnici (KorisnickoIme, Mail, Ime, Prezime, Lozinka, DatumRodjenja, Pol, Telefon, Plata, RolaId)" +
                                "values (N'Admin', N'admin@gmail.com', N'John', N'Doe', N'admin', '1981-06-05 22:00:00.0000000', N'Muski', N'0129876543', 120000, (select top 1 RolaID from Role))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Korisnici");

            migrationBuilder.DropTable(
                name: "Role");
        }
    }
}
