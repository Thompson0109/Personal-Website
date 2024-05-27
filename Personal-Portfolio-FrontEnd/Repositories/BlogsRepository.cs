using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Authentication;
using Personal_Portfolio_FrontEnd.Models;

namespace Personal_Portfolio_FrontEnd.Repositories
{
    public class BlogsRepository : IBlogsRepository
    {
        private readonly IMongoCollection<Blog> _Blog;

        public BlogsRepository(IMongoClient client)
        {
            var database = client.GetDatabase("BlogsMongo");
            _Blog = database.GetCollection<Blog>("BlogsMongo");
        }

        public async Task<ObjectId> Create(Blog BHlog)
        {
            await _Blog.InsertOneAsync(BHlog);
            return BHlog.Id;
        }

        public async Task<bool> Delete(ObjectId id)
        {
            var filter = Builders<Blog>.Filter.Eq(b => b.Id, id);
            var result = await _Blog.DeleteOneAsync(filter);
            return result.DeletedCount == 1;
        }

        public Task<Blog> Get(ObjectId id)
        {
            var filter = Builders<Blog>.Filter.Eq(b => b.Id, id);
            var blogs = _Blog.Find(filter).FirstOrDefaultAsync();

            return blogs; 
        }

        public async  Task<IEnumerable<Blog>> GetAll()
        {
            var blogs = await _Blog.Find(b => true).ToListAsync();
            return blogs;
        }

        public async Task<bool> Update(object id, Blog blog)
        {
            var filter = Builders<Blog>.Filter.Eq(b => b.Id, id);
            var update = Builders<Blog>.Update
                .Set(b => b.Title, blog.Title)
                .Set(b => b.Content, blog.Content)
                .Set(b => b.Synopsis, blog.Synopsis)
                .Set(b => b.Image, blog.Image)
                .Set(b => b.Date, blog.Date);
            var result = await _Blog.UpdateOneAsync(filter, update);
            return result.ModifiedCount == 1;
        }
    }
}
