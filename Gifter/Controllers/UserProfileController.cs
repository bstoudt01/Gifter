using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Gifter.Repositories;
using Microsoft.AspNetCore.Mvc;
using Gifter.Models;

namespace Gifter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {


        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }



        //api/userProfile
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        //api/userProfile/1
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_userProfileRepository.GetById(id));
        }



        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction("Get", new { id = userProfile.Id }, userProfile);
        }


        //api/userProfile/1
        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile userProfile)
        {
            if (id != userProfile.Id)
            {
                return BadRequest();
            }
            _userProfileRepository.Update(userProfile);
                return NoContent();
        }

        //api/userProfile/1
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userProfileRepository.Delete(id);
            return NoContent();
        }
    }
}
