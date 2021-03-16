using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PostFeebBack.Models
{
    public class Comment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long CommentID { get; set; }
        public string Remarks { get; set; }
        public long LikeQuantity { get; set; }
        public long DislikeQuantity { get; set; }
        public long CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public long PostID { get; set; }
        public Post Post { get; set; }
    }
}
