module.exports = function (sequelize, DataTypes) {
  let personalTime = sequelize.define('personalTime', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    time_create: DataTypes.DATE,
    time_modified: DataTypes.DATE,
    isDeleted: DataTypes.INTEGER,
    member_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER,
    stime: DataTypes.STRING(30),
    etime: DataTypes.STRING(30),
    types: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    summary_this_week: DataTypes.STRING(2000),
    plan_next_week: DataTypes.STRING(1000),
    problem: DataTypes.STRING(1000),
    communicate: DataTypes.STRING(80),
    contents: DataTypes.STRING(1000),
    project_partake: DataTypes.STRING(100),
    proprietor_partake: DataTypes.STRING(100),
    harvest: DataTypes.STRING(100),
    remarks: DataTypes.STRING(255),
    customer_name: DataTypes.STRING(255),
    project_demand: DataTypes.STRING(255)
  }, {
    // 自定义表名
    'freezeTableName': true,
    'tableName': 'personal_time',
    'timestamps': false
  }, {
    classMethods: {
      // getList: function (params) {
      //   let list = this.findAll({
      //     'where': {
      //       'id': 515
      //     }
      //   })
      //
      //   console.log(list)
      // }
    }
  })
  
  return personalTime
}
