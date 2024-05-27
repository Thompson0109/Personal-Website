
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Personal_Portfolio_FrontEnd.Models;
using Personal_Portfolio_FrontEnd.Repositories;
using ZstdSharp.Unsafe;

namespace Personal_Portfolio_FrontEnd.Controllers
{
    public class BlogController : Controller
    {
        private readonly IBlogsRepository _blogsRepository;

        public BlogController(IBlogsRepository blogsRepository)
        {
            _blogsRepository = blogsRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
           var blogs = await _blogsRepository.GetAll();

           return new JsonResult(blogs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(ObjectId id)
        {
            var blogs = await _blogsRepository.Get(id);

            return new JsonResult(blogs);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Blog blog)
        {
            var id = await _blogsRepository.Create(blog);
            return new JsonResult(id.ToString());
        }

        [HttpPut("{id}")]
        public async Task<bool> Update(string id, Blog blog)
        {
            var result = await _blogsRepository.Update(ObjectId.Parse(id), blog);
            return await _blogsRepository.Update(id, blog);
        }

        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _blogsRepository.Delete(ObjectId.Parse(id));

            return await _blogsRepository.Delete(ObjectId.Parse(id));
        }
    }
}
