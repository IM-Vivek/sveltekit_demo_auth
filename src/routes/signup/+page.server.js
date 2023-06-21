import { redirect } from '@sveltejs/kit';

export const load = ({ cookies }) => {
    if (cookies.get('demo-auth')) {
		throw redirect(307, `/profile`);
	}
}

export const actions = {
	signup: async ({ request, fetch, cookies }) => {
		const data = await request.formData();
		const First_Name = data.get('FName');
		const Last_Name = data.get('LName');
		const Email = data.get('email');
		const Password = data.get('pass');
		const cPass = data.get('cpass');
		if (cPass !== Password) {
			return {
				result: false,
				Msg: "Password doesn't match!!!"
			}
		} else {
			const response = await fetch('api/users/signup', {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ First_Name, Last_Name, Email, Password }),
			});
			const user = await response.json()
			if(user.result){
				cookies.set('demo-auth', user.data.Email);
				throw redirect(303, `/profile`);
			}
			return user
		}
	}
};
