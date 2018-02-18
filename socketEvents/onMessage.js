var delayed = require('delayed');
var currentPictureManager = require('./../managers/currentPictureManager')

module.exports = function(socket, io) {

    socket.on('message', function(message) {
        if (message.message == currentPictureManager.getCurrentPicture()) {
            io.emit('player_win', message);

            delayed.delay(function() {
                // TODO  Get new picture turns new?
                
                currentPictureManager.getNewPicture();
                io.emit('picture_switch', currentPictureManager.getCurrentPicture());
            }, 3500)

            return;
        }

        io.emit('chat_message', message);
    });

};
