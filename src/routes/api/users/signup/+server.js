import { supabase } from "$lib/supabaseClient";
import bcrypt from 'bcryptjs';

export async function POST({ request }) {
    const { First_Name, Last_Name, Email, Password } = await request.json();
    if (!First_Name || !Last_Name || !Email || !Password) {
        return new Response(JSON.stringify({
            "result": false,
            "Msg": "All Four Parameters are required ---> First_Name, Last_Name, Email, Password!!!"
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt)
        const validation = await supabase
            .from("users")
            .select()
            .eq('Email', Email)
            .single()

        if (validation.data) {
            return new Response(JSON.stringify({
                "result": false,
                "Msg": "Email is already been registered !!!"
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            const { data, error } = await supabase
                .from("users")
                .insert([{ First_Name, Last_Name, Email, Password: hashedPassword }])
                .select()
                .single();

            if (error) {
                console.log(error)
                return new Response(JSON.stringify({
                    "result": false,
                    "Msg": "Something Went Wrong!!!!!"
                }), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                return new Response(JSON.stringify({
                    "result": true,
                    "data": {
                        "First_Name": data["First_Name"],
                        "Last_Name": data["Last_Name"],
                        "Email": data["Email"],
                    }
                }), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        }
    }

}