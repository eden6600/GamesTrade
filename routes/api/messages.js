const express = require('express');
const passport = require('passport');

const Message = require('../../models/Message');
const validateMessageInput = require('../../validation/message');

const router = express.Router();

// @route   POST api/messages/
// @desc    create new messages
// @access  Protected
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMessageInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newMessage = {};
    newMessage.from = req.user.id;
    newMessage.to = req.body.to;
    newMessage.aboutGame = {};
    newMessage.aboutGame.name = req.body.aboutGame.name;
    newMessage.aboutGame.image = req.body.aboutGame.image;
    newMessage.from = req.body.from;
    newMessage.text = req.body.text;

    console.log(newMessage);

    new Message(newMessage)
      .save()
      .then(message => res.json(message))
      .catch(err => res.status(500).json(err));
  }
);

// @route   POST api/messages/:msgID
// @desc    create new reply
// @access  Protected
router.post(
  '/:msgID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMessageInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Message.findById(req.params.msgID)
      .then(message => {
        const newReply = {};

        newReply.user = req.user.id;
        newReply.name = req.body.name;
        newReply.avatar = req.body.avatar;
        newReply.text = req.body.text;

        message.replies.push(newReply);

        message
          .save()
          .then(message => res.json(message))
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route   GET api/messages/
// @desc    get all messages
// @access  Protected
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Message.find({ $or: [{ to: req.user.id }, { from: req.user.id }] })
      .populate('from', ['name', 'avatar'])
      .populate('to', ['name', 'avatar'])
      .then(messages => {
        if (!messages.length) {
          return res.status(404).json({ messages: 'No messages found' });
        }

        res.json(messages);
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route   GET api/messages/:msgID
// @desc    get specific message
// @access  Protected
router.get(
  '/:msgID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Message.findById(req.params.msgID)
      .populate('from', ['name', 'avatar'])
      .populate('to', ['name', 'avatar'])
      .then(message => {
        if (!message) {
          return res.status(404).json({ message: 'Message not found' });
        }

        res.json(message);
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route   DELETE api/messages/:msgID/
// @desc    delete message
// @access  Protected
router.delete(
  '/:msgID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Message.findByIdAndDelete(req.params.msgID)
      .then(message => {
        if (!message) {
          return res.status(404).json({ message: 'Message not found' });
        }

        res.json(message);
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route   DELETE api/messages/:msgID/:replyID
// @desc    delete reply
// @access  Protected
router.delete(
  '/:msgID/:replyID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Message.findById(req.params.msgID)
      .then(message => {
        const deleteIndex = message.replies
          .map(reply => reply.id)
          .indexOf(req.params.replyID);

        if (deleteIndex !== -1) {
          message.replies.splice(deleteIndex, 1);
        }

        console.log(
          message.replies.map(reply => reply.id).indexOf(req.params.replyID)
        );
        console.log(req.params.replyID);
        message
          .save()
          .then(message => res.json(message))
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  }
);

module.exports = router;
