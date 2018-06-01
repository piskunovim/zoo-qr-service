module.exports = () => {
  const startedTime = new Date()

  return (req, res) => {
    res.send({
      started: startedTime,
      uptime: (Date.now() - Number(startedTime)) / 1000
    })
  }
}
