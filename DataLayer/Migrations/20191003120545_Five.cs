using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataLayer.Migrations
{
    public partial class Five : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Supplement");

            migrationBuilder.AddColumn<string>(
                name: "Doctor",
                table: "Departments",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Supplements",
                columns: table => new
                {
                    Column_1 = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Suppl_id = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Cost_excl = table.Column<string>(nullable: true),
                    Cost_incl = table.Column<string>(nullable: true),
                    Perc_inc = table.Column<string>(nullable: true),
                    Cost_client = table.Column<string>(nullable: true),
                    Stock_levels = table.Column<int>(nullable: false),
                    Min_levels = table.Column<int>(nullable: false),
                    Supplier_id = table.Column<string>(nullable: true),
                    Nappi_code = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supplements", x => x.Column_1);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Supplements");

            migrationBuilder.DropColumn(
                name: "Doctor",
                table: "Departments");

            migrationBuilder.CreateTable(
                name: "Supplement",
                columns: table => new
                {
                    SupplementID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Cost = table.Column<int>(nullable: false),
                    CostExclu = table.Column<int>(nullable: false),
                    CostInclu = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    MinLevels = table.Column<int>(nullable: false),
                    NapppiCode = table.Column<string>(nullable: true),
                    StockLevels = table.Column<int>(nullable: false),
                    SupplierID = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supplement", x => x.SupplementID);
                });
        }
    }
}
