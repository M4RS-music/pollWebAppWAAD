Server does not run due to error at /Users/martinjanda/Documents/GitHub/pollWebAppWAAD/api/routes.js:31

    const data = await.db.oneOrNone('UPDATE answers SET vote = vote + 1 WHERE id = ($1) RETURNING 1', req.params.id);
                      ^

SyntaxError: Unexpected token '.' ive got no clue why this isnt working.
