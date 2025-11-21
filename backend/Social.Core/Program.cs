using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Social.Core.Application;
using Social.Core.Ports.Incomming;
using Social.Core.Ports.Outgoing;
using Social.Infrastructure.Notification;
using Social.Infrastructure.Persistens;
using Social.Infrastructure.Persistens.dbContexts;
using Social.Middleware;
using Social.Social.Infrastructure.Notification;

namespace Social
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add logging config
            builder.Logging.ClearProviders();
            builder.Logging.AddConsole();

            // Add services to the container.
            builder.Services.AddSignalR();
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Database context
            builder.Services.AddDbContext<SocialDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("SocialDb"))
            );

            //Repositories
            builder.Services.AddScoped<IPostRepository, PostDbAdapter>();
            builder.Services.AddScoped<IProfileRepository, ProfileDbAdapter>();
            builder.Services.AddScoped<IChatRepository, ChatDbAdapter>();
            builder.Services.AddScoped<ICommentRepository, CommentDbAdapter>();
            builder.Services.AddScoped<IImageRepository, ImageDbAdapter>();
            builder.Services.AddScoped<ISubscriptionRepository, SubscriptionDbAdapter>();
            builder.Services.AddScoped<IVoteRepository, VoteDbAdapter>();

            // Services
            builder.Services.AddScoped<IPostUseCases, PostService>();
            builder.Services.AddScoped<ICommentUseCases, CommentServices>();
            builder.Services.AddScoped<IProfileUseCases, ProfileService>();
            builder.Services.AddScoped<IChatUseCases, ChatService>();
            builder.Services.AddScoped<ISubscribeUseCases, SubscriptionService>();
            builder.Services.AddScoped<IPostQueryUseCases, PostQueryService>();

            //Notification services (SignalR)
            builder.Services.AddScoped<INotificationSender, NotificationSender>();
            builder.Services.AddScoped<IChatNotifier, ChatNotifierService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();

            // Middleware
            app.UseMiddleware<ExceptionHandlingMiddleware>(); // Catches all errors
            app.UseMiddleware<RequestLoggingMiddleware>(); // Logging all successes

            // Map SignalR hubs
            app.MapHub<NotificationHub>("/notificationHub");
            app.MapHub<ChatHub>("/chatHub");

            app.MapControllers();

            app.Run();
        }
    }
}
