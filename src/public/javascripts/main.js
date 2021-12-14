var page = 0;

function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
        const toast = document.createElement("div");
        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
            main.removeChild(toast);
        }, duration + 1000);
        // Remove toast when clicked
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };
        const icons = {
            success: "checkmark-circle-outline",
            info: "information-circle-outline",
            warning: "alert-circle-outline",
            error: "bug-outline"
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
                      <div class="toast__icon">
                          <ion-icon name="${icon}"></ion-icon>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
        main.appendChild(toast);
    }
}
function showSuccessToast(message, title = "Successfully", duration = 3000) {
    toast({
        title: title,
        message: message,
        type: 'success',
        duration: duration
    })
}
function showInfoToast(message, title = "Information", duration = 3000) {
    toast({
        title: title,
        message: message,
        type: 'info',
        duration: duration
    })
}
function showErrorToast(message, title = "Error", duration = 3000) {
    toast({
        title: title,
        message: message,
        type: 'error',
        duration: duration
    })
}
let MY_URL = 'http://localhost:3000/'
let imgDepartments = ["pcthssv", 'pdh', 'psdh', 'pdtvmt', 'pktvkdcl', 'ptc', 'tdtclc', 'ttth', 'sdtc', 'atem', "tthtdnvcsv", 'kl', 'ttnnthbdvh', 'vcsktvkd', 'kmtcn', 'kddt', 'kcntt', 'kqtkd', 'kmtvbhld', 'kldcd', 'ktcnh', 'kgdqt'];

let departments = ["Phòng CTHSSV", "Phòng Đại Học", "Phòng Sau Đại Học", "Phòng Điện Toán Và Máy Tính", "Phòng Khảo Thí Và Kiểm Định Chất Lượng", "Phòng Tài Chính", "TDT Creative Language Center", "Trung Tâm Tin Học", "Trung Tâm Đào Tạo phát triển xã hội(SDTC)", "Trung Tâm Phát Triển Khoa Học Quản Lý và Ứng Dụng Công Nghệ (ATEM)", "Trung Tâm Hợp Tác Doanh Nghiệp Và Cựu Sinh Viên", "Khoa Luật", "Trung Tâm Ngoại Ngữ Tin Học Bồi Dưỡng Văn Hóa", " Viện chính sách kinh tế và kinh doanh", "Khoa Mỹ thuật công nghiệp", "Khoa Điện – Điện tử", "Khoa Công nghệ thông tin", "Khoa Quản trị kinh doanh", "Khoa Môi trường và bảo hộ lao động", "Khoa Lao động công đoàn", "Khoa Tài chính ngân hàng", "Khoa giáo dục quốc tế"];

if (document.getElementById('socket-page')) {
    socketPage()
} else {
    noSocket()
}

function socketPage() {
    var socket = io(MY_URL);
    socket.on("connect", () => {
        socket.send();
    })
    socket.emit('user-join', { user: document.getElementById('role-user').innerHTML.trim() || "department or admin" })
    socket.on("has-new-notify", (data) => {
        let message = `${data.username} Just posted new Notification for category(${data.category})<b> <a href='/notify/${data._id}'>Click here</a> </b> to view`
        showInfoToast(message, title = "Notification", duration = 10000)
    })

    let dropDown = document.querySelector('.drop-down')
    dropDown.addEventListener('click', () => {
        document.querySelector('.menu-dropdown').style.display = 'block'
    })

    window.addEventListener('click', (e) => {
        if (!e.target.closest('.drop-down')) {
            document.querySelector('.menu-dropdown').style.display = 'none'
        }
    })
    let tabs = document.querySelectorAll('.tab-list .tab-item')
    let homeItems = document.querySelectorAll('.home-item')
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.className = "tab-item"
            })
            tab.className = "tab-item active"
            homeItems.forEach(item => {
                item.className = item.classList[0] + ' home-item'
            })
            homeItems[index].className = homeItems[index].classList[0] + ' ' + homeItems[index].classList[1] + " active"
        })
    })

    let btnOpenModalChangePassword = document.querySelector('.change-password')
    btnOpenModalChangePassword.addEventListener('click', () => {
        document.querySelector('#modal-change-password').checked = true
    })
    //++++++++++++++++++++++
    // NOTIFICATION PAGE
    // +++++++++++++++++++++++++
    if (document.getElementById('notification-page')) {
        let listDepartment = document.querySelector('.notifications-list-department')
        listDepartment.innerHTML = ''
        console.log(departments)
        departments.forEach(function (name, index) {
            let li = document.createElement('li')
            li.className = "notifications-department"
            li.innerHTML = `<a href="/category/${imgDepartments[index]}">
                                <img src="/images/department/${imgDepartments[index]}.png" alt="">
                                <div class="department-name">
                                   ${name}
                                </div>
                            </a>`;
            listDepartment.appendChild(li)
        })
    }
    //++++++++++++++++++++++
    // ACCOUNT PAGE
    // +++++++++++++++++++++++++
    if (document.getElementById('account-page')) {
        document.querySelectorAll('.header-menu-item')[1].classList.add('active')
        let departmentCreate = document.querySelector('.modal-create-account .modal-content .department-list')
        departmentCreate.innerHTML = ''
        departments.forEach(function (name, index) {
            let div = document.createElement('div')
            div.className = "department-item"
            div.innerHTML = ` <input type="checkbox" class="checkbox-input" name="department[]" id="${index}" 
                                value="${imgDepartments[index]}">
                                <label class="checkbox-label" for="${index}"></label>
                                <label for="${index}">${name}</label>`;
            departmentCreate.appendChild(div)
        })
        let formCreateAccount = document.querySelector('#formCreateAccount')
        formCreateAccount.onsubmit = (e) => {
            e.preventDefault();
            let username = document.querySelector('#username')
            if (username.value.trim() === '') {
                showErrorToast('Please enter a username')
                return
            }
            let isCheck = false
            let listCheckBox = document.querySelectorAll('.checkbox-input')
            listCheckBox.forEach(item => {
                if (item.checked) {
                    isCheck = true
                }
            })
            if (!isCheck) {
                showErrorToast('Please choose department!')
                return
            }
            formCreateAccount.submit()
        }
    }

    //++++++++++++++++++++++
    // PROFILE PAGE
    // +++++++++++++++++++++++++
    if (document.getElementById('profile-page')) {
        let file = document.querySelector('#file')
        file.addEventListener('change', (e) => {
            let preview = document.getElementById('file-select-preview')
            preview.setAttribute("src", window.URL.createObjectURL(e.target.files[0]))
        })
        let formUpdateAccount = document.getElementById('formUpdateInfor')
        console.log(formUpdateAccount)
        formUpdateAccount.onsubmit = (e) => {
            e.preventDefault();
            let name = document.getElementById('name').value
            let userClass = document.getElementById('class').value
            let faculty = document.getElementById('faculty').value
            if (name.trim() === '') {
                showErrorToast("Name empty!")
                return
            }
            if (userClass.trim() === '') {
                showErrorToast("Class empty!")
                return
            }
            if (faculty.trim() === '') {
                showErrorToast("Faculty empty!")
                return
            }
            formUpdateAccount.submit()
        }
        eventDeletePost()
        eventEditPost()
        eventDeleteComment()
        eventAddComment()
        eventLoadMorePost("user")
        eventViewComment()

    }
    //++++++++++++++++++++++
    // NOTIFICATIONS PAGE
    // +++++++++++++++++++++++++
    if (document.getElementById('notifications-page')) {
        document.querySelectorAll('.header-menu-item')[1].classList.add('active')
        let formCreateNotify = document.getElementById('formCreateNotification')
        formCreateNotify.onsubmit = (e) => {
            e.preventDefault();
            let title = document.getElementById('title').value
            let content = document.getElementById('content').value
            if (title.trim() === '') {
                showErrorToast("Title empty!")
                return
            }
            if (content.trim() === '') {
                showErrorToast("Content empty!")
                return
            }
            let isCheck = false
            let category
            let checkboxList = document.querySelectorAll('.checkbox-input')
            checkboxList.forEach(item => {
                if (item.checked) {
                    isCheck = true
                    category = item.value
                }
            })
            if (!isCheck) {
                showErrorToast("Please choose a Category")
                return
            }
            $.ajax({
                url: '/department/createNotify',
                type: 'POST',
                data: { title, content, category },
                success: function (response) {
                    showSuccessToast("Create Notification successfully!")
                    socket.emit('event-create-noti', response.notification)
                    setTimeout(() => {
                        window.location.reload()
                    }, 500)
                }
            })

        }
    }
    //++++++++++++++++++++++
    // HOME PAGE
    // +++++++++++++++++++++++++
    if (document.getElementById('home-page')) {
        document.querySelectorAll('.header-menu-item')[0].classList.add('active')
        let inputImgPost = document.querySelector('#post-img')
        inputImgPost.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                document.querySelector('.modal-image-preview').style.display = 'block'
                let url = URL.createObjectURL(e.target.files[0]);
                let imgPreview = document.getElementById('img-post-preview')
                imgPreview.setAttribute("src", url);
                let btnDeleteImg = document.querySelector('.delete-img')
                btnDeleteImg.addEventListener('click', (e) => {
                    document.getElementById('post-img').value = null
                    inputImgPost.setAttribute("value", "")
                    document.querySelector('.modal-image-preview').style.display = 'none'
                })
            } else {
                document.querySelector('.modal-image-preview').style.display = 'none'
            }
        })

        let formCreatePost = document.querySelector('#formCreatePost')
        formCreatePost.onsubmit = (e) => {
            e.preventDefault()
            let contentPost = document.querySelector('#contentPost')
            let contentYoutubeLink = document.querySelector('#youtubeLinkCreate').value.trim()
            if (contentYoutubeLink.trim() != ""
                && !contentYoutubeLink.trim().startsWith("https://www.youtube.com/watch?v=")) {
                showErrorToast("Youtube link not valid!")
                return;
            }
            if (contentPost.value.trim() === '') {
                showErrorToast('Please enter content');
                return
            }
            const body = new FormData(e.target)
            showInfoToast("Post is being processed!")
            document.getElementById('modal-create-newpost').checked = false

            fetch('/API/post/create', { method: 'post', body })
                .then(res => res.json())
                .then(res => {
                    showSuccessToast("Post successfully! ")
                    document.getElementById('contentPost').value = ""
                    document.querySelector('.youtube-link').value = ""
                    document.querySelector('.post-img-posted').value = null
                    document.querySelector('.img-prv-create-post').style.display = 'none'
                    renderNewPost(res.newPost)
                })
                .catch(error => {
                    showErrorToast("Has error while processing post")
                    console.log(error)
                })
        }

        eventDeletePost()
        eventEditPost()
        eventDeleteComment()
        eventAddComment()
        eventLoadMorePost()
        eventViewComment()
    }
    //++++++++++++++++++++++
    // ACCOUNT PAGE
    // +++++++++++++++++++++++++

}
function eventViewComment() {
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('click-to-see-comment')) {
            let post = e.target.parentNode.parentNode.parentNode
            let comment = post.querySelector('.post-comment')
            comment.classList.toggle('active-comment')
        }
    })
}

// login page
function noSocket() {
    let loginForm = document.querySelector('#loginForm')
    loginForm.onsubmit = (e) => {
        e.preventDefault()
        let username = document.getElementById('username')
        let password = document.getElementById('password')
        if (username.value.trim() === '') {
            showErrorToast("Username empty!")
            return;
        }
        if (password.value.trim() === '') {
            showErrorToast("Password empty!")
            return;
        }
        loginForm.submit()
    }
}

function eventDeletePost() {
    let postClicked = ''
    let btnDeletePost = document.querySelector('#btnDeletePost')
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('labelDeletePost')) {
            btnDeletePost.setAttribute('data-id', e.target.getAttribute('data-id'))
            postClicked = e.target
        }
    })

    btnDeletePost.onclick = (e) => {
        let id = e.target.getAttribute('data-id').trim()
        let url = `/API/post/${id}`
        fetch(url, { method: 'delete' })
            .then(res => res.json())
            .then(res => {
                showSuccessToast("Post deleted!")
                document.querySelector('#modal-delete-post').checked = false
                deletePostFromView()
            })
            .catch(error => {
                console.log(error)
            })
    }
    function deletePostFromView() {
        let post = postClicked.parentNode.parentNode.parentNode.parentNode.parentNode
        post.innerHTML = ''
        post.style.display = 'none'
    }
}

function eventEditPost() {
    let contentBox = document.getElementById('postContentEdit')
    let idBox = document.getElementById('postIdEdit')
    let youtubeBox = document.querySelector('.youtube-link-edit-post')
    let imageBox = document.querySelector('.postImageEdit')
    let imgInput = document.getElementById('post-img-edit-post')
    let btnDeleteImg = document.querySelector('.delete-img-edit')
    let isDelete = document.querySelector('#edit-post-modal-delete-img')
    btnDeleteImg.onclick = () => {
        btnDeleteImg.style.display = "none"
        imageBox.src = ""
        imgInput.value = null
        isDelete.value = "delete"
    }
    window.addEventListener('click', (e) => {
        ///API/post/:id   post
        if (e.target.classList.contains('labelEditPost')) {
            idBox.value = e.target.getAttribute('data-id')
            contentBox.innerHTML = e.target.getAttribute('data-content')

            youtubeBox.value =
                e.target.getAttribute('data-youtube') ?
                    ("https://www.youtube.com/watch?v=" + e.target.getAttribute('data-youtube').split('/')[4])
                    : ""
            if (e.target.getAttribute('data-img-link')) {
                imageBox.src = e.target.getAttribute('data-img-link')
                imageBox.parentNode.style.display = "block"
                btnDeleteImg.style.display = "block"
            } else {
                btnDeleteImg.style.display = "none"
                imageBox.src = ""
                imgInput.value = null
            }
        }
    })

    imgInput.addEventListener('change', (e) => {
        let preview = document.querySelector('.postImageEdit')
        preview.setAttribute("src", window.URL.createObjectURL(e.target.files[0]))
        isDelete.value = ""
        document.querySelector('.preview-image-edit').style.display = "block"
        document.querySelector('.delete-img-edit').setAttribute("style", "display: block")
    })
    let formUpdatePost = document.querySelector('#formUpdatePost')
    formUpdatePost.onsubmit = function (e) {
        e.preventDefault()
        let postId = document.querySelector('#postIdEdit').value
        let content = document.querySelector('#postContentEdit').value
        let ytbLink = document.querySelector('#linkYoutubeEdit').value.trim()

        if (content.trim() === '') {
            showErrorToast("Content cannot be empty")
            return
        }
        if (ytbLink !== '' && !ytbLink.startsWith('https://www.youtube.com/watch?v=')) {
            showErrorToast("Youtube link not valid!")
            return
        }
        const body = new FormData(e.target)
        showInfoToast("Post being processed")
        document.querySelector('#modal-edit-post').checked = false

        fetch(`/API/post/${postId}`, { method: 'post', body })
            .then(response => response.json())
            .then(data => {
                updatePostToView(data)
            });
    }
}
function updatePostToView(data) {
    let post = data.updatePost
    showSuccessToast("Post updated!")
    console.log(post)
    let postNeedUpdate = document.getElementById(`${post._id}`).parentNode
    postNeedUpdate.innerHTML = `
    <div class="post-header">
                    <div class="avatar-sm">
                        <img src='${post.userAvatar}' alt="Khoa Công Nghệ Thông Tin DH TDT">
                    </div>
                    <div class="post-header-infor">
                        <a href="/user/${post.id_user}" class="post-header-name">
                            ${post.username}
                        </a>
                        <div class="post-header-time">
                        
                            ${moment(post.date).fromNow()}
                        </div>
                    </div>
                    <div class="post-header-operation">
                        <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                        <ul class="list-operation">
                            <li class="item-operation delete">
                                <label for="modal-delete-post" class="labelDeletePost" data-id="${post._id}"> Delete </label>
                            </li>
                            <li class="item-operation edit">
                                <label data-id="${post._id}" data-content="${post.content}" data-img-link="${post.imagePath}" data-youtube="${post.urlYoutube}" class="labelEditPost" for="modal-edit-post"> Edit </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="post-content">
                    <div class="post-text">
                        ${post.content}
                    </div>
                    ${post.imagePath ? `<div class="post-img">
                                            <img src="${post.imagePath}" alt="">
                                        </div>` : ""}
                    ${post.urlYoutube ? `<div class="post-video">
                                            <iframe width="560" height="315" src=${post.urlYoutube} title="YouTube video player" frameborder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen></iframe>
                                        </div>` : ``}
                    
                </div>
                <div class="post-interact">
                    <div class="comment-count">
                        <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                        <span class="click-to-see-comment"> <span class="comment-length-${post._id}">${post.comments.length}</span> Comment</span>
                    </div>
                        <div class="add-comment">
                            <input type="text" placeholder="Add a comment..." name="content" class="input-comment-${post._id}">
                            <button data-id="${post._id}" class="btnAddComment">
                                <ion-icon data-id="${post._id}"  name="paper-plane"></ion-icon>
                            </button>
                        </div>
                </div>
                <ul class="post-comment" data-id="${post._id}" id="${post._id}">
                    ${post.comments.map(comment => {
        return `<li class="comment">
                        <div class="avatar-sm">
                            <img src="${comment.userAvatar}" alt="">
                        </div>
                        <div class="comment-content">
                            <div class="comment-user">
                                <span>${comment.username}</span>
                            </div>
                            <div class="comment-text">
                                ${comment.content}
                            </div>
                        </div>
                        <div class="comment-time">${comment.date}</div>
                        ${comment.id_user == post.id_user ?
                (`<div class="comment-operation">
                            <ion-icon name="ellipsis-vertical"></ion-icon>
                            <div class="comment-operation-delete">
                                <label class="delete labelDeleteComment" for="modal-delete-comment" data-id="${comment._id}">Delete</label>
                            </div>
                        </div>`) : ``}
                        
                    </li>`
    }).join('')}
                </ul>
    `
}
function eventDeleteComment() {
    let btnDeleteComment = document.querySelector('.btnDeleteComment')
    var commentClicked = ''
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('labelDeleteComment')) {
            let idComment = e.target.getAttribute('data-id')
            let idPost = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute('data-id')
            btnDeleteComment.setAttribute('data-id', idComment)
            btnDeleteComment.setAttribute('data-postid', idPost)
            console.log("ID POST CMT DELETE " + idPost)
            commentClicked = e.target
        }
    })
    btnDeleteComment.onclick = (e) => {
        document.querySelector('#modal-delete-comment').checked = false
        let id = e.target.getAttribute('data-id')
        let postId = e.target.getAttribute('data-postid')
        $.ajax({
            url: `/API/comment/${postId}/${id}`,
            type: 'delete',
            success: (response) => {
                showSuccessToast("Comment deleted!")
                let count = document.querySelector(`.comment-length-${postId}`)
                count.innerHTML = +(count.innerHTML.trim()) - 1
                commentClicked.parentNode.parentNode.parentNode.style.display = `none`
                commentClicked.parentNode.parentNode.parentNode.innerHTML = ``
            }
        })
    }
}

function eventAddComment() {
    window.addEventListener('click', (e) => {
        if (e.target.closest('.btnAddComment')) {
            console.log("RUNNINGGGGGGGGG")
            let idPost = e.target.getAttribute('data-id')
            let inputBox = document.querySelector(`.input-comment-${idPost.trim()}`)
            if (inputBox.value.trim() === '') {
                showErrorToast("Content of comment empty!")
                return;
            }
            $.ajax({
                url: `/API/comment/${idPost}/create`,
                type: 'post',
                data: { content: inputBox.value.trim() },
                success: response => {
                    showSuccessToast("Comment was saved!")
                    inputBox.value = ""
                    let count = document.querySelector(`.comment-length-${idPost}`)
                    count.innerHTML = +(count.innerHTML.trim()) + 1
                    renderNewComment(response, idPost)
                }
            })
        }
    })
}
function renderNewComment(comment, idTag) {
    let main = document.getElementById(`${idTag}`)
    main.innerHTML = `<li class="comment">
                        <div class="avatar-sm">
                            <img src="${comment.userAvatar}" alt="">
                        </div>
                        <div class="comment-content">
                            <div class="comment-user">
                                <span>${comment.username}</span>
                            </div>
                            <div class="comment-text">
                            ${comment.content}
                            </div>
                        </div>
                        <div class="comment-time">Just a minutes</div>
                        <div class="comment-operation">
                            <ion-icon name="ellipsis-vertical"></ion-icon>
                            <div class="comment-operation-delete">
                                <label class="delete labelDeleteComment" for="modal-delete-comment" data-id="${comment._id}" >Delete</label>
                            </div>
                        </div>
                    </li>`
        + main.innerHTML
}

function eventLoadMorePost(user = "") {
    let idUserURL
    if (user)
        idUserURL = window.location.href.split('/')[4];
    let url = user ? `/API/post?page=${page}&user=${idUserURL}` : `/API/post?page=${page}`
    let isAdmin = document.querySelector('#admin') ? true : false;
    loadMore(url, isAdmin)
    window.addEventListener("load", e => {
        $(window).scroll(function () {
            var position = $(window).scrollTop();
            var bottom = $(document).height() - $(window).height();
            if (position >= bottom) {
                console.log("LOADING ...........................")
                url = user ? `/API/post?page=${page}&user=${idUserURL}` : `/API/post?page=${page}`
                loadMore(url, isAdmin)
            }
        });

    })
}
function loadMore(url, isAdmin) {
    console.log("URL : " + url)
    $.ajax({
        url: url,
        type: "GET",
        success: response => {
            if (response.posts.length == 0) {
                document.querySelector('.read-all-post').style.display = 'flex'
            } else {
                page = page + 1
                renderTenPost(response.posts, response.user, isAdmin)
            }
        }
    })
}
function renderTenPost(posts, idUser, isAdmin = false) {
    console.log(posts)
    let main = document.querySelector('#posts')
    if (posts.length === 0) {
        main.innerHTML += "<div class='read-all-post'> You are read all posts</div>"
    }
    posts.forEach(post => {
        let postDiv = document.createElement('div')
        postDiv.setAttribute('class', 'post')
        postDiv.innerHTML = `
        <div class="post">
            <div class="post-header">
                <div class="avatar-sm">
                    <img src='${post.userAvatar}' alt="Khoa Công Nghệ Thông Tin DH TDT">
                </div>
                <div class="post-header-infor">
                    <a href="/user/${post.id_user}" class="post-header-name">
                        ${post.username}
                    </a>
                    <div class="post-header-time">
                        ${moment(post.date).fromNow()}
                    </div>
                </div>
                ${(post.id_user == idUser || isAdmin) ? (
                `<div class="post-header-operation">
                    <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                    <ul class="list-operation">
                        <li class="item-operation delete">
                            <label for="modal-delete-post" class="labelDeletePost" data-id="${post._id}"> Delete </label>
                        </li>
                        <li class="item-operation edit">
                            <label data-id="${post._id}" data-content="${post.content}" data-img-link="${post.imagePath}" data-youtube="${post.urlYoutube}" class="labelEditPost" for="modal-edit-post"> Edit </label>
                        </li>
                    </ul>
                </div>`) : ""}
            </div>
            <div class="post-content">
                <div class="post-text">
                    ${post.content}
                </div>
                ${post.imagePath ? `
                <div class="post-img">
                    <img src="${post.imagePath}" alt="">
                </div>` : ""}
                ${post.urlYoutube ? `
                <div class="post-video">
                    <iframe width="560" height="315" src=${post.urlYoutube} title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                </div>` : ``}
            </div>
            <div class="post-interact">
                <div class="comment-count">
                    <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                    <span class="click-to-see-comment"> <span class="comment-length-${post._id}">${post.comments.length}</span> Comment</span>
                </div>
                <div class="add-comment">
                    <input type="text" placeholder="Add a comment..." name="content" class="input-comment-${post._id}">
                    <button data-id="${post._id}" class="btnAddComment">
                        <ion-icon data-id="${post._id}"  name="paper-plane"></ion-icon>
                    </button>
                </div>
            </div>
            <ul class="post-comment" data-id="${post._id}" id="${post._id}">
                ${post.comments.map(comment => {
                    //console.log(comment)
                    return `<li class="comment">
                                <div class="avatar-sm">
                                    <img src="${comment.userAvatar}" alt="">
                                </div>
                                <div class="comment-content">
                                    <div class="comment-user">
                                        <span>${comment.username}</span>
                                    </div>
                                    <div class="comment-text">
                                        ${comment.content}
                                    </div>
                                </div>
                                <div class="comment-time"> ${moment(comment.date).fromNow()}</div>
                                ${(comment.id_user == idUser || isAdmin) ? (`
                                <div class="comment-operation">
                                    <ion-icon name="ellipsis-vertical"></ion-icon>
                                    <div class="comment-operation-delete">
                                        <label class="delete labelDeleteComment" for="modal-delete-comment" data-id="${comment._id}">Delete</label>
                                    </div>
                                </div>`) : ""}
                            </li>`
                }).join('')}
            </ul>
        </div>
        `
        main.innerHTML += postDiv.innerHTML
    })
}

function renderNewPost(post) {
    let main = document.querySelector('#posts')
    main.innerHTML = `
                <div class="post">
                <div class="post-header">
                    <div class="avatar-sm">
                        <img src='${post.userAvatar}' alt="Khoa Công Nghệ Thông Tin DH TDT">
                    </div>
                    <div class="post-header-infor">
                        <a href="/user/${post.id_user}" class="post-header-name">
                            ${post.username}
                        </a>
                        <div class="post-header-time">
                            ${moment(post.date).fromNow()}
                        </div>
                    </div>
                    <div class="post-header-operation">
                        <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                        <ul class="list-operation">
                            <li class="item-operation delete">
                                <label for="modal-delete-post" class="labelDeletePost" data-id="${post._id}"> Delete </label>
                            </li>
                            <li class="item-operation edit">
                                <label data-id="${post._id}" data-content="${post.content}" data-img-link="${post.imagePath}" data-youtube="${post.urlYoutube}" class="labelEditPost" for="modal-edit-post"> Edit </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="post-content">
                    <div class="post-text">
                        ${post.content}
                    </div>
                    ${post.imagePath ? `<div class="post-img">
                                            <img src="${post.imagePath}" alt="">
                                        </div>` : ""}
                    ${post.urlYoutube ? `<div class="post-video">
                                            <iframe width="560" height="315" src=${post.urlYoutube} title="YouTube video player" frameborder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen></iframe>
                                        </div>` : ``}
                    
                </div>
                <div class="post-interact">
                    <div class="comment-count">
                        <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                        <span class="click-to-see-comment"> <span class="comment-length-${post._id}">0</span> Comment</span>
                    </div>
                        <div class="add-comment">
                            <input type="text" placeholder="Add a comment..." name="content" class="input-comment-${post._id}">
                            <button data-id="${post._id}" class="btnAddComment">
                                <ion-icon data-id="${post._id}"  name="paper-plane"></ion-icon>
                            </button>
                        </div>
                </div>
                <ul class="post-comment" data-id="${post._id}" id="${post._id}">
                    
                </ul>
            </div>
    ` + main.innerHTML
}