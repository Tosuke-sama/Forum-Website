export const addpost = (req, res) => {
    // const { title, content, author } = req.body;
    // const post = { title, content, author };
    // db.query("INSERT INTO posts SET ?", post, (err, result) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         res.send("Post added successfully");
    //     }
    // });
    res.json({ message: "Post added successfully" });
}