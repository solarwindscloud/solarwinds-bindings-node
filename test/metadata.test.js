var bindings = require('../')

describe('addon.metadata', function () {
  var metadata
  var string
  bindings.oboeInit(process.env.APPOPTICS_SERVICE_KEY)

  it('should construct', function () {
    metadata = new bindings.Metadata()
  })

  it('should construct with random data', function () {
    metadata = bindings.Metadata.makeRandom()
    metadata.toString().should.not.equal('')
    metadata.toString().should.match(/2B[A-F0-9]{56}00/)
  })

  it('should set the sample flag', function () {
    var md = metadata.toString()
    metadata.setSampleFlag()
    metadata.toString().slice(0, -2).should.equal(md.slice(0, -2))
    metadata.toString().slice(-2).should.equal('01')
  })

  it('should clear the sample flag', function () {
    var md = metadata.toString()
    metadata.clearSampleFlag()
    metadata.toString().slice(0, -2).should.equal(md.slice(0, -2))
    metadata.toString().slice(-2).should.equal('00')
  })

  it('should construct using metadata', function () {
    var md = new bindings.Metadata(metadata)
    md.toString().should.equal(metadata.toString())
  })

  it('should construct using an event', function () {
    var e = new bindings.Event(metadata)
    var md = new bindings.Metadata(e)
    md.toString().should.equal(e.toString())
  })

  it('should serialize to string', function () {
    string = metadata.toString()
    string.should.not.equal('')
  })

  it('should construct from string', function () {
    metadata = bindings.Metadata.fromString(string)
    metadata.toString().should.equal(string)
  })

  it('should clone itself', function () {
    var rand = bindings.Metadata.makeRandom()
    rand.copy().toString().should.equal(rand.toString())
  })

  it('should be valid', function () {
    metadata.isValid().should.equal(true)
  })

  it('should create an event', function () {
    var event = metadata.createEvent()
    event.should.be.an.instanceof(bindings.Event)
  })
})
