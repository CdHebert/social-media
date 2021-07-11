const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');
const formatTime = require('../utils/formatTime')

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Danger Will Robinson You need some Thoughts!!!!',
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: time => formatTime(time)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function (){
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;