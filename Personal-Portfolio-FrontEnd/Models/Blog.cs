using MongoDB.Bson;

namespace Personal_Portfolio_FrontEnd.Models
{
    public class Blog
    {
        public ObjectId Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Synopsis { get; set; }
        public string Image { get; set; }
        public DateTime Date { get; set; }
    }
}
