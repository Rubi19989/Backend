const bcrypt = require("bcrypt");
const { Users, UserRole, Roles } = require("../models");
var jwt = require("jsonwebtoken");

const Authentication = async ({ email, password }) => {
  const user = await Users.findOne({
    where: { email: email },
    include: [{ model: UserRole, include: [Roles] }],
  });

  if (user) {
    const results = bcrypt.compareSync(password, user.password);
    if (results) {
      const { password, ...userWithoutPassword } = user.get();

      const { email, UserRoles } = userWithoutPassword;
      const userFormat = { email, roles: [] };

      UserRoles.map((userRole) => userFormat.roles.push(userRole.Role.name));
      const token = jwt.sign(userFormat, process.env.TOKEN);

      return token;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports = { Authentication };
