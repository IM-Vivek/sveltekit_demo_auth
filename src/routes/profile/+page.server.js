import { redirect } from '@sveltejs/kit';
export const load = async ({ cookies, fetch }) => {
	if (!cookies.get('demo-auth')) {
		throw redirect(307, `/`);
	} else {
		const response = await fetch('api/users/' + cookies.get('demo-auth'))
		const user = await response.json();
		return user.data
	}
}

export const actions = {
	update: async ({ request, fetch, cookies }) => {
		const data = await request.formData();
		const First_Name = data.get('FName');
		const Last_Name = data.get('LName');
		const Email = data.get('email');
		const old_Email = cookies.get('demo-auth')
		if (!First_Name || !Last_Name || !Email) {
			return {
				result: false,
				Msg: "All field are mandatory to update!!!"
			}
		} else {
			const response = await fetch('api/users', {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ First_Name, Last_Name, Email, old_Email }),
			});
			const user = await response.json()
			if (user.result) {
				cookies.set('demo-auth', user.data.Email);
				throw redirect(303, `/profile`);
			}
			return user
		}
	},

	logout: async ({ cookies }) => {
		cookies.delete('demo-auth')
		throw redirect(303, `/`);
	},

	del_acc: async ({ fetch, cookies }) => {
		const response = await fetch('api/users/' + cookies.get('demo-auth'), {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			}
		});
		const user = await response.json()
		if (user.result) {
			cookies.delete('demo-auth')
			throw redirect(303, `/`);
		}
		return user

	},
};