const User =require('../models/user');
const Check =require('../models/check');
const Report =require('../models/report');
const checkHistory =require('../models/history');
const axios = require('axios');
const createCheck = async (req, res, next) => {

  try {
    let {
      id,
      name,
      url,
      protocol,
      path,
      port,
      webhook,
      timeOutInSeconds,
      interval,
      threshold,
      authentication,
      httpHeaders,
      assertStatusCode,
      tags,
      ignoreSSL

    } = req.body;
    
    const data = await Check.findOne({
      where: {
        name,
        userID:req.user.id
      },
    });
    if (data) {
      res.status(409).send("Your url check is already founded");
    } else { 
     const valid= await Check.create({
      id,
      name,
      url,
      protocol,
      path,
      port,
      webhook,
      timeOutInSeconds,
      interval,
      threshold,
      authentication,
      httpHeaders,
      assertStatusCode,
      tags,
      ignoreSSL,
      userId:req.user.id
      });
      if(valid)
      res.status(200).send(`check created successfuly`);
      else    
      return res.status(500).send(error.message);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const editCheck = async (req, res, next) => {
  try {
    let {
      id,
      name,
      url,
      protocol,
      path,
      port,
      webhook,
      timeOutInSeconds,
      interval,
      threshold,
      authentication,
      httpHeaders,
      assertStatusCode,
      tags,
      ignoreSSL

    } = req.body;
    const result = await Check.update({id,
      name,
      url,
      protocol,
      path,
      port,
      webhook,
      timeOutInSeconds,
      interval,
      threshold,
      authentication,
      httpHeaders,
      assertStatusCode,
      tags,
      ignoreSSL
    }, {
      where: {
        name,
        userId:req.user.id
      }
    });
    res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const deleteCheck = async (req, res, next) => {
  try {
    let {
      name
     } = req.body;
    const result = await Check.findOne({
      where: {
        name
      }
    });
    await result.destroy();
    res.status(201).send('Check deleted successfuly');
  } catch (error) {
    return res.status(401).send(error.message);
  }
}
const runCheck = async (req, res, next) => {
  try {
    const config = {
      method: 'head',
      url: 'https://www.google.com/'
  }
    let result = await axios(config);
    res.send(result.data);
  } catch (error) {
    return res.status(401).send(error.message);
  }
}
const pauseCheck = async (req, res, next) => {
  try {
  } catch (error) {
  }
}

module.exports = {
  createCheck,
  deleteCheck,
  editCheck,
  runCheck,
  pauseCheck
};