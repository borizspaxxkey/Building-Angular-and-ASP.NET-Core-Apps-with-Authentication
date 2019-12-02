using MessageBoardBackend.Data;
using MessageBoardBackend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace MessageBoardBackend.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class MessagesController : Controller
    {
        private readonly ApiContext _context;

        public MessagesController(ApiContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Message> Get()
        {
            return _context.Messages;
        }

        [HttpGet("{name}")]
        public IEnumerable<Message> Get(string name)
        {
            return _context.Messages.Where(messages => messages.Owner == name);
        }

        [HttpPost]
        public Message Post([FromBody] Message message)
        {
           var dbMessage = _context.Messages.Add(message).Entity;
            _context.SaveChanges();
            return dbMessage;
        }

    }
}