const db = require('../../data/db-config.js')

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

async function get() {
  // const result = await db.raw('select * from shippers')
  const result = await db('shippers')
  return result
}

async function getById(shipperId) {
  // const result = await db.raw('select * from shippers where shipperId = 1')
  const result = await db('shippers').where('shipperId', shipperId).first()
  return result
}

async function create(shipper) {
  const [shipperId] = await db('shippers').insert(shipper)
  const result = await getById(shipperId)
  return result
}

async function update(shipperId, changes) {
  await db('shippers')
  .update(changes)
  .where('shipperId', shipperId)
  const result = await getById(shipperId)
  return result
}

async function remove(shipperId) {
  const toBeDeleted = await getById(shipperId)
  await db('shippers').del().where('shipperId', shipperId)
  return toBeDeleted
}

