using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Gifter.Repositories;
using Microsoft.AspNetCore.Mvc;
using Gifter.Models;
using Microsoft.AspNetCore.Authorization;

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

        //api/userProfile/firebaseUserId
        [HttpGet("{firebaseUserId}")]
        public IActionResult GetByFirebaseUserId(string firebaseUserId)
        {
         
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        //api/userProfile
        //updated to return a fail when the list is empty (for test proj)
        [HttpGet]
        public IActionResult Get()
        {
            var allProfiles = _userProfileRepository.GetAll();
            if (allProfiles.Count == 0 )
            {
                return NotFound();
            }
            return Ok(allProfiles);
        }

        //api/userProfile/1
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

           var user = _userProfileRepository.GetById(id);
            if (user == null )
            {
                return NotFound();
            } else
            {
                return Ok(user);
            };
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
