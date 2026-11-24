"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { House, Mail, Lock, User, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"register" | "login">("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (mode === "register" && !name.trim()) {
      setMessage("Unesite ime i prezime.");
      return;
    }

    if (password.length < 6) {
      setMessage("Lozinka mora imati najmanje 6 karaktera.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "register") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: name.trim(),
            },
          },
        });

        if (error) throw error;

        if (data.session) {
          router.push("/");
          router.refresh();
        } else {
          setMessage(
            "Nalog je napravljen! Proverite email i potvrdite adresu, pa se prijavite."
          );
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) throw error;

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Došlo je do greške. Pokušajte ponovo."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f2] flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-[#254b3f] text-white flex items-center justify-center">
            <House size={27}/>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#254b3f]">
            Porodični planer
          </h1>
          <p className="mt-2 text-sm text-[#84918a]">
            Organizujemo život zajedno 🌿
          </p>
        </div>

        <section className="bg-white border border-[#e9ece7] rounded-2xl shadow-sm p-7">
          <div className="grid grid-cols-2 bg-[#f5f7f3] rounded-xl p-1 mb-7">
            <button
              type="button"
              onClick={() => { setMode("register"); setMessage(""); }}
              className={`rounded-lg py-3 text-sm font-semibold ${
                mode === "register"
                  ? "bg-white text-[#254b3f] shadow-sm"
                  : "text-[#84918a]"
              }`}
            >
              Napravi nalog
            </button>
            <button
              type="button"
              onClick={() => { setMode("login"); setMessage(""); }}
              className={`rounded-lg py-3 text-sm font-semibold ${
                mode === "login"
                  ? "bg-white text-[#254b3f] shadow-sm"
                  : "text-[#84918a]"
              }`}
            >
              Prijavi se
            </button>
          </div>

          <h2 className="text-xl font-bold text-[#254b3f] mb-2">
            {mode === "register" ? "Dobro došli u porodicu!" : "Dobro nam došli nazad!"}
          </h2>
          <p className="text-sm text-[#84918a] mb-6">
            {mode === "register"
              ? "Napravite svoj lični nalog."
              : "Unesite podatke za prijavu."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <label className="block">
                <span className="text-sm font-medium text-[#42584d]">
                  Ime i prezime
                </span>
                <div className="mt-2 flex items-center gap-3 border border-[#e2e8e1] rounded-xl px-3">
                  <User size={18} className="text-[#84918a]"/>
                  <input
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Vaše ime i prezime"
                    autoComplete="name"
                    className="w-full py-3 outline-none text-sm bg-transparent"
                  />
                </div>
              </label>
            )}

            <label className="block">
              <span className="text-sm font-medium text-[#42584d]">Email adresa</span>
              <div className="mt-2 flex items-center gap-3 border border-[#e2e8e1] rounded-xl px-3">
                <Mail size={18} className="text-[#84918a]"/>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="ime@email.com"
                  autoComplete="email"
                  className="w-full py-3 outline-none text-sm bg-transparent"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-[#42584d]">Lozinka</span>
              <div className="mt-2 flex items-center gap-3 border border-[#e2e8e1] rounded-xl px-3">
                <Lock size={18} className="text-[#84918a]"/>
                <input
                  required
                  type="password"
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Najmanje 6 karaktera"
                  autoComplete={mode === "register" ? "new-password" : "current-password"}
                  className="w-full py-3 outline-none text-sm bg-transparent"
                />
              </div>
            </label>

            {message && (
              <div role="status" className="rounded-xl bg-[#f1f5ed] border border-[#dce8d9] p-3 text-sm text-[#365c48]">
                {message}
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#254b3f] hover:bg-[#32634f] disabled:opacity-60 text-white font-semibold py-3.5 transition-colors"
            >
              {loading
                ? "Molimo sačekajte..."
                : mode === "register"
                  ? "Napravi nalog"
                  : "Prijavi se"}
              {!loading && <ArrowRight size={17}/>}
            </button>
          </form>

          <p className="text-center text-xs text-[#9aa49d] mt-6">
            Vaši porodični podaci zaslužuju sigurnost i privatnost.
          </p>
        </section>
      </div>
    </main>
  );
}
