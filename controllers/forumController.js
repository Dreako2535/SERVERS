const db = require('../config/db');


exports.createPost = async (req, res) => {
    const { title, content, author_id } = req.body;

    if (!title || !content || !author_id) {
        return res.status(400).json({ message: 'Por favor, complete todos los campos.' });
    }

    const sql = 'INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)';
    db.query(sql, [title, content, author_id], (err, results) => {
        if (err) {
            console.error('Error inserting post:', err);
            return res.status(500).json({ message: 'Error al crear la publicación' });
        }
        res.status(201).json({ message: 'Publicación creada con éxito', postId: results.insertId });
    });
};


exports.getPosts = (req, res) => {
    const sql = 'SELECT * FROM posts ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching posts:', err);
            return res.status(500).json({ message: 'Error al obtener las publicaciones' });
        }
        res.status(200).json(results);
    });
};
