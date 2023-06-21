import { supabase } from "$lib/supabaseClient";

export async function DELETE({ params }) {
    const { Email } = params;
    const { data, error } = await supabase
        .from("users")
        .delete()
        .eq('Email', Email)
        .select()
        .single();

    if (error) {
        console.log(error)
        if(error.code === 'PGRST116'){
            return new Response(JSON.stringify({
                "result": false,
                "Msg": "Email Not Registered!!!!!"
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        }
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

export async function GET({ params }) {
    const { Email } = params;
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
                "Msg": "Email Not Registered!!!!!"
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        }
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