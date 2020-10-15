using System;
using System.Collections.Generic;
using System.Linq;
using Gifter.Models;
using Gifter.Repositories;

namespace Gifter.Tests.Mocks
{
    class InMemoryUserProfileRepository : IUserProfileRepository
    {
        private readonly List<UserProfile> _data;

        public List<UserProfile> InternalData
        {
            get
            {
                return _data;
            }
        }

        public InMemoryUserProfileRepository(List<UserProfile> startingData)
        {
            _data = startingData;
        }


        public List<UserProfile> GetAll()
        {
            return _data;
        }

        public UserProfile GetById(int id)
        {
            return _data.FirstOrDefault(u => u.Id == id);
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            throw new NotImplementedException();
        }

        public void Add(UserProfile userProfile)
        {
            //get the properties of the last user profile in the list
            //take our userprofile we want to add chnage the id to equal Last UserProfile.Id + 1 then pass it into the add method in the IUserProfile Repository
            var lastPost = _data.Last();
            userProfile.Id = lastPost.Id + 1;
            _data.Add(userProfile);
        }

        public void Update(UserProfile userProfile)
        {
            var currentUserProfile = _data.FirstOrDefault(u => u.Id == userProfile.Id);
            if (currentUserProfile == null)
            {
                return;
            }

            currentUserProfile.Name = userProfile.Name;
            currentUserProfile.Email = userProfile.Email;
            currentUserProfile.Bio = userProfile.Bio;
            currentUserProfile.ImageUrl = userProfile.ImageUrl;
            currentUserProfile.DateCreated = userProfile.DateCreated;
        }

        public void Delete(int id)
        {
            var userProfileToDelete = _data.FirstOrDefault(u => u.Id == id);
            if (userProfileToDelete == null)
            {
                return;
            }

            _data.Remove(userProfileToDelete);
        }
    }
}