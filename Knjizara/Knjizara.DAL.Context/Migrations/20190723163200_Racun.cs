using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Knjizara.DAL.Context.Migrations
{
    public partial class Racun : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VrsteProizvoda_Proizvodi_ProizvodID",
                table: "VrsteProizvoda");

            migrationBuilder.RenameColumn(
                name: "ProizvodID",
                table: "VrsteProizvoda",
                newName: "ProizvodId");

            migrationBuilder.RenameIndex(
                name: "IX_VrsteProizvoda_ProizvodID",
                table: "VrsteProizvoda",
                newName: "IX_VrsteProizvoda_ProizvodId");

            migrationBuilder.RenameColumn(
                name: "ProizvodID",
                table: "Proizvodi",
                newName: "ProizvodId");

            migrationBuilder.CreateTable(
                name: "Racuni",
                columns: table => new
                {
                    SifraRacuna = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    VremeIzdavanja = table.Column<DateTime>(nullable: false),
                    UkupanIznos = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Racuni", x => x.SifraRacuna);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_VrsteProizvoda_Proizvodi_ProizvodId",
                table: "VrsteProizvoda",
                column: "ProizvodId",
                principalTable: "Proizvodi",
                principalColumn: "ProizvodId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VrsteProizvoda_Proizvodi_ProizvodId",
                table: "VrsteProizvoda");

            migrationBuilder.DropTable(
                name: "Racuni");

            migrationBuilder.RenameColumn(
                name: "ProizvodId",
                table: "VrsteProizvoda",
                newName: "ProizvodID");

            migrationBuilder.RenameIndex(
                name: "IX_VrsteProizvoda_ProizvodId",
                table: "VrsteProizvoda",
                newName: "IX_VrsteProizvoda_ProizvodID");

            migrationBuilder.RenameColumn(
                name: "ProizvodId",
                table: "Proizvodi",
                newName: "ProizvodID");

            migrationBuilder.AddForeignKey(
                name: "FK_VrsteProizvoda_Proizvodi_ProizvodID",
                table: "VrsteProizvoda",
                column: "ProizvodID",
                principalTable: "Proizvodi",
                principalColumn: "ProizvodID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
