require("dotenv").config();

const supabase = require("./supabase");

async function testDatabase() {
    console.log("Testing Supabase connection...");

    const { data, error } = await supabase
        .from("cities")
        .select("*")
        .limit(1);

    if (error) {
        console.error("DATABASE ERROR:");
        console.error(error);
        return;
    }

    console.log("SUPABASE CONNECTED!");
    console.log("Cities:", data);
}

testDatabase();