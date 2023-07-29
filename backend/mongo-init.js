db.createUser(
    {
        user: "everwrite",
        pwd: "passwd",
        roles: [
            {
                role: "readWrite",
                db: "everwrite"
            }
        ]
    }
);
