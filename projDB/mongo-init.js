// Source
// https://stackoverflow.com/a/52944387/10735382

db.auth('root', 'rootpass')

db = db.getSiblingDB('ies')

db.createUser(
        {
            user: "spring",
            pwd: "springpass",
            roles: [
                {
                    role: "readWrite",
                    db: "ies"
                }
            ]
        }
);