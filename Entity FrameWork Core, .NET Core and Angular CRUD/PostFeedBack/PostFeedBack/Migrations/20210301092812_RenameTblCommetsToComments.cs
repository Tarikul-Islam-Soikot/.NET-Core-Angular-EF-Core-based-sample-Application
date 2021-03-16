using Microsoft.EntityFrameworkCore.Migrations;

namespace MyDreamWebApp.Migrations
{
    public partial class RenameTblCommetsToComments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Commets_Posts_PostID",
                table: "Commets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Commets",
                table: "Commets");

            migrationBuilder.RenameTable(
                name: "Commets",
                newName: "Comments");

            migrationBuilder.RenameIndex(
                name: "IX_Commets_PostID",
                table: "Comments",
                newName: "IX_Comments_PostID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Comments",
                table: "Comments",
                column: "CommentID");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Posts_PostID",
                table: "Comments",
                column: "PostID",
                principalTable: "Posts",
                principalColumn: "PostID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Posts_PostID",
                table: "Comments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Comments",
                table: "Comments");

            migrationBuilder.RenameTable(
                name: "Comments",
                newName: "Commets");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_PostID",
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
    }
}
