using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Knjizara.DAL.Context.Migrations
{
    public partial class VrsteProizvoda : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VrsteProizvoda",
                columns: table => new
                {
                    Barkod = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Naziv = table.Column<string>(nullable: true),
                    Cena = table.Column<double>(nullable: false),
                    Kolicina = table.Column<int>(nullable: false),
                    Proizvodjac = table.Column<string>(nullable: true),
                    ZemljaPorekla = table.Column<string>(nullable: true),
                    ProizvodID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VrsteProizvoda", x => x.Barkod);
                    table.ForeignKey(
                        name: "FK_VrsteProizvoda_Proizvodi_ProizvodID",
                        column: x => x.ProizvodID,
                        principalTable: "Proizvodi",
                        principalColumn: "ProizvodID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VrsteProizvoda_ProizvodID",
                table: "VrsteProizvoda",
                column: "ProizvodID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VrsteProizvoda");
        }
    }
}
