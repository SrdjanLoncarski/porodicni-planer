"use client";

import { useState } from "react";
import {
  House, Wallet, ShoppingBasket, ListTodo, Bell,
  Users, Settings, Plus, Check, ArrowUpRight,
  ArrowDownRight, CalendarDays, Search, Menu,
  CircleUserRound, Clock, Trash2, X
} from "lucide-react";

type Task = { id: number; title: string; done: boolean; person: string };
type Product = { id: number; title: string; done: boolean };

const initialTasks: Task[] = [
  { id: 1, title: "Platiti račun za struju", done: false, person: "Ana" },
  { id: 2, title: "Očistiti stan", done: false, person: "Marko" },
  { id: 3, title: "Organizovati porodični ručak", done: true, person: "Ana" },
];

const initialProducts: Product[] = [
  { id: 1, title: "Mleko", done: false },
  { id: 2, title: "Hleb", done: false },
  { id: 3, title: "Jaja", done: true },
  { id: 4, title: "Voće", done: false },
];

const navigation = [
  { id: "Pregled", icon: House },
  { id: "Finansije", icon: Wallet },
  { id: "Kupovina", icon: ShoppingBasket },
  { id: "To-do lista", icon: ListTodo },
  { id: "Podsetnici", icon: Bell },
  { id: "Porodica", icon: Users },
  { id: "Podešavanja", icon: Settings },
];

const money = (n: number) =>
  n.toLocaleString("sr-RS") + " RSD";

export default function Home() {
  const [active, setActive] = useState("Pregled");
  const [tasks, setTasks] = useState(initialTasks);
  const [products, setProducts] = useState(initialProducts);
  const [taskInput, setTaskInput] = useState("");
  const [productInput, setProductInput] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const pendingTasks = tasks.filter(t => !t.done).length;
  const pendingProducts = products.filter(p => !p.done).length;

  function addTask() {
    if (!taskInput.trim()) return;
    setTasks(old => [...old, {
      id: Date.now(), title: taskInput.trim(), done: false, person: "Ana"
    }]);
    setTaskInput("");
  }

  function addProduct() {
    if (!productInput.trim()) return;
    setProducts(old => [...old, {
      id: Date.now(), title: productInput.trim(), done: false
    }]);
    setProductInput("");
  }

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon"><House size={23}/></div>
          <div>
            <strong>Porodični planer</strong>
            <span>Naš zajednički dom</span>
          </div>
          <button className="mobile-close" onClick={() => setMobileMenu(false)}>
            <X size={20}/>
          </button>
        </div>

        <div className="family-card">
          <div className="family-avatar"><House size={20}/></div>
          <div>
            <strong>Naša porodica</strong>
            <span>Porodični prostor</span>
          </div>
        </div>

        <span className="menu-label">GLAVNI MENI</span>
        <nav>
          {navigation.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${active === item.id ? "active" : ""}`}
                onClick={() => { setActive(item.id); setMobileMenu(false); }}
              >
                <Icon size={19}/>
                <span>{item.id}</span>
                {item.id === "To-do lista" && pendingTasks > 0 &&
                  <small>{pendingTasks}</small>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="profile">
            <div className="profile-avatar">A</div>
            <div><strong>Ana</strong><span>Član porodice</span></div>
            <Settings size={17}/>
          </div>
          <span className="version">PORODIČNI PLANER · 1.0</span>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileMenu(true)}>
            <Menu size={22}/>
          </button>
          <div className="search-box">
            <Search size={17}/>
            <input placeholder="Pretraži planer..." />
          </div>
          <div className="top-actions">
            <button className="notification-button" onClick={() => setActive("Podsetnici")}>
              <Bell size={19}/><i/>
            </button>
            <div className="top-user">
              <div className="profile-avatar">A</div>
              <span>Ana</span>
            </div>
          </div>
        </header>

        <div className="content">
          <div className="welcome-row">
            <div>
              <span className="eyebrow">PORODIČNI PROSTOR</span>
              <h1>{active === "Pregled" ? "Dobro došli kući! 🌿" : active}</h1>
              <p>{active === "Pregled"
                ? "Sve što je važno za vašu porodicu, na jednom mestu."
                : "Organizujte porodični život jednostavno i pregledno."}</p>
            </div>
            <div className="date-pill"><CalendarDays size={17}/> 24. novembar 2026.</div>
          </div>

          {active === "Pregled" && (
            <>
              <div className="stats-grid">
                <div className="stat-card income-card">
                  <div className="stat-top"><span>Ukupna primanja</span><span className="stat-icon"><Wallet size={19}/></span></div>
                  <strong>{money(180000)}</strong>
                  <span className="stat-note"><ArrowUpRight size={15}/> Zajednička primanja</span>
                </div>
                <div className="stat-card expense-card">
                  <div className="stat-top"><span>Mesečni troškovi</span><span className="stat-icon"><ArrowDownRight size={19}/></span></div>
                  <strong>{money(62500)}</strong>
                  <span className="stat-note">Evidentirani troškovi</span>
                </div>
                <div className="stat-card balance-card">
                  <div className="stat-top"><span>Preostalo novca</span><span className="stat-icon"><Wallet size={19}/></span></div>
                  <strong>{money(117500)}</strong>
                  <span className="stat-note">Stanje porodičnih finansija</span>
                </div>
              </div>

              <div className="section-heading">
                <div><h2>Vaš porodični prostor</h2><p>Sve važne aktivnosti na jednom mestu.</p></div>
              </div>

              <div className="feature-grid">
                <button className="feature-card" onClick={() => setActive("Finansije")}>
                  <div className="feature-icon green"><Wallet/></div>
                  <strong>Porodične finansije</strong>
                  <span>Primanja, troškovi i pregled budžeta</span>
                  <ArrowUpRight className="feature-arrow"/>
                </button>
                <button className="feature-card" onClick={() => setActive("Kupovina")}>
                  <div className="feature-icon orange"><ShoppingBasket/></div>
                  <strong>Spisak za kupovinu</strong>
                  <span>{pendingProducts} proizvoda čeka kupovinu</span>
                  <ArrowUpRight className="feature-arrow"/>
                </button>
                <button className="feature-card" onClick={() => setActive("To-do lista")}>
                  <div className="feature-icon blue"><ListTodo/></div>
                  <strong>To-do lista</strong>
                  <span>{pendingTasks} zadataka je u toku</span>
                  <ArrowUpRight className="feature-arrow"/>
                </button>
                <button className="feature-card" onClick={() => setActive("Podsetnici")}>
                  <div className="feature-icon purple"><Bell/></div>
                  <strong>Podsetnici</strong>
                  <span>Važni datumi i porodične obaveze</span>
                  <ArrowUpRight className="feature-arrow"/>
                </button>
              </div>

              <div className="bottom-grid">
                <div className="panel">
                  <div className="panel-heading"><div><h3>Porodične obaveze</h3><p>Šta još treba da završimo?</p></div><button onClick={() => setActive("To-do lista")}>Pogledaj sve →</button></div>
                  {tasks.slice(0, 3).map(task => (
                    <label className="task-row" key={task.id}>
                      <input type="checkbox" checked={task.done} onChange={() => setTasks(old => old.map(t => t.id === task.id ? {...t, done: !t.done} : t))}/>
                      <span className={task.done ? "completed" : ""}>{task.title}</span>
                      <small>{task.person}</small>
                    </label>
                  ))}
                </div>
                <div className="panel">
                  <div className="panel-heading"><div><h3>Predstojeće obaveze</h3><p>Ne zaboravite važne stvari.</p></div><Bell size={18}/></div>
                  <div className="reminder-row"><div className="reminder-date"><strong>25</strong><span>NOV</span></div><div><strong>Platiti račun za struju</strong><span>09:00 · Ana</span></div></div>
                  <div className="reminder-row"><div className="reminder-date"><strong>26</strong><span>NOV</span></div><div><strong>Porodična kupovina</strong><span>17:00 · Marko</span></div></div>
                </div>
              </div>
            </>
          )}

          {active === "To-do lista" && (
            <div className="panel full-panel">
              <div className="panel-heading"><div><h3>Porodična To-do lista</h3><p>Dodajte obaveze i pratite njihov napredak.</p></div><span className="count-pill">{pendingTasks} aktivnih</span></div>
              <form className="add-row" onSubmit={e => {e.preventDefault();addTask();}}>
                <input value={taskInput} onChange={e => setTaskInput(e.target.value)} placeholder="Unesite novi zadatak..."/>
                <button type="submit"><Plus size={17}/> Dodaj zadatak</button>
              </form>
              {tasks.map(task => <div className="list-row" key={task.id}><label><input type="checkbox" checked={task.done} onChange={() => setTasks(old => old.map(t => t.id === task.id ? {...t,done:!t.done}:t))}/><span className={task.done ? "completed":""}>{task.title}</span></label><small>{task.person}</small><button className="delete-button" onClick={() => setTasks(old => old.filter(t => t.id !== task.id))}><Trash2 size={16}/></button></div>)}
            </div>
          )}

          {active === "Kupovina" && (
            <div className="panel full-panel">
              <div className="panel-heading"><div><h3>Zajednički spisak za kupovinu</h3><p>Spisak dostupan celoj porodici.</p></div><span className="count-pill">{pendingProducts} preostalo</span></div>
              <form className="add-row" onSubmit={e => {e.preventDefault();addProduct();}}>
                <input value={productInput} onChange={e => setProductInput(e.target.value)} placeholder="Dodajte proizvod..."/>
                <button type="submit"><Plus size={17}/> Dodaj proizvod</button>
              </form>
              {products.map(product => <div className="list-row" key={product.id}><label><input type="checkbox" checked={product.done} onChange={() => setProducts(old => old.map(p => p.id === product.id ? {...p,done:!p.done}:p))}/><span className={product.done ? "completed":""}>{product.title}</span></label><button className="delete-button" onClick={() => setProducts(old => old.filter(p => p.id !== product.id))}><Trash2 size={16}/></button></div>)}
            </div>
          )}

          {active === "Finansije" && (
            <div className="panel full-panel"><h3>Porodične finansije</h3><p>Ukupna primanja: <strong>{money(180000)}</strong></p><p>Mesečni troškovi: <strong>{money(62500)}</strong></p><p>Preostalo: <strong>{money(117500)}</strong></p><p className="muted">Ovo su demonstracioni podaci. Povezivanje sa stvarnom bazom sledi.</p></div>
          )}

          {active === "Podsetnici" && (
            <div className="panel full-panel"><h3>Podsetnici</h3><div className="reminder-row"><div className="reminder-date"><strong>25</strong><span>NOV</span></div><div><strong>Platiti račun za struju</strong><span>09:00 · Ana</span></div></div><div className="reminder-row"><div className="reminder-date"><strong>26</strong><span>NOV</span></div><div><strong>Porodična kupovina</strong><span>17:00 · Marko</span></div></div><p className="muted">Push obaveštenja ćemo uključiti u sledećoj fazi.</p></div>
          )}

          {(active === "Porodica" || active === "Podešavanja") && (
            <div className="panel full-panel"><h3>{active}</h3><p>Ovde ćemo dodati porodični pristupni kod, članove, profile i podešavanja privatnosti.</p><div className="family-member"><CircleUserRound/><div><strong>Ana</strong><span>Administrator porodice</span></div></div><div className="family-member"><CircleUserRound/><div><strong>Marko</strong><span>Član porodice</span></div></div><p className="muted">Povezivanje stvarnih naloga sledi.</p></div>
          )}

          <footer>Porodični planer <span>•</span> Organizujemo život zajedno 🌿</footer>
        </div>
      </section>
    </main>
  );
}
