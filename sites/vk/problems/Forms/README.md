#Формы
см. Работа2.md

Основной тип форм на данном сайте выражен в следующем виде:

![Forms](FormPic.png)

Первый случай для рассмотрения:
![1 type](1-01.png)

Нас интересует div с идентификатором "quick_login".

	<div id="quick_login">
	  <form method="POST" name="login" id="quick_login_form" action="https://login.vk.com/?act=login" onsubmit="if (vklogin) {return true} else {quick_login();return false;}">
	    <input type="hidden" name="act" value="login" />
	    <input type="hidden" name="role" value="al_frame" />
	    <input type="hidden" name="expire" id="quick_expire_input" value="" />
	    <input type="hidden" name="captcha_sid" id="quick_captcha_sid" value="" />
	    <input type="hidden" name="captcha_key" id="quick_captcha_key" value="" />
	    <input type="hidden" name="_origin" value="index.html" />
	    <input type="hidden" name="ip_h" value="37fe515d56cd7fc4c1" />
	    <input type="hidden" name="lg_h" value="fa95ee332be043e45c" />
	    <div class="label">Phone or email</div>
	    <div class="labeled"><input type="text" name="email" class="text" id="quick_email" /></div>
	    <div class="label">Password</div>
	    <div class="labeled"><input type="password" name="pass" class="text" id="quick_pass" onkeyup="toggle('quick_expire', !!this.value);toggle('quick_forgot', !this.value)" /></div>
	    <input type="submit" class="submit" />
	  </form>
	  <button class="flat_button button_wide button_big" id="quick_login_button">Log in</button>
	  <button class="flat_button button_wide button_big" id="quick_reg_button" style="" onclick="top.showBox('join-2.html', {act: 'box', from: nav.strLoc})">Sign up</button>
	  <div class="clear forgot"><a id="quick_forgot" href="restore.html" target="_top">Forgot your password?</a><div class="checkbox ta_l" id="quick_expire" onclick="checkbox(this);ge('quick_expire_input').value=isChecked(this)?1:'';"><div></div>Don&#39;t remember me</div></div>
	</div>

То, что следовало бы убрать:
1. input'ы с типом hidden;
2. Скрипты, но их детальное изучение произойдёт дальше;
3. ...;

Получившийся результат:

	<div id="quick_login">
	  <form method="POST" name="login" id="quick_login_form" action="https://login.vk.com/?act=login" onsubmit="if (vklogin) {return true} else {quick_login();return false;}">
	    <div class="label">Phone or email</div>
	    <div class="labeled"><input type="text" name="email" class="text" id="quick_email" /></div>
	    <div class="label">Password</div>
	    <div class="labeled"><input type="password" name="pass" class="text" id="quick_pass" onkeyup="toggle('quick_expire', !!this.value);toggle('quick_forgot', !this.value)" /></div>
	    <input type="submit" class="submit" />
	  </form>
	  <button class="flat_button button_wide button_big" id="quick_login_button">Log in</button>
	  <button class="flat_button button_wide button_big" id="quick_reg_button" style="" onclick="top.showBox('join-2.html', {act: 'box', from: nav.strLoc})">Sign up</button>
	  <div class="clear forgot"><a id="quick_forgot" href="restore.html" target="_top">Forgot your password?</a><div class="checkbox ta_l" id="quick_expire" onclick="checkbox(this);ge('quick_expire_input').value=isChecked(this)?1:'';"><div></div>Don&#39;t remember me</div></div>
	</div>

Подводные камни:
1. Кнопка submit спрятана, вместо неё, стоит button, логику работы которого придётся изучить отдельно в рамках работы скриптов, таким образом автоматизация процесса не представляется доступной.(Возможно, существует решение, в котором submit возмжно сделать видимым со стилем button)
2. 


.... (см. работа 2)
