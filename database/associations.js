const User =require('../models/user');
const Check =require('../models/check');
const Report =require('../models/report');
const checkHistory =require('../models/history');

Check.belongsTo(User,{
    foreignKey: 'userId',
    as: 'users',
});
User.hasMany(Check,{
    foreignKey: 'userId',
  as: 'checks'
});
checkHistory.belongsTo(Check,{
  foreignKey: 'checkId',
  as: 'checks',
  
});
Check.hasMany(checkHistory,{
  foreignKey: 'checkId',
  onDelete: 'CASCADE',
as: 'checkHistory'
});
Check.hasOne(Report,{
  foreignKey: 'checkId', 
  as: 'reports', 
  onDelete: 'CASCADE' 
});
Report.belongsTo(Check,{
  foreignKey: 'checkId', 
  as: 'checks' 
});