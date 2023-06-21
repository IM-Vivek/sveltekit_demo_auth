import { supabase } from "$lib/supabaseClient";
import bcrypt from 'bcryptjs';

export async function POST({ request }) {
    const { Email, Password } = await request.json();
    const { data, error } = await supabase
        .from("users")
        .select()
        .eq('Email', Email)
        .single();
    if (error) {
        console.log(error)
        if(error.code === 'PGRST116'){
            return new Response(JSON.stringify({
                "result": false,
                "Msg": "Email is not registerd!!!"
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        return new Response(JSON.stringify({
            "result": false,
            "Msg": "Something Went Wrong!!!"
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else {
        if (data) {
            const checkPassword = await bcrypt.compare(Password, data["Password"])
            if (checkPassword) {
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
            } else {
                return new Response(JSON.stringify({
                    "result": false,
                    "Msg": "Invalid Password!!!"
                }), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        } else {
            return new Response(JSON.stringify({
                "result": false,
                "Msg": "Email is not registerd!!!"
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }
}

export async function PUT({ request }) {
    const { First_Name, Last_Name, Email, old_Email } = await request.json();
    if (!First_Name || !Last_Name || !Email || !old_Email) {
        return new Response(JSON.stringify({
            "result": false,
            "Msg": "All Four Parameters are required ---> First_Name, Last_Name, Email, old_Email!!!"
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else {
        const { data, error } = await supabase
            .from("users")
            .update({ First_Name, Last_Name, Email })
            .eq('Email', old_Email)
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