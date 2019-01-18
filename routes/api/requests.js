const express = require('express');
const passport = require('passport');

const Request = require('../../models/Request');
const router = express.Router();

// @route   POST api/requests
// @desc    Create request
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newRequest = {};

    newRequest.from = req.user.id;
    newRequest.to = req.body.to_id;
    newRequest.demand = req.body.demand;
    newRequest.offer = req.body.offer;

    new Request(newRequest)
      .save()
      .then(request => res.json(request))
      .catch(err => res.status(500).json(err));
  }
);

// @route   POST api/requests/status/:request_id/:status_code
// @desc    Change request status
// @access  Private
router.post(
  '/status/:request_id/:status_code',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Request.findById(req.params.request_id)
      .then(request => {
        request.status = parseInt(req.params.status_code);

        request
          .save()
          .then(request => res.json(request))
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.json(404).json(err));
  }
);

// @route   GET api/requests/sent
// @desc    Get all sent requests for current user
// @access  Private
router.get(
  '/sent',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Request.find({ from: req.user.id })
      .then(requests => {
        if (!requests.length)
          return res.status(404).json({ msg: 'No requests found' });
        res.json(requests);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/requests/received
// @desc    Get all requests for current user
// @access  Private
router.get(
  '/received',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Request.find({ to: req.user.id })
      .then(requests => {
        if (!requests.length)
          return res.status(404).json({ msg: 'No requests found' });

        res.json(requests);
      })
      .catch(err => res.status(500).json(err));
  }
);

module.exports = router;
