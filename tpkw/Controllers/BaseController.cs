using Microsoft.AspNetCore.Mvc;
using tpkw.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace tpkw.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        public static List<Student> list = new List<Student>();
        private static int id = 0;
        // GET: api/<BaseController>
        [HttpGet]
        public IEnumerable<Student> Get()
        {
            return list;
        }

        // GET api/<BaseController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<BaseController>
        [HttpPost]
        public void Post([FromBody] StudentDto student)
        {
            Student student1 = new Student(firstName:student.FirstName,lastName:student.LastName);
            list.Add(student1);
        }

        // PUT api/<BaseController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] StudentDto student)
        {
            var  temp = list.FirstOrDefault(x => x.Id == id);
            temp.FirstName = student.FirstName;
            temp.LastName = student.LastName;
        }

        // DELETE api/<BaseController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            list.Remove(list.FirstOrDefault(x =>x.Id == id));
        }
    }
}
