const User =require('../models/user');
const Check =require('../models/check');
const Report =require('../models/report');
const checkHistory =require('../models/history');
const { check } = require('express-validator');

User.hasMany(Check,{
    foreignKey: 'userId',
  as: 'checks'
});
Check.hasMany(checkHistory,{
  foreignKey: 'checkId',
  onDelete: 'CASCADE',
as: 'checkHistory'
});
Check.hasOne(Report,
  {
    foreignKey: 'checkId',
    onDelete: 'CASCADE',
  
  });