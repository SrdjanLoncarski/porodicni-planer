
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DatabaseTest() {
  const [status, setStatus] = useState("Proveravam vezu...");

  useEffect(() => {
    async function checkConnection() {
      const { error } = await supabase
        .from("families")
        .select("id")
        .limit(1);

      if (error) {
        setStatus("Greška: " + error.message);
      } else {
        setStatus("Veza sa bazom je uspešna!");
      }
    }

    checkConnection();
  }, []);

  return (
    <main style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Porodični planer</h1>
      <p>{status}</p>
    </main>
  );
}
