// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

function createProfile(username: string) {
  return {
    username,
    name: username.charAt(0).toUpperCase() + username.slice(1),
    bio: `This is a short bio for ${username}.`,
    rank: Math.floor(Math.random() * 100) + 1,
    achievements: [
      { id: 1, title: 'First Post', date: '2024-06-01' },
      { id: 2, title: '100 Comments', date: '2024-07-15' },
    ],
  };
}

function createAchievement() {
  return [
    { id: 1, title: 'First Post', date: '2024-06-01' },
    { id: 2, title: '100 Comments', date: '2024-07-15' },
    { id: 3, title: 'Community Helper', date: '2024-08-20' },
  ];
}


function createComment() {
  return [
    { id: 1, postId: 101, text: 'This is my first comment!', date: '2024-09-01' },
    { id: 2, postId: 102, text: 'I totally agree with this idea.', date: '2024-09-02' },
    { id: 3, postId: 103, text: 'Could you clarify more on this topic?', date: '2024-09-05' },
  ];
}


function createActivity() {
  return [
    { id: 201, type: 'post', content: 'My first post', date: '2024-09-01' },
    { id: 202, type: 'comment', content: 'Interesting discussion about React', date: '2024-09-02' },
    { id: 203, type: 'post', content: 'Another update from me', date: '2024-09-04' },
  ];
}

// Feed 
function createFeed() {
  return [
    { id: 'p-salamence', postTitle: 'My Salamence won’t land unless I bribe it with snacks', postContent:"Tried to recall my Salamence. It circled for 20 minutes, refused the Poké Ball, and only landed after I waved a bag of Lava Cookies like an airport marshal. " +
      "Is this normal or do I own a very large, very blue seagull with anger issues?", sub:"r/dragontrainers", profileImg: 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/3/37/latest/20211115024628/EP1177_Drake.png/640px-EP1177_Drake.png', profileName: 'Drake', commentCount: 12, upvotes: 128, downvotes: 3, featuredImg: 'https://admin.esports.gg/wp-content/uploads/2024/08/pokemon-go-mega-salamence-1080p-968x544.jpg', date: '2024-09-02' },
    { id: 'p-rayquaza', postTitle: 'Rayquaza interrupted my weather app again', postContent:"Forecast said ‘thunderstorms.’ Rayquaza: ‘Actually… no.’ Now my garden is floating, my neighbor is riding a Wingull to work, and my barometer says ‘lol.’ " +
      "On the plus side, free updraft for kite season.", sub:"r/pokemonmemes", profileImg: 'https://i.pinimg.com/736x/c5/13/20/c513204327d7e7baeb412c6d717b76fd.jpg', profileName: 'Zinnia', commentCount: 7, upvotes: 85, downvotes: 1, featuredImg: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokedex/2/21/800px-Rayquaza_movie_7.png', date: '2024-09-04'},
    { id: 'p-groudon', postTitle: 'Groudon tried to ‘expand land’ in my backyard', postContent:"Went out to grill. Came back with a continental shelf. The patio is now a tectonic plate, the birdbath is magma-adjacent, and my sprinkler system resigned. " +
      "Anyone know a landscaper who takes Primordial clout as payment?", sub:"r/HoennProblems", profileImg: 'https://external-preview.redd.it/8I-5F4lYsQ9iisXxN6xHO9CzNJoa9pJxIq6bB6ZCq5M.jpg?auto=webp&s=1664be9040ecb940e80e457ad7eeaad82998f5fa', profileName: 'Maxine', commentCount: 7, upvotes: 85, downvotes: 1, featuredImg: 'https://preview.redd.it/was-the-groudon-kyogre-arc-handled-properly-v0-fspr4214q8jc1.jpg?width=1080&crop=smart&auto=webp&s=31ef9ed7ec8b94e3a4f360ba8d66fc6d2811e342', date: '2024-09-06'},
  ]
}

export const handlers = [
  // NOTE: exact same path shape the service calls:
  http.get<{username: string}>('/api/profile/:username', ({ params }) => {
    return HttpResponse.json(createProfile(params.username));
  }),
  http.get<{username: string}>('/api/profile/:username/achievement', () => {
    return HttpResponse.json(createAchievement());
  }),
  http.get('/api/profile/:username/comment', () => {
    return HttpResponse.json(createComment());
  }),
  http.get('/api/profile/:username/activity', () => {
    return HttpResponse.json(createActivity());
  }),

  http.get('/api/feed', () => {
    return HttpResponse.json(createFeed())
  }),

];