using Microsoft.EntityFrameworkCore.Migrations;

namespace MyDreamWebApp.Migrations
{
    public partial class RenameTblComment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Commnets_Posts_PostID",
                table: "Commnets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Commnets",
                table: "Commnets");

            migrationBuilder.RenameTable(
                name: "Commnets",
                newName: "Commets");

            migrationBuilder.RenameIndex(
                name: "IX_Commnets_PostID",
                table: "Commets",
                newName: "IX_Commets_PostID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Commets",
                table: "Commets",
                column: "CommentID");

            migrationBuilder.AddForeignKey(
                name: "FK_Commets_Posts_PostID",
                table: "Commets",
                column: "PostID",
                principalTable: "Posts",
                principalColumn: "PostID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Commets_Posts_PostID",
                table: "Commets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Commets",
                table: "Commets");

            migrationBuilder.RenameTable(
                name: "Commets",
                newName: "Commnets");

            migrationBuilder.RenameIndex(
                name: "IX_Commets_PostID",
                table: "Commnets",
                newName: "IX_Commnets_PostID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Commnets",
                table: "Commnets",
                column: "CommentID");

            migrationBuilder.AddForeignKey(
                name: "FK_Commnets_Posts_PostID",
                table: "Commnets",
                column: "PostID",
                principalTable: "Posts",
                principalColumn: "PostID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
