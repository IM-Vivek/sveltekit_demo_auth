import { redirect } from '@sveltejs/kit';

export const load = ({ cookies }) => {
    if (cookies.get('demo-auth')) {
		throw redirect(307, `/profile`);
	}
}

export const actions = {
	login: async ({ request, fetch, cookies }) => {
		const data = await request.formData();
		const Email = data.get('email');
		const Password = data.get('password');
		const response = await fetch('api/users', {
			method:"POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({Email, Password}),
		});
		const user = await response.json()
		if(user.result){
			cookies.set('demo-auth', user.data.Email);
			throw redirect(303, `/profile`);
		}
		return user
	}
};
