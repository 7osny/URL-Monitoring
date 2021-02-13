const User =require('../models/user');
const Check =require('../models/check');
const Report =require('../models/report');
const checkHistory =require('../models/history');
const axios = require('axios');
const createCheck = async (req, res, next) => {
  try {
    let {
      checkId,
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
        checkId,
        name,
        userId:req.user.userId
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
      res.status(201).send(`check created successfuly`);
      else    
       res.status(400).send('check not created');
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
        id,
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
      id
     } = req.body;
    const result = await Check.findOne({
      where: {
        id
      }
    });
    if(result)
    {await result.destroy();
    res.status(201).send('Check deleted successfuly');
  }
  else{
    res.status(404).send('check not found');
  }
} catch (error) {
    return res.status(500).send(error.message);
  }
}
const test = async (req, res, next) => {
  let result = await axios.get('https://stackoverflow.com');
  res.send(result.status);
}
const runCheck = async (req, res, next) => {
  try {
    let {
      checkId
      } = req.body;
    const checkResult = await Check.findOne({
      where: {
        id:checkId
      }
    });
    if(checkResult)
    {
     /* const config ={
      url: checkResult.url,
      method: 'get',
      headers: checkResult.httpHeaders ,
      timeout: checkResult.timeOutInSeconds*1000,
     /*  auth: {
        username: checkResult.authentication.username,
        password: checkResult.authentication.password
       },
      responseType: 'json', 

 //     validateStatus: function (status) {
    //    return status >= 200 && status < 300; 
   //   },
    }*/
    const tempURL=checkResult.protocol+'://'+checkResult.url;
    setInterval(async ()=>{ 
      let result = await axios.get(tempURL);
      console.log('status code /  ' , result.status)
      if(result.status>=200&&result.status<300)
      {
      await checkHistory.create({
        status:'up',
        checkId:checkResult.id
      });
      }
    else{
      await checkHistory.create({
        status:'down',
        checkId:checkResult.id
      });
    }
    res.status(200);
    },6000);
    // checkResult.interval*60*1000
}
    else{
       res.status(404).send('your check not found');
    }
  } catch (error) {
    return res.status(500).send(error.message);

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
  pauseCheck,
  test
};