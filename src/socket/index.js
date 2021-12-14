const ROOM_NAME = "name_room"
var users = [];
function mySocket(io) {
    io.on("connection", function (socket) {
        // console.log(`User id: ->  ${socket.id}  -> Connected`)
        socket.on("disconnect", function () {
            // console.log(`User id: ->  ${socket.id}  -> Disconnected`)
            userLeave(socket.id);
        })
        socket.on("user-join", function (data) {
            if (data.user == 'student') {
                users.push(socket.id)
            }
        })
        socket.on('event-create-noti', function (data) {
            users.forEach(user => {
                io.to(user).emit('has-new-notify', data);
            })
        })
    })
}

function userLeave(id) {
    const index = users.findIndex(user => user === id)
    if (index !== -1) {
        users.splice(index, 1)[0];
    }
}

// function getIndexUser(id) {
//     return users.findIndex(user => user.userId === id)
// }


// function getIndexUserFromIdSocket(id) {
//     return users.findIndex(user => user.id === id)
// }

module.exports = mySocket;