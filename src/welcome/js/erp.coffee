api=impress()
api.init()
$ document
    .ready ()->
        $ "#next"
            .click ()->
                api.next()
                console.log 'next'
        $ "#prev"
            .click ()->
                api.prev()
                console.log 'prev'
