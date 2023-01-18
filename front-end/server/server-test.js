const http = require('http');
const page = require('page');

page('/api/users', (ctx) => {
    // handle a GET request to the '/api/users' endpoint
    ctx.res.end('You requested a list of users');
});

page('/users/register', (username, email, password, ctx) => {
    // handle a POST request to the '/api/users' endpoint
    ctx.res.end('You created a new user');
}, {
    method: 'post'
});

page('/api/users/:id', (ctx) => {
    // handle a PUT request to the '/api/users/:id' endpoint
    ctx.res.end(`You updated user ${ctx.params.id}`);
}, {
    method: 'put'
});

page('/api/users/:id', (ctx) => {
    // handle a DELETE request to the '/api/users/:id' endpoint
    ctx.res.end(`You deleted user ${ctx.params.id}`);
}, {
    method: 'delete'
});

http.createServer((req, res) => {
    page(req, res);
}).listen(3000, () => {
    console.log('Server listening on port 3000');
});