"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function FamilyPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function createFamily(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data: { user }, error: authError } =
        await supabase.auth.getUser();

      if (authError) throw authError;
      if (!user) throw new Error("Prvo se prijavite.");

      const { data, error } = await supabase.rpc(
        "create_family",
        { p_name: name.trim() }
      );

      if (error) throw error;
      if (!data) throw new Error("Porodica nije kreirana.");

      const { data: family, error: familyError } = await supabase
        .from("families")
        .select("name, invite_code")
        .eq("id", data)
        .single();

      if (familyError) throw familyError;

      setMessage(
        `Porodica ${family.name} je kreirana! Pozivni kod: ${family.invite_code}`
      );
    } catch (error: unknown) {
  console.error("Greška pri kreiranju porodice:", error);

  if (typeof error === "object" && error !== null) {
    const details = error as {
      message?: string;
      details?: string;
      hint?: string;
      code?: string;
    };

    setMessage(
      [
        details.message,
        details.details,
        details.hint,
        details.code ? `Kod: ${details.code}` : "",
      ].filter(Boolean).join(" | ") || "Nepoznata greška."
    );
  } else {
    setMessage(String(error));
  }
} finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f2] flex items-center justify-center p-5">
      <section className="bg-white rounded-2xl border border-[#e5eae3] shadow-sm p-8 w-full max-w-lg">
        <div className="text-4xl mb-5">🏡</div>
        <h1 className="text-3xl font-bold text-[#254b3f]">
          Moja porodica
        </h1>
        <p className="text-[#84918a] mt-3 mb-7">
          Napravite zajednički prostor za organizaciju porodičnog života.
        </p>

        <form onSubmit={createFamily} className="space-y-5">
          <label className="block">
            <span className="text-sm font-semibold text-[#42584d]">
              Naziv porodice
            </span>
            <input
              required
              maxLength={80}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Naša porodica"
              className="mt-2 w-full border border-[#e2e8e1] rounded-xl p-3 outline-none focus:border-[#477b60]"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#254b3f] text-white rounded-xl py-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Kreiranje..." : "Kreiraj porodicu"}
          </button>
        </form>

        {message && (
          <div className="mt-5 rounded-xl bg-[#f1f5ed] border border-[#dce8d9] p-4 text-sm text-[#365c48] break-words">
            {message}
          </div>
        )}
      </section>
    </main>
  );
}
