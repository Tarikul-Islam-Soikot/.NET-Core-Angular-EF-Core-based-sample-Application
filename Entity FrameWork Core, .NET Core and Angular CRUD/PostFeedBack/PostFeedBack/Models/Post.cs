using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MyDreamWebApp.Models
{
    public class Post
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long PostID { get; set; }
        [Required, MaxLength(140)]
        public string Name { get; set; }
        public long CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
