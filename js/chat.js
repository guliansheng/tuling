$(function() {
  //自动填充0
  function pad(num, n) {
    var len = num.toString().length;
    while (len < n) {
      num = "0" + num;
      len++;
    }
    return num;
  }
  //提交表单
  $('.enter').click(function() {
    var text = $('#sendText').val();
    if (text) {
      if (text.match(/^\s*$/)) { text = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" }
      var date1 = new Date();
      var d1y = date1.getFullYear();
      var d1mo = pad(date1.getMonth(), 2);
      var d1d = pad(date1.getDate(), 2);
      var d1h = pad(date1.getHours(), 2);
      var d1m = pad(date1.getMinutes(), 2);
      var d1s = pad(date1.getSeconds(), 2);
      var time = `${d1y}-${d1mo}-${d1d}&nbsp;&nbsp;&nbsp;${d1h}:${d1m}:${d1s}`;
      var user =
        `<div class='userMessage'>
                            <div class="userImg">
                                <img src="./img/1.jpg" alt="">
                            </div>
                            <div class="userText">${text}</div>
                            <span class="time">${time}</span>
                        </div>`;
      //存储用户的记录
      userdata = {'name':'user', 'text':text, 'time':time}
      $('.chatMessage').append(user);
      $('#sendText').val('');
      $.getJSON('http://www.tuling123.com/openapi/api', {
        'key': '75b316bee52444b4b9b9de91e8961eae',
        'info': text
      }, function(data) {
        var date2 = new Date();
        var d2y = date2.getFullYear();
        var d2mo = pad(date2.getMonth(), 2);
        var d2d = pad(date2.getDate(), 2);
        var d2h = pad(date2.getHours(), 2);
        var d2m = pad(date2.getMinutes(), 2);
        var d2s = pad(date2.getSeconds(), 2);
        var time2 = `${d2y}-${d2mo}-${d2d}&nbsp;&nbsp;&nbsp;${d2h}:${d2m}:${d2s}`;
        if (data.url) {
          var turing =
            `<div class="turingMessage">
                                    <div class="turingImg">
                                        <img src="./img/2.png" alt="">
                                    </div>
                                    <div class="turingText">${data.text} : <a href='${data.url}' target='_blank'>${data.url}</a></div>
                                    <span class="time">${d2y}-${d2mo}-${d2d}&nbsp;&nbsp;&nbsp;${d2h}:${d2m}:${d2s}</span>
                                </div>`;
        } else {
          var turing =
            `<div class="turingMessage">
                                    <div class="turingImg">
                                        <img src="./img/2.png" alt="">
                                    </div>
                                    <div class="turingText">${data.text}</div>
                                    <span class="time">${d2y}-${d2mo}-${d2d}&nbsp;&nbsp;&nbsp;${d2h}:${d2m}:${d2s}</span>
                                </div>`;
        }
        //存储tuling的记录
        tulingdata = {'name':'tuling', 'text':data.text, 'time':time2}
        data = [userdata,tulingdata]
        localStorage.setItem('data', JSON.stringify(data))
        $('.chatMessage').append(turing);
        $('.chatMessage')[0].scrollTop = $('.chatMessage')[0].scrollHeight;
      });
    }
  });
  //键盘提交
  function keyEnterEvent(event) {
    if (event.ctrlKey && event.keyCode == 13) {
      $('.enter').click();
    }
  }
  $('.send')[0].onkeydown = keyEnterEvent;
  $(document).ready(function() {
    //初始化之前的聊天记录
    /* 通过ajax查询数据库 */
      data = JSON.parse(localStorage.getItem('data'))
      for (var i = 0; i < data.length; i++) {
        if (data[i].name == "user") {
          var user2 =
            `<div class='userMessage'>
                                <div class="userImg">
                                    <img src="./img/1.jpg" alt="">
                                </div>
                                <div class="userText">${data[i].text}</div>
                                <span class="time">${data[i].time}</span>
                            </div>`;
          $('.chatMessage').append(user2);
        } else if (data[i].name == "tuling") {
          var turing2 =
            `<div class="turingMessage">
                                    <div class="turingImg">
                                        <img src="./img/2.png" alt="">
                                    </div>
                                    <div class="turingText">${data[i].text}</div>
                                    <span class="time">${data[i].time}</span>
                                </div>`;
          $('.chatMessage').append(turing2);
        }
      }
      $('.chatMessage')[0].scrollTop = $('.chatMessage')[0].scrollHeight;
  });
})
