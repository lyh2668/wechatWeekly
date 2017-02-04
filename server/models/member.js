module.exports = function (sequelize, DataTypes) {
  let member = sequelize.define('member', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    login_name: DataTypes.STRING(50),
    password: DataTypes.STRING(32),
    time_create: DataTypes.DATE,
    time_modified: DataTypes.DATE,
    username: DataTypes.STRING(100),
    tel: DataTypes.STRING(32),
    agency_id: DataTypes.INTEGER(11),
    company_id: DataTypes.INTEGER(11),
    group_id: DataTypes.INTEGER(11),
    role_id: DataTypes.STRING(100),
    isDeleted: DataTypes.INTEGER(11),
    state: DataTypes.INTEGER(11),
    birthday: DataTypes.STRING(32),
    photoes: DataTypes.INTEGER(11),
    in_time: DataTypes.STRING(32),
    educational: DataTypes.STRING(11),
    duties: DataTypes.INTEGER(11),
    technical_title: DataTypes.INTEGER(11),
    labels: DataTypes.STRING(1000),
    departure_time: DataTypes.STRING(50)
  }, {
    'freezeTableName': true,
    'tableName': 'member',
    'timestamps': false
  })

  return member
}
