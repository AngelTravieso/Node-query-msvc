const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};
// QUICK EXAMPLE
// post === {
//     'asdas': {
//         id: 'asdas'.replace,
//         title: 'pot title',
//         comments: [
//             { id: 'alskdsa', content' comment!', }
//         ]
//     },
//     'asdas': {
//         id: 'asdas'.replace,
//         title: 'pot title',
//         comments: [
//             { id: 'alskdsa', content' comment!', }
//         ]
//     },
// }

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = res.body.type;

    if(type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [], };
    }

    if(type === 'CommentCreated') {
        const { id, content, postId } = data;
        
        const post = posts[postId];
        post.comments.push({ id, content });
    }

    console.log(posts);

    res.send({});

});

app.listen(4002, () => {
    console.log('Server running at port 4002');
});