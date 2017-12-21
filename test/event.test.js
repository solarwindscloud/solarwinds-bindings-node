var bindings = require('../')

describe('addon.event', function () {
  var event
  var random = bindings.Metadata.makeRandom()

  bindings.oboeInit(process.env.APPOPTICS_SERVICE_KEY)

  it('should construct an event', function () {
    event = new bindings.Event()
  })

  it('should construct an event using metadata', function () {
    var beginning = random.toString().slice(0, 42)
    event = new bindings.Event(random)
    // They should share the same task ID
    event.toString().slice(0, 42).should.equal(beginning)
  })

  it('should add info', function () {
    event.addInfo('key', 'val')
  })

  it('should add edge as metadata', function () {
    // base the metadata on the same task ID
    var meta = new bindings.Metadata(random);
    event.addEdge(meta)
  })

  it('should not add edge when task IDs do not match', function () {
    var md = bindings.Metadata.makeRandom()
    // force event to a different task ID because oboe returns "OK"
    // when the event metadata is invalid. And just calling
    // new Event() results in 2B0000000..0000<op id><flags>, i.e.,
    // invalid metadata. So it doesn't fail even though it didn't
    // add an edge. Hmmm.
    var e = new bindings.Event(bindings.Metadata.makeRandom())
    console.log(md.toString(1))
    console.log(e.toString(1))
    // it seems that .should.throw() doesn't work quite right.
    var threw = false
    try {
      e.addEdge(md)
    } catch (e) {
      threw = true
    }
    threw.should.equal(true)
  })

  it('should add edge as an event', function () {
    var e = new bindings.Event(event)
    event.addEdge(e)
  })

  it('should add edge as string', function () {
    var e = new bindings.Event(event)
    var meta = e.toString()
    event.addEdge(meta.toString())
  })

  it('should get metadata', function () {
    var meta = event.getMetadata()
    meta.should.be.an.instanceof(bindings.Metadata)
  })

  it('should serialize metadata to id string', function () {
    var meta = event.toString()
    meta.should.be.an.instanceof(String).with.lengthOf(60)
    meta.should.match(/2B[A-F0-9]{58}/)
  })

  it('should start tracing, returning a new instance', function () {
    var meta = new bindings.Metadata.makeRandom()
    var event2 = new bindings.Event(meta, false)
    //var event2 = bindings.Event.startTrace(meta)
  })
})
