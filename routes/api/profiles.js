const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');

const router = express.Router();

// @route   GET api/profiles/test
// @desc    Test profiles route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profiles Works' }));

// @route   GET api/profiles
// @desc    Get current user profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar', 'email'])
      .then(profile => {
        if (!profile) {
          errors.noProfile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route   GET api/profiles/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofiles = 'There are no profiles';
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(500).json(err));
});

// @route   GET api/profiles/:id
// @desc    Get specific profile
// @access  Private
router.get(
  '/:userID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.params.userID })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noProfile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route   POST api/profiles
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.location = req.body.location;
    profileFields.phone = req.body.phone;

    profileFields.social = {
      facebook: '',
      instagram: ''
    };
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then(profile => res.json(profile))
          .catch(err => res.status(500).json(err));
      } else {
        // Create
        new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
  }
);

// @route   POST api/profiles/games
// @desc    Add game to profile
// @access  Private
router.post(
  '/games',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const gameFields = {};

    Profile.findOne({ user: req.user.id }).then(profile => {
      gameFields.igdb_id = req.body.igdb_id;
      gameFields.name = req.body.name;
      gameFields.platform = req.body.platform;
      gameFields.image = req.body.image;
      gameFields.trade_for = [];

      req.body.trade_for.forEach(game => {
        gameFields.trade_for.push({
          igdb_id: game.igdb_id,
          name: game.name,
          platform: game.platform
        });
      });

      profile.games.unshift(gameFields);
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json(err));
    });
  }
);

router.get('/foo', (req, res) => res.json({ test: 'test' }));

module.exports = router;
