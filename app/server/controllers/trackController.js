const db = require('../db')

exports.getAllTracks = async (req, res) => {

    let baseQuery = `
        SELECT idTrack as id, traName as name, traLength as trackLength, traOrder as trackOrder, traImageLink as pictureLink, fkCountry as country, couLogoLink as trackCountryPicture
        FROM t_tracks t
        LEFT JOIN t_country c ON c.idCountry = t.fkCountry
        ORDER BY traOrder ASC
        `;





    let params = [];

    db.all(baseQuery, params, (err, rows) => {
        if (err) {
            console.error("Erreur SQL :", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        res.json(rows);
    });
}

exports.addTrack = async (req, res) => {

    let traOrder = req.body.order;

    let params = [
        req.body.name,
        req.body.trackLength,
        req.body.order,
        req.body.nationality
    ];


    const shiftQuery = `
        UPDATE t_tracks
        SET traOrder = traOrder + 1
        WHERE traOrder >= ?;
    `;





    const baseQuery = `
        INSERT INTO t_tracks (traName, traLength, traOrder, fkCountry, traImageLink)
        VALUES (?, ?, ?, ?, "defaultTrackPic.jpg");

    `;

    db.serialize(() => {
        db.run(shiftQuery, [traOrder], function (err) {
            if (err) {
                console.error("Erreur lors du décalage des ordres :", err);
                return res.status(500).json({ error: "Erreur serveur" });
            }
        })


        db.run(baseQuery, params, function (err) {
            if (err) {
                console.error("Erreur lors de la mise à jour :", err);
                return res.status(500).json({ error: "Erreur serveur" });
            }
            return res.json({ success: true, });

        })

    })



}

exports.updateTrack = async (req, res) => {
    let oldTrackOrder = req.body.oldTrackOrder;
    let newTrackOrder = req.body.newTrackOrder;
    let params = [
        req.body.name,
        req.body.trackLength,
        req.body.newTrackOrder,
        req.body.country,
        req.body.idTrack

    ];
    let shiftQuery = ``
    const updateQuery = `
        UPDATE t_tracks
        SET traName = ?, traLength = ?, traOrder = ?, fkCountry = ?
        WHERE idTrack = ?
    `;

    if (req.body.newTrackOrder < req.body.oldTrackOrder) {
        shiftQuery = `
        UPDATE t_tracks
        SET traOrder = traOrder + 1
        WHERE traOrder >= ? AND traOrder <= ?
        `;
    } else {
        shiftQuery = `
        UPDATE t_tracks
        SET traOrder = traOrder - 1
        WHERE traOrder >= ? AND traOrder <= ?
        `;
    }
 




    db.serialize(() => {
        db.run(shiftQuery, [oldTrackOrder, newTrackOrder], function (err) {
            if (err) {
                console.error("Erreur lors du décalage des ordres :", err);
                return res.status(500).json({ error: "Erreur serveur" });
            }
        })


        db.run(updateQuery, params, function (err) {
            if (err) {
                console.error("Erreur lors de la mise à jour :", err);
                return res.status(500).json({ error: "Erreur serveur" });
            }
            return res.json({ success: true, });

        })

    })
}


exports.deleteTrack = async (req, res) => {

    let params = [
        req.body.param
    ]
    let traOrder = req.body.order


    const shiftQuery = `
        UPDATE t_tracks
        SET traOrder = traOrder - 1
        WHERE traOrder >= ?;
    `;

    const baseQuery = `
        DELETE FROM t_tracks
        WHERE idTrack = ?;
    `;

    db.serialize(() => {
        db.run(shiftQuery, [traOrder], function (err) {
            if (err) {
                console.error("Erreur lors du décalage des ordres :", err);
                return res.status(500).json({ error: "Erreur serveur" });
            }
        })


        db.run(baseQuery, params, function (err) {
            if (err) {
                console.error("Erreur lors de la mise à jour :", err);
                return res.status(500).json({ error: "Erreur serveur" });
            }
            return res.json({ success: true, });

        })

    })
}