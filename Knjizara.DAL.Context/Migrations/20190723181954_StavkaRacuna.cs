using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Knjizara.DAL.Context.Migrations
{
    public partial class StavkaRacuna : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StavkeRacuna",
                columns: table => new
                {
                    StavkaRacunaId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Kolicina = table.Column<int>(nullable: false),
                    CenaPoJedinici = table.Column<double>(nullable: false),
                    Barkod = table.Column<int>(nullable: false),
                    SifraRacuna = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StavkeRacuna", x => x.StavkaRacunaId);
                    table.ForeignKey(
                        name: "FK_StavkeRacuna_VrsteProizvoda_Barkod",
                        column: x => x.Barkod,
                        principalTable: "VrsteProizvoda",
                        principalColumn: "Barkod",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StavkeRacuna_Racuni_SifraRacuna",
                        column: x => x.SifraRacuna,
                        principalTable: "Racuni",
                        principalColumn: "SifraRacuna",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StavkeRacuna_Barkod",
                table: "StavkeRacuna",
                column: "Barkod");

            migrationBuilder.CreateIndex(
                name: "IX_StavkeRacuna_SifraRacuna",
                table: "StavkeRacuna",
                column: "SifraRacuna");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StavkeRacuna");
        }
    }
}
