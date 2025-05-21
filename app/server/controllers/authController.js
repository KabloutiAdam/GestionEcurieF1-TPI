const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_JWT_KEY

exports.loginUser = (req, res) => {
    const { login, password } = req.body;
    const plainPassword = "pass";
    bcrypt.hash(plainPassword, 10, (err, hash) => {
        console.log(plainPassword)
        console.log(hash);
    });
    db.get(
        "SELECT * FROM t_users WHERE useEmail = ?", [login], (err, row) => {
            if (err) {
                return res.status(500).json({ error: "Erreur serveur" });
            }

            if (!row) {
                return res.status(401).json({ error: "Identifiants invalides" });
            }



            bcrypt.compare(password, row.usePassword, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ error: "Erreur serveur" });
                }

                if (!isMatch) {
                    return res.status(401).json({ error: "Mot de passe incorrect" });
                }

                const token = jwt.sign(
                    {
                        id: row.idUser,
                        email: row.useEmail,
                        role: row.useRole,
                    },
                    SECRET_KEY,
                    { expiresIn: "2h" }
                );
                
                return res.status(200).json({
                    token
                });
            });
        }
    )
}

