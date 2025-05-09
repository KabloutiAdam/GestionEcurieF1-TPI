const db = require("../db");

exports.loginUser = (req, res) => {
    const { login, password } = req.body;

    db.get(
        "SELECT * FROM t_users WHERE useEmail = ? AND usePassword = ?",
        [login, password],
        (err, row) => {
            
            if (err) {
                return res.status(500).json({ error: "Erreur serveur" });
              }
          
              if (!row) {
                return res.status(401).json({ error: "Identifiants invalides" });
              }

            const authToken = Math.random().toString(36).substring(2);

            return res.status(200).json({
                authToken,
                user: {
                    id: row.idUser,
                    login: row.useEmail,
                    role: row.useRole,
                },
            });
        }
    );
};