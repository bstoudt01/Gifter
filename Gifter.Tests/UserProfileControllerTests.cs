using Gifter.Controllers;
using Gifter.Models;
using Gifter.Tests.Mocks;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Gifter.Tests
{
    public class UserProfileControllerTests
    {
        [Fact]
        public void Get_Returns_All_UserProfiles()
        {
            // Arrange 

            //declare number of objects to make then pass them into a method that generates a list of those objects ( and of the type) 
            var userPorfileCount = 10;
            var userProfiles = CreateTestUserProfiles(userPorfileCount);

            //FAIL TEST (status does not come back as ok b.c the userprofile array is empty, had to add that notfound return as conditional when doing tests for results with 0 objects in the list)
            //var userPorfileCount = 0;
            //var userProfiles = new List<UserProfile>(); // no posts


            //invoked the mock repo that contains the users list created above
            var repo = new InMemoryUserProfileRepository(userProfiles);
            //invoked the SUT Controller and pass in the mock repo... "system under test"
            var controller = new  UserProfileController(repo);

            // Act 

            //declare variable to hold method from controller to get all
            var result = controller.Get();


            // Assert

            //confirms the result is returned with an ok status code "200" using the "OkObjectResult" type (also returns other things like a value property the includes the item(s) from the response
            var okResult = Assert.IsType<OkObjectResult>(result);
            //confirm it is a list type of UserProfile 
            //confirms the ("value" property) that is returned as part of the the okResult variable is a List type of UserProfile, 
            var actualUserProfiles = Assert.IsType<List<UserProfile>>(okResult.Value);

            //confirms the number of user profiles returned in the list (from result) is the same as the count variable declared above
            Assert.Equal(userPorfileCount, actualUserProfiles.Count);
            //confirms the userprofiles list created above (expected) contains the same information as the userprofiles list returned (Actual)
            Assert.Equal(userProfiles, actualUserProfiles);
        }

        [Fact]
        public void Get_By_Id_Returns_NotFound_When_Given_Unknown_id()
        {
            // Arrange 
            var userProfiles = new List<UserProfile>(); // no posts

            //FAIL TEST
            //var userPorfileCount = 10;
            //var userProfiles = CreateTestUserProfiles(userPorfileCount);

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            // Act
            var result = controller.Get(1);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void Get_By_Id_Returns_UserProfile_With_Given_Id()
        {
            // Arrange
            var testUserProfileId = 99;
            var userProfiles = CreateTestUserProfiles(5);
            userProfiles[0].Id = testUserProfileId; // Make sure we know the Id of one of the posts

            //FAIL TEST
            //test for a userprofile id above 5
            // REMOVE userProfiles[0].Id = testUserProfileId; 

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            // Act
            var result = controller.Get(testUserProfileId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualUserProfile = Assert.IsType<UserProfile>(okResult.Value);

            Assert.Equal(testUserProfileId, actualUserProfile.Id);
        }


        //HOW CAN I BREAK THIS??D!?@?#@!?#@?
        //CREATE a 2nd test to verify....???
        [Fact]
        public void Post_Method_Adds_A_New_UserProfile()
        {
            // Arrange 
            var userProfileCount = 20;
            var userProfiles = CreateTestUserProfiles(userProfileCount);

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            // Act
            var newUserProfile = CreateTestUserProfile(4);

            controller.Post(newUserProfile);

            // Assert
            Assert.Equal(userProfileCount + 1, repo.InternalData.Count);
        }


        //Verify bad request when trying a put request where the id does not match the object.id
        [Fact]
        public void Put_Method_Returns_BadRequest_When_UserProfile_Ids_Do_Not_Match()
        {
            // Arrange
            var testUserProfileId = 99;
            var userProfiles = CreateTestUserProfiles(5);
            userProfiles[0].Id = testUserProfileId; // Make sure we know the Id of one of the posts

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            var userProfileToUpdate = new UserProfile()
            {
                Id = testUserProfileId,
                Name ="UpdatedName",
                Email = "UpdatedEmail",
                Bio = "UpdatedBIO",
                DateCreated = DateTime.Today,
                ImageUrl = "http://some.image.url",
            };
            var someOtherUserProfileId = testUserProfileId + 1; // make sure they aren't the same
            //put request to the same id would return no content and run the put request, and that would fail the test (expecting bad request)

            // Act
            var result = controller.Put(someOtherUserProfileId, userProfileToUpdate);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        //confirms put request updates the database object (with a not null object) and verifies all properties were updated as well
        [Fact]
        public void Put_Method_Updates_A_UserProfile()
        {
            // Arrange
            var testUserProfileId = 99;
            var userProfiles = CreateTestUserProfiles(5);
            userProfiles[0].Id = testUserProfileId; // Make sure we know the Id of one of the posts

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            var userProfileToUpdate = new UserProfile()
            {
                Id = testUserProfileId,
                Name = "UpdatedName",
                Email = "UpdatedEmail",
                Bio = "UpdatedBIO",
                DateCreated = DateTime.Today,
                ImageUrl = "http://some.image.url",
            };

            // Act
            controller.Put(testUserProfileId, userProfileToUpdate);

            // Assert
            var userProfilesFromDb = repo.InternalData.FirstOrDefault(u => u.Id == testUserProfileId);
            //FAIL TEST
            //set u.id != testUserProfileId.. it returned user 2 in this case instead of 99

            Assert.NotNull(userProfilesFromDb);

            Assert.Equal(userProfileToUpdate.Name, userProfilesFromDb.Name);
            Assert.Equal(userProfileToUpdate.Email, userProfilesFromDb.Email);
            Assert.Equal(userProfileToUpdate.Bio, userProfilesFromDb.Bio);
            Assert.Equal(userProfileToUpdate.DateCreated, userProfilesFromDb.DateCreated);
            Assert.Equal(userProfileToUpdate.ImageUrl, userProfilesFromDb.ImageUrl);
        }

        [Fact]
        public void Delete_Method_Removes_A_Post()
        {
            // Arrange
            var testUserProfileId = 99;
            var userProfiles = CreateTestUserProfiles(5);
            userProfiles[0].Id = testUserProfileId; // Make sure we know the Id of one of the posts

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            // Act
            controller.Delete(testUserProfileId);

            // Assert
            var postFromDb = repo.InternalData.FirstOrDefault(p => p.Id == testUserProfileId);
            Assert.Null(postFromDb);
        }

        private List<UserProfile> CreateTestUserProfiles(int count)
        {
            var userProfiles = new List<UserProfile>();
            for (var i = 1; i <= count; i++)
            {
                userProfiles.Add(new UserProfile()
                {
                    Id = i,
                    Name = $"User {i}",
                    Email = $"user{i}@example.com",
                    Bio = $"Bio {i}",
                    DateCreated = DateTime.Today.AddDays(-i),
                    ImageUrl = $"http://user.image.url/{i}",
                });
            }
            return userProfiles;
        }

        private UserProfile CreateTestUserProfile(int id)
        {
            return new UserProfile()
            {
                Id = id,
                Name = $"User {id}",
                Email = $"user{id}@example.com",
                Bio = $"Bio {id}",
                DateCreated = DateTime.Today.AddDays(-id),
                ImageUrl = $"http://user.image.url/{id}",
            };
        }
    }
}