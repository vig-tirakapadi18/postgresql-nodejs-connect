const { v4: uuidv4 } = require('uuid');
const client = require("../DB/connection");

client.connect();

exports.getAllUsers = (req, res) => {
  client.query("SELECT * FROM USERS", (err, result) => {
    if (err) return res.status(404).json({ success: false, message: err.message });

    res.status(200).json({ success: true, data: result.rows });
  });
};

exports.getUserById = (req, res) => {
  const { userId } = req.params;
  client.query(`SELECT * FROM USERS WHERE u_id=${userId}`, (err, result) => {
    if (err) return res.status(404).json({ success: false, message: err.message });

    res.status(200).json({ success: true, data: result.rows });
  });
};

exports.createNewUser = (req, res) => {
  const { u_name, u_email } = req.body;

  const u_id = uuidv4();

  client.query(`INSERT INTO USERS (u_id, u_name, u_email) VALUES('${u_id}', '${u_name}', '${u_email}')`, (err, result) => {
    if (err) return res.status(404).json({ success: false, message: err.message });

    res.status(200).json({ success: true, data: { u_id, u_name, u_email } });
  });
};

exports.updateUser = (req, res) => {
  const { userId } = req.params;
  const { u_name, u_email } = req.body;

  const updateQuery = `UPDATE USERS
                       SET u_name = '${u_name}',
                       u_email = '${u_email}'
                       WHERE u_id = '${userId}'`;

  client.query(updateQuery, (err, result) => {
    if (err) return res.status(404).json({ success: false, message: err.message });

    res.status(200).json({ success: true, data: { u_id: userId, u_name, u_email } });
  });
};

exports.deleteUser = (req, res) => {
  const { userId } = req.params;

  client.query(`DELETE FROM USERS WHERE u_id='${userId}'`, (err, result) => {
    if (err) return res.status(404).json({ success: false, message: err.message });

    res.status(200).json({ success: true, message: "User deleted successfully!" });
  });
};