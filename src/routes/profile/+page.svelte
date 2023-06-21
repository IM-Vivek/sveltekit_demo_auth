<script>
	export let form;
	export let data;
</script>

<div class="update-page">
	<div class="error-message">{form?.Msg || ''}</div>
	<div class="form">
		<div class="update">
			<div class="update-header">
				<h3>MY PROFILE</h3>
			</div>
		</div>
		<form class="update-form" action="?/update" method="post">
			<input type="text" name="FName" placeholder="First Name" value={data?.First_Name ?? ''}/>
			<input type="text" name="LName" placeholder="Last Name" value={data?.Last_Name ?? ''}/>
			<input type="text" name="email" placeholder="Email" value={data?.Email ?? ''}/>
			<button>update</button>
			<p class="message"><button formaction="?/logout">Logout</button></p>
            <p class="message"><button id="del_acc" formaction="?/del_acc">Delete My Account</button></p>
		</form>
	</div>
</div>

<style>
	@import url(https://fonts.googleapis.com/css?family=Roboto:300);
	.update-page {
		width: 360px;
		margin: 4% auto 0;
	}
	.update-page .form .update {
		margin-top: -31px;
		margin-bottom: 0;
	}
	.form {
		position: relative;
		z-index: 1;
		background: #ffffff;
		max-width: 360px;
		margin: 0 auto;
		padding: 45px;
		text-align: center;
		box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
	}
	.form input {
		font-family: 'Roboto', sans-serif;
		outline: 0;
		background: #f2f2f2;
		width: 100%;
		border: 0;
		margin: 0 0 15px;
		padding: 15px;
		box-sizing: border-box;
		font-size: 14px;
	}
	.form button {
		font-family: 'Roboto', sans-serif;
		text-transform: uppercase;
		outline: 0;
		background-color: #328f8a;
		background-image: linear-gradient(45deg, #328f8a, #08ac4b);
		width: 100%;
		border: 0;
		padding: 15px;
		color: #ffffff;
		font-size: 14px;
		-webkit-transition: all 0.3 ease;
		transition: all 0.3 ease;
		cursor: pointer;
	}
	.form .message {
		margin: 15px 0 0;
		color: #b3b3b3;
		font-size: 12px;
	}
	.form .message button {
		font-family: 'Roboto', sans-serif;
		text-transform: uppercase;
	    outline: 2px;
		background-color: transparent;
		background-image: none;
        border: 2px solid #328f8a;
		width: 100%;
		padding: 15px;
		color: #328f8a;
		font-size: 14px;
        font-weight: bold;
		-webkit-transition: all 0.3 ease;
		transition: all 0.3 ease;
		cursor: pointer;
	}

    #del_acc{
		background-color: #8f3232;
		background-image: linear-gradient(45deg, #8f3232, #ac0808);
		color: #ffffff;
        border: 0;
    }

	.error-message {
		display: flex;
		justify-content: center;
		font-size: 1.15em;
		color: red;
		margin-bottom: 5%;
	}
</style>
