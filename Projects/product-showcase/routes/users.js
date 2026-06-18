const express = require('express')
const router = express.Router()

const users = [
    { id: 1, avatar: '👨', name: 'John Doe', email: 'john@example.com', role: 'Admin', bio: 'Technology enthusiast and system administrator.', joinedDate: 'January 12, 2025' },
    { id: 2, avatar: '👩', name: 'Jane Smith', email: 'jane@example.com', role: 'User', bio: 'Frontend developer who enjoys building clean interfaces.', joinedDate: 'March 8, 2025' },
    { id: 3, avatar: '🧑', name: 'Mike Johnson', email: 'mike@example.com', role: 'Moderator', bio: 'Community moderator focused on maintaining quality discussions.', joinedDate: 'May 23, 2025' },
    { id: 4, avatar: '👨‍💻', name: 'Sarah Lee', email: 'sarah@example.com', role: 'User', bio: 'Software engineer passionate about web development.', joinedDate: 'July 17, 2025' },
    { id: 5, avatar: '👨‍🔬', name: 'David Wilson', email: 'david@example.com', role: 'User', bio: 'Data analyst who loves working with statistics and reports.', joinedDate: 'September 5, 2025' },
    { id: 6, avatar: '👩‍🎨', name: 'Emily Davis', email: 'emily@example.com', role: 'Moderator', bio: 'Graphic designer specializing in branding and illustrations.', joinedDate: 'November 29, 2025' }
];
const posts = [
    // User 1 - John Doe
    { id: 1, userId: 1, title: 'Getting Started with Express.js', date: 'June 15, 2026', content: 'Express.js makes building web applications with Node.js simple and efficient.', likes: 24, comments: 8 },
    { id: 2, userId: 1, title: 'Why I Switched to SSD Storage', date: 'June 10, 2026', content: 'Upgrading to an SSD dramatically improved my workflow and productivity.', likes: 15, comments: 4 },
    { id: 3, userId: 1, title: 'My Development Setup', date: 'June 5, 2026', content: 'A look at the tools and equipment I use daily for programming.', likes: 19, comments: 6 },
    { id: 4, userId: 1, title: 'Learning Backend Development', date: 'June 1, 2026', content: 'Backend development is more than APIs—it is about solving real problems.', likes: 12, comments: 3 },
    // User 2 - Jane Smith
    { id: 5, userId: 2, title: 'My Favorite CSS Tricks', date: 'June 14, 2026', content: 'A collection of CSS techniques that make layouts cleaner and more responsive.', likes: 18, comments: 6 },
    { id: 6, userId: 2, title: 'Designing Better User Interfaces', date: 'June 8, 2026', content: 'Good UI design is about clarity, consistency, and usability.', likes: 22, comments: 9 },
    { id: 7, userId: 2, title: 'Typography Matters', date: 'June 4, 2026', content: 'The right font choices can greatly improve readability and user experience.', likes: 16, comments: 5 },
    // User 3 - Mike Johnson
    { id: 8, userId: 3, title: 'Community Guidelines Matter', date: 'June 12, 2026', content: 'Healthy communities start with clear expectations and active moderation.', likes: 11, comments: 3 },
    { id: 9, userId: 3, title: 'Handling Online Discussions', date: 'June 7, 2026', content: 'Encouraging respectful conversations helps build stronger communities.', likes: 14, comments: 4 },
    { id: 10, userId: 3, title: 'Tips for New Members', date: 'June 2, 2026', content: 'New members should focus on learning the culture before posting.', likes: 10, comments: 2 },
    // User 4 - Sarah Lee
    { id: 11, userId: 4, title: 'Building My First Full Stack App', date: 'June 11, 2026', content: 'Today I completed my first full stack application using Node.js and Express.', likes: 29, comments: 10 },
    { id: 12, userId: 4, title: 'Understanding REST APIs', date: 'June 6, 2026', content: 'REST APIs provide a clean way for applications to communicate.', likes: 17, comments: 5 },
    { id: 13, userId: 4, title: 'JavaScript Array Methods', date: 'June 3, 2026', content: 'Learning map, filter, and find made my code much cleaner.', likes: 21, comments: 7 },
    { id: 14, userId: 4, title: 'Debugging Tips', date: 'May 30, 2026', content: 'Console logs are helpful, but learning debugging tools is even better.', likes: 13, comments: 4 },
    // User 5 - David Wilson
    { id: 15, userId: 5, title: 'Data Visualization Basics', date: 'June 13, 2026', content: 'Charts and graphs transform raw data into meaningful insights.', likes: 14, comments: 4 },
    { id: 16, userId: 5, title: 'Working with Spreadsheets', date: 'June 9, 2026', content: 'Spreadsheets remain one of the most useful tools for analysis.', likes: 9, comments: 2 },
    { id: 17, userId: 5, title: 'Understanding Trends', date: 'June 4, 2026', content: 'Identifying trends early can help organizations make better decisions.', likes: 12, comments: 3 },
    // User 6 - Emily Davis
    { id: 18, userId: 6, title: 'The Importance of Branding', date: 'June 9, 2026', content: 'Strong branding creates trust and recognition among customers.', likes: 20, comments: 7 },
    { id: 19, userId: 6, title: 'Finding Inspiration as a Designer', date: 'June 4, 2026', content: 'Inspiration can come from architecture, technology, and nature.', likes: 16, comments: 2 },
    { id: 20, userId: 6, title: 'Color Theory Essentials', date: 'May 31, 2026', content: 'Understanding color combinations helps create visually appealing designs.', likes: 18, comments: 5 },
    { id: 21, userId: 6, title: 'Creating Better Logos', date: 'May 28, 2026', content: 'Simple logos are often the most memorable and effective.', likes: 15, comments: 4 }
];
router.use((req, res, next) => {
    console.log(req.method)
    console.log(req.url)
    next()
})
router.get('/', (req, res) => {
    const user = users.map(user => `
        <div class="user-card">
            <div class="top">
                <div class="avatar">${user.avatar}</div>
                <div>
                    <div class="user-name">${user.name}</div>
                    <div class="user-email">${user.email}</div>
                </div>
            </div>
            <div class="badge">${user.role}</div>
            <div class="links">
                <a href="/users/${user.id}" class="view">Profile</a>
                <a href="/users/${user.id}/posts" class="posts">Posts</a>
            </div>
        </div>
        `).join('')
    const usersPage = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Users</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
                    body { background-color: #f4f4f4; padding: 40px; }
                    .container { max-width: 1000px; margin: auto; }
                    .back-btn { display: inline-block; text-decoration: none; background-color: #333; color: white; padding: 10px 16px; border-radius: 6px; margin-bottom: 20px; }
                    .back-btn:hover { background-color: #555; }
                    h1 { text-align: center; margin-bottom: 30px; }
                    .users-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
                    .user-card { background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: 0.2s ease; }
                    .user-card:hover { transform: translateY(-5px); }
                    .top { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
                    .avatar { width: 50px; height: 50px; border-radius: 50%; background: #ddd; display: flex; align-items: center; justify-content: center; font-size: 22px; }
                    .user-name { font-size: 18px; font-weight: bold; }
                    .user-email { font-size: 14px; color: #666; margin-bottom: 10px; }
                    .badge { display: inline-block; padding: 5px 10px; border-radius: 20px; font-size: 12px; background: #e0f2fe; color: #0369a1; margin-bottom: 15px; }
                    .links { display: flex; gap: 10px; }
                    .links a { flex: 1; text-align: center; text-decoration: none; padding: 8px; border-radius: 6px; font-size: 13px; transition: 0.2s ease; }
                    .view { background: #2563eb; color: white; }
                    .view:hover { background: #1d4ed8; }
                    .posts { background: #111827; color: white; }
                    .posts:hover { background: #374151; }
                </style>
                </head>
                <body>
                <div class="container">
                    <a href="/" class="back-btn">← Home</a>
                    <h1>Users Directory</h1>
                    <div class="users-container">
                        ${user}
                    </div>
                </div>
                </body>
                </html>
                `
    res.send(usersPage)
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(user => user.id === id)
    const userProfile = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>User Profile</title>
                        <style>
                            * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
                            body { background-color: #f4f4f4; padding: 40px; }
                            .container { max-width: 900px; margin: auto; }
                            .back-btn { display: inline-block; text-decoration: none; background-color: #333; color: white; padding: 10px 16px; border-radius: 6px; margin-bottom: 20px; transition: 0.2s ease; }
                            .back-btn:hover { background-color: #555; }
                            .profile-card { background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                            .profile-header { display: flex; align-items: center; gap: 25px; margin-bottom: 25px; }
                            .avatar { width: 120px; height: 120px; border-radius: 50%; background: #ddd; display: flex; align-items: center; justify-content: center; font-size: 60px; flex-shrink: 0; }
                            .user-info h1 { margin-bottom: 8px; }
                            .email { color: #666; margin-bottom: 10px; }
                            .role { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 6px 12px; border-radius: 20px; font-size: 14px; }
                            .section { margin-top: 25px; }
                            .section h2 { margin-bottom: 12px; font-size: 20px; }
                            .bio { color: #555; line-height: 1.6; }
                            .details-list { list-style: none; }
                            .details-list li { background: #f8f8f8; padding: 12px; margin-bottom: 10px; border-radius: 6px; }
                            .posts-btn { display: inline-block; margin-top: 20px; text-decoration: none; background: #2563eb; color: white; padding: 12px 18px; border-radius: 6px; transition: 0.2s ease; }
                            .posts-btn:hover { background: #1d4ed8; }
                        </style>
                        </head>
                        <body>
                        <div class="container">
                            <a href="/users" class="back-btn">← Back to Users</a>
                            <div class="profile-card">
                                <div class="profile-header">
                                    <div class="avatar">${user.avatar}</div>
                                    <div class="user-info">
                                        <h1>${user.name}</h1>
                                        <div class="email">${user.email}</div>
                                        <span class="role">${user.role}</span>
                                    </div>
                                </div>
                                <div class="section">
                                    <h2>About</h2>
                                    <p class="bio">${user.bio}</p>
                                </div>
                                <div class="section">
                                    <h2>User Information</h2>
                                    <ul class="details-list">
                                        <li><strong>User ID:</strong> ${user.id}</li>
                                        <li><strong>Role:</strong> ${user.role}</li>
                                        <li><strong>Email:</strong> ${user.email}</li>
                                        <li><strong>Status:</strong> Active</li>
                                    </ul>
                                </div>
                                <a href="/users/${user.id}/posts" class="posts-btn">View Posts</a>
                            </div>
                        </div>
                        </body>
                        </html>
    `
    res.send(userProfile)
})

router.get('/:id/posts', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(user => user.id === id)
    const userPosts = posts.filter(post => post.userId === id)
    const post = userPosts.map(post => `
        <div class="post-card">
            <h2 class="post-title">${post.title}</h2>
            <div class="post-date">${post.date}</div>
            <p class="post-content">${post.content}</p>
            <div class="post-footer">
                <span>❤️ ${post.likes} Likes</span>
                <span>💬 ${post.comments} Comments</span>
            </div>
        </div>
        `).join('')
    const userPost = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>User Posts</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
                        body { background-color: #f4f4f4; padding: 40px; }
                        .container { max-width: 900px; margin: auto; }
                        .back-btn { display: inline-block; text-decoration: none; background-color: #333; color: white; padding: 10px 16px; border-radius: 6px; margin-bottom: 20px; transition: 0.2s ease; }
                        .back-btn:hover { background-color: #555; transform: translateY(-2px); }
                        .profile-header { background: white; padding: 25px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 20px; }
                        .avatar { width: 80px; height: 80px; border-radius: 50%; background: #ddd; display: flex; align-items: center; justify-content: center; font-size: 40px; flex-shrink: 0; }
                        .user-name { font-size: 28px; margin-bottom: 5px; }
                        .user-role { color: #666; margin-bottom: 8px; }
                        .user-stats { color: #777; font-size: 14px; }
                        .posts-container { display: flex; flex-direction: column; gap: 15px; }
                        .post-card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: 0.2s ease; }
                        .post-card:hover { transform: translateY(-5px); box-shadow: 0 6px 18px rgba(0,0,0,0.15); }
                        .post-title { font-size: 22px; margin-bottom: 8px; }
                        .post-date { color: #777; font-size: 14px; margin-bottom: 15px; }
                        .post-content { color: #555; line-height: 1.6; margin-bottom: 15px; }
                        .post-footer { display: flex; gap: 20px; color: #666; font-size: 14px; border-top: 1px solid #eee; padding-top: 12px; }
                    </style>
                    </head>
                    <body>
                    <div class="container">
                        <a href="/users/${user.id}" class="back-btn">← Back to Profile</a>
                        <div class="profile-header">
                            <div class="avatar">${user.avatar}</div>
                            <div>
                                <h1 class="user-name">${user.name}</h1>
                                <div class="user-role">${user.role}</div>
                                <div class="user-stats">${userPosts.length} Posts • Joined ${user.joinedDate}</div>
                            </div>
                        </div>
                        <div class="posts-container">
                            ${post}
                        </div>
                    </div>
                    </body>
                    </html>
    `
    res.send(userPost)
})
module.exports = router