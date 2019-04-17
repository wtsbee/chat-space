$(function() {

var search_list = $("#user-search-result");
var member_list = $("#chat-group-users");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                   ${user.name}
                  </p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}">
                   追加
                  </a>
                </div>`
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${msg}
                  </p>
                </div>`
    search_list.append(html);
  }

  function appendUser2(user, id) {
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                 <input name='group[user_ids][]' type='hidden' value='${id}'>
                 <p class='chat-group-user__name'>${user}</p>
                 <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
               </div>`
    member_list.append(html)
  }

  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
     $("#user-search-result").empty();
     if (users.length !== 0) {
       users.forEach(function(user){
         appendUser(user);
       });
     }
     else {
       appendErrMsgToHTML("一致するユーザーが見つかりません");
     }
    })
    .fail(function() {
      alert('error');
    });
  });
  $(document).on("click", ".user-search-add", function() {
    var user = $(this).prev()[0].innerText;
    var id = this.getAttribute("data-user-id");
    $(this).parent().remove();
    var html = appendUser2(user, id);
  });
  $(document).on("click", ".user-search-remove", function() {
    var id = "#" + $(this).parent()[0].getAttribute("id");
    $(id).remove();
  });
});
