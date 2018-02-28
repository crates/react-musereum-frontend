const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '2',
    //bpid: '1',
    name: 'Users',
    icon: 'user',
    route: '/user',
  },
  {
    id: '21',
    mpid: '-1',
    bpid: '2',
    name: 'User Detail',
    route: '/user/:id',
  },
  {
    id: '3',
    bpid: '1',
    name: 'Request',
    icon: 'api',
    route: '/request',
  },
]

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}
