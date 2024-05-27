using MongoDB.Bson;
using Personal_Portfolio_FrontEnd.Models;

namespace Personal_Portfolio_FrontEnd.Repositories
{
    public interface IBlogsRepository
    {
        //Create
        Task<ObjectId> Create (Blog BHlog);

        //Read
        Task<Blog> Get(ObjectId id);
        Task<IEnumerable<Blog>> GetAll();

        //Update 
        Task<bool> Update(Object id, Blog blog);

        Task<bool> Delete(ObjectId id);

    }
}
