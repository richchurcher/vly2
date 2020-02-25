const mongooseCrudify = require('mongoose-crudify')
const helpers = require('../../services/helpers')
const Story = require('./story')
const { listStory, getStory, putStory } = require('./story.controller')
const { authorizeActions } = require('../../middleware/authorize/authorizeRequest')
const { SchemaName } = require('./story.constants')

module.exports = (server) => {
  server.use(
    '/api/stories',
    mongooseCrudify({
      Model: Story,
      selectFields: '-__v', // Hide '__v' property
      endResponseInAction: false,
      beforeActions: [{
        middlewares: [authorizeActions(SchemaName)]
      }],
      actions: {
        list: listStory,
        read: getStory,
        update: putStory
      },
      afterActions: [
        // this is the place to require user be authed.
        { middlewares: [helpers.formatResponse] }
      ]
    })
  )
}
