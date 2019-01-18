const express = require('express');
const passport = require('passport');

const Game = require('../../models/Game');
const Profile = require('../../models/Profile');
const router = express.Router();

// @route   POST api/games
// @desc    Create game
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newGame = {};

        newGame.user = req.user.id;
        newGame.profile = profile._id.toString();
        newGame.igdb_id = req.body.igdb_id;
        newGame.name = req.body.name;
        newGame.platform = req.body.platform;
        newGame.image = req.body.image;
        newGame.trade_for = req.body.trade_for;
        newGame.gamesLike = req.body.gamesLike;

        new Game(newGame)
          .save()
          .then(game => res.json(game))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route   DELETE api/games/:game_id
// @desc    Delete game
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Game.findByIdAndRemove(req.params.id)
      .then(() => {
        Game.find({ user: req.user.id })
          .then(games => res.json(games))
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route   DELETE api/games/tradefor/:game_id
// @desc    Delete tradeable game
// @access  Private
router.delete(
  '/tradefor/:game_id/:tradebale_game_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Game.findById(req.params.game_id).then(game => {
      const removeIndex = game.trade_for
        .map(item => item.id)
        .indexOf(req.params.tradebale_game_id);

      game.trade_for.splice(removeIndex, 1);

      game
        .save()
        .then(game => res.json(game))
        .catch(err => res.status(500).json(err));
    });
  }
);

// @route   GET api/games/all
// @desc    Get all games
// @access  Public
router.get('/all', (req, res) => {
  Game.find()
    .populate('user', ['avatar', 'name'])
    .populate('profile', 'location')
    .then(games => res.json(games))
    .catch(err => res.status(404).json({ msg: 'No games found' }));
});

// @route   GET api/games/platform/:platform
// @desc    Get all games for specific platform
// @access  Public
router.get('/platform/:platform', (req, res) => {
  Game.find({ platform: req.params.platform })
    .populate('user', ['name', 'avatar'])
    .populate('profile', 'location')
    .then(games => res.json(games))
    .catch(err => res.status(404).json({ msg: 'No games found' }));
});

// @route   GET api/games
// @desc    Get all games for current user
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Game.find({ user: req.user.id })
      .populate('user', ['avatar', 'name'])
      .then(games => {
        if (!games) return res.statuc(404).json({ msg: 'No games found' });

        res.json(games);
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route   GET api/games/user-games/:userID
// @desc    Get all games for specific user
// @access  Private
router.get(
  '/user-games/:userID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Game.find({ user: req.params.userID })
      .then(games => {
        if (!games) return res.statuc(404).json({ msg: 'No games found' });

        res.json(games);
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route   GET api/games/:id
// @desc    Get specific game
// @access  Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Game.findById(req.params.id)
      .populate('profile', 'location')
      .populate('user', ['name', 'avatar'])

      .then(game => {
        if (!game) return res.statuc(404).json({ msg: 'No games found' });

        res.json(game);
      })
      .catch(err => res.status(500).json(err));
  }
);

module.exports = router;
