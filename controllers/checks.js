/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const axios = require('axios');
const Check = require('../models/check');
const Report = require('../models/report');
const checkHistory = require('../models/history');
const helper = require('../helpers/verifyemail');

const createCheck = async (req, res) => {
  try {
    const {
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
      ignoreSSL,
    } = req.body;

    const data = await Check.findOne({
      where: {
        checkId,
        name,
        userId: req.user.userId,
      },
    });
    if (data) {
      res.status(409).send('Your url check is already founded');
    } else {
      const valid = await Check.create({
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
        ignoreSSL,
        userId: req.user.userId,
      });
      if (valid) {
        res.status(201).send('check created successfuly');
      } else {
        res.status(400).send('check not created');
      }
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const editCheck = async (req, res) => {
  try {
    const {
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
      ignoreSSL,
    } = req.body;
    const result = await Check.update({
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
      ignoreSSL,
    }, {
      where: {
        checkId,
        userId: req.user.userId,
      },
    });
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(404);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const deleteCheck = async (req, res) => {
  try {
    const {
      checkId,
    } = req.body;
    const result = await Check.findOne({
      where: {
        checkId,
        userId: req.user.userId,
      },
    });
    if (result) {
      await result.destroy();
      res.status(201).send('Check deleted successfuly');
    } else {
      res.status(404).send('check not found');
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const runCheck = async (req, res) => {
  try {
    const {
      checkId,
    } = req.body;
    const checkResult = await Check.findOne({
      where: {
        checkId,
      },
    });
    if (checkResult) {
      /* const config ={
      url: checkResult.url,
      method: 'get',
      headers: checkResult.httpHeaders ,
      timeout: checkResult.timeOutInSeconds*1000,
       auth: {
        username: checkResult.authentication.username,
        password: checkResult.authentication.password
       },
      responseType: 'json',
    } */
      const tempURL = `${checkResult.protocol}://${checkResult.url}`;
      const temp = await axios.get(tempURL);
      if (temp.status >= 200 && temp.status < 300) {
        await Report.create({
          status: 'up',
          availability: 100,
          outages: 0,
          downTime: 0,
          upTime: 60,
          checkId,
        });
      } else {
        await Report.create({
          status: 'down',
          availability: 0,
          outages: 1,
          downTime: 60,
          upTime: 0,
          checkId,
        });
      }
      setInterval(async () => {
        const reportResult = await Report.findOne({
          where: {
            checkId,
          },
        });
        const result = await axios.get(tempURL);
        console.log('status code /  ', result.status);
        if (result.status >= 200 && result.status < 300) {
          if (reportResult.status === 'down') {
            helper.verifyEmail(req.user.email, 'Your check become up', 'Check Notification');
          }
          const upTimeTemp = await reportResult.upTime + (checkResult.interval * 60);
          await Report.update({
            status: 'up',
            availability: ((upTimeTemp) / (reportResult.downTime + upTimeTemp)) * 100,
            outages: reportResult.outages,
            downTime: reportResult.downTime,
            upTime: upTimeTemp,
          }, {
            where: {
              checkId,
            },
          });
          await checkHistory.create({
            status: 'up',
            checkId: checkResult.checkId,
          });
        } else {
          if (reportResult.status === 'up') {
            helper.verifyEmail(req.user.email, 'Your check become down', 'Check Notification');
          }
          const downTimeTemp = await reportResult.downTime + (checkResult.interval * 60);
          await Report.update({
            status: 'down',
            availability: ((reportResult.upTime) / (downTimeTemp + reportResult.upTime)) * 100,
            outages: reportResult.outages + 1,
            downTime: downTimeTemp,
            upTime: reportResult.upTime,
          }, {
            where: {
              checkId,
            },
          });
          await checkHistory.create({
            status: 'down',
            checkId: checkResult.checkId,
          });
        }
        res.status(200);
      }, checkResult.interval * 60 * 1000);
    } else {
      res.status(404).send('your check not found');
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getReport = async (req, res) => {
  try {
    const data = await Report.findOne({
      where: {
        checkId: req.body.checkId,
      },
    });
    if (!data) {
      res.status(404).send('check not found');
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports = {
  createCheck,
  deleteCheck,
  editCheck,
  runCheck,
  getReport,
};
