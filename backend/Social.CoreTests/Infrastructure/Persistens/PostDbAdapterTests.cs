using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Social.Core;
using Social.Core.Application;
using Social.Core.Ports.Incomming;
using Social.Core.Ports.Outgoing;
using Social.Infrastructure.Persistens;
using Social.Infrastructure.Persistens.dbContexts;

namespace SocialCoreTests.Infrastructure.Persistens
{
    [TestFixture]
    public class PostDbAdapterTests
    {
        private SocialDbContext _context;
        private PostDbAdapter _postAdapter;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<SocialDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _context = new SocialDbContext(options);
            _postAdapter = new PostDbAdapter(_context);
        }

        [TearDown]
        public void Teardown()
        {
            _context.Dispose();
        }

        [Test]
        public async Task AddAsync_Should_Add_Post()
        {
            var post = Post.CreateNewPost(Guid.NewGuid(), "Test Post", "Content");

            await _postAdapter.AddAsync(post);

            var dbPost = await _postAdapter.GetByIdAsync(post.Id);
            Assert.That(dbPost, Is.Not.Null);
            Assert.That(dbPost.Title, Is.EqualTo("Test Post"));
            Assert.That(dbPost.Content, Is.EqualTo("Content"));
        }

        [Test]
        public async Task UpdateAsync_Should_Update_Post_Title_And_Content()
        {
            var post = Post.CreateNewPost(Guid.NewGuid(), "Old Title", "Old Content");
            await _postAdapter.AddAsync(post);

            post.Title = "New Title";
            post.Content = "New Content";

            await _postAdapter.UpdateAsync(post);

            var dbPost = await _postAdapter.GetByIdAsync(post.Id);
            Assert.That(dbPost.Title, Is.EqualTo("New Title"));
            Assert.That(dbPost.Content, Is.EqualTo("New Content"));
        }

        [Test]
        public async Task DeleteAsync_Should_Remove_Post()
        {
            var post = Post.CreateNewPost(Guid.NewGuid(), "Delete Me", "Content");
            await _postAdapter.AddAsync(post);

            await _postAdapter.DeleteAsync(post.Id);

            var dbPost = await _postAdapter.GetByIdAsync(post.Id);
            Assert.That(dbPost, Is.Null);
        }

        [Test]
        public async Task GetAllAsync_Should_Return_All_Posts()
        {
            var post1 = Post.CreateNewPost(Guid.NewGuid(), "Post 1", "Content 1");
            var post2 = Post.CreateNewPost(Guid.NewGuid(), "Post 2", "Content 2");

            await _postAdapter.AddAsync(post1);
            await _postAdapter.AddAsync(post2);

            var allPosts = await _postAdapter.GetAllAsync();

            Assert.That(allPosts.Count(), Is.EqualTo(2));
            Assert.That(allPosts.Any(p => p.Id == post1.Id), Is.True);
            Assert.That(allPosts.Any(p => p.Id == post2.Id), Is.True);
        }

        [Test]
        public async Task GetFeedByAuthorsAsync_Should_Return_Only_Posts_From_Specified_Authors()
        {
            var author1 = Guid.NewGuid();
            var author2 = Guid.NewGuid();
            var author3 = Guid.NewGuid();

            var post1 = Post.CreateNewPost(author1, "Post 1", "Content 1");
            var post2 = Post.CreateNewPost(author2, "Post 2", "Content 2");
            var post3 = Post.CreateNewPost(author3, "Post 3", "Content 3");

            await _postAdapter.AddAsync(post1);
            await _postAdapter.AddAsync(post2);
            await _postAdapter.AddAsync(post3);

            var subscribedAuthors = new List<Guid> { author1, author3 };

            var feedPosts = await _postAdapter.GetFeedByAuthorsAsync(subscribedAuthors);

            Assert.That(feedPosts.Count(), Is.EqualTo(2));
            Assert.That(feedPosts.Any(p => p.AuthorId == author1), Is.True);
            Assert.That(feedPosts.Any(p => p.AuthorId == author3), Is.True);
            Assert.That(feedPosts.Any(p => p.AuthorId == author2), Is.False);
        }
    }
}
