import { useState, useEffect, useRef, ReactNode } from 'react'

const WA = `https://wa.me/5534988138499?text=${encodeURIComponent('Olá, gostaria de agendar uma consulta com a Patricia Cordeiro - Advogada.')}`

/* ─── Scroll fade helper ───────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`fade-up ${inView ? 'in-view' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ─── Animated Scales SVG ───────────────────────────────────────── */
function AnimatedScales() {
  return (
    <svg viewBox="0 0 200 210" className="w-full h-full" aria-label="Balança da justiça">
      {/* Pole */}
      <rect x="98" y="55" width="4" height="130" fill="#c9a96e" rx="2" />
      {/* Base */}
      <rect x="92" y="182" width="16" height="22" fill="#c9a96e" rx="2" />
      <rect x="68" y="200" width="64" height="8" fill="#c9a96e" rx="3" />
      {/* Central orb */}
      <circle cx="100" cy="60" r="7" fill="#c9a96e" />
      {/* Animated beam + pans */}
      <g className="scale-beam">
        <rect x="28" y="57" width="144" height="5" fill="#c9a96e" rx="2.5" />
        {/* Left arm */}
        <line x1="38" y1="62" x2="38" y2="115" stroke="#c9a96e" strokeWidth="1.5" strokeDasharray="3 2" />
        {/* Right arm */}
        <line x1="162" y1="62" x2="162" y2="115" stroke="#c9a96e" strokeWidth="1.5" strokeDasharray="3 2" />
        {/* Left pan */}
        <ellipse cx="38" cy="118" rx="22" ry="5" fill="none" stroke="#c9a96e" strokeWidth="2" />
        <path d="M16 118 Q38 130 60 118" fill="none" stroke="#c9a96e" strokeWidth="2" />
        {/* Right pan */}
        <ellipse cx="162" cy="118" rx="22" ry="5" fill="none" stroke="#c9a96e" strokeWidth="2" />
        <path d="M140 118 Q162 130 184 118" fill="none" stroke="#c9a96e" strokeWidth="2" />
      </g>
    </svg>
  )
}

/* ─── WhatsApp CTA Button ───────────────────────────────────────── */
function WaButton({ label = 'Fale no WhatsApp', variant = 'primary' }: { label?: string; variant?: 'primary' | 'outline' | 'dark' }) {
  const base = 'inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-medium text-sm tracking-wide transition-all duration-300 cursor-pointer'
  const styles = {
    primary: `${base} bg-[#c9a96e] text-[#0d2340] hover:bg-[#e8d5b0] hover:scale-105 shadow-lg shadow-[#c9a96e33]`,
    outline: `${base} border border-white/60 text-white hover:bg-white hover:text-[#0d2340] hover:scale-105`,
    dark: `${base} bg-[#c9a96e] text-[#0d2340] hover:bg-[#e8d5b0] hover:scale-105 shadow-md`,
  }
  return (
    <a href={WA} target="_blank" rel="noopener noreferrer" className={styles[variant]}>
      <WaIcon />
      {label}
    </a>
  )
}

function WaIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.131.558 4.126 1.534 5.857L.057 23.942l6.244-1.437C7.864 23.467 9.892 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.817c-1.877 0-3.629-.498-5.147-1.368l-.368-.219-3.707.853.877-3.604-.24-.378C2.523 15.394 2.183 13.738 2.183 12c0-5.429 4.388-9.817 9.817-9.817 5.429 0 9.817 4.388 9.817 9.817 0 5.429-4.388 9.817-9.817 9.817z"/>
    </svg>
  )
}

/* ─── Logo ───────────────────────────────────────────────────────── */
function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className={`select-none leading-none ${light ? 'text-white' : 'text-[#0d2340]'}`} aria-label="Patricia Cordeiro - Advogada">
      <div className="font-serif text-lg tracking-wide">PATRICIA CORDEIRO</div>
      <div className="text-[9px] tracking-[0.28em] text-[#c9a96e] mt-1">ADVOGADA</div>
    </div>
  )
}

/* ─── Navigation ────────────────────────────────────────────────── */
const navLinks = ['Sobre', 'Áreas', 'Diferenciais', 'Depoimentos', 'FAQ']

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 nav-glass ${scrolled ? 'bg-[#0d2340]/95 shadow-xl shadow-black/20' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo light />
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map(l => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ã/g, 'a').replace(/ç/g, 'c')}`}
                className="text-white/70 hover:text-[#c9a96e] text-sm tracking-wide transition-colors duration-200"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden lg:block">
          <WaButton label="Consulta Gratuita" />
        </div>
        <button className="lg:hidden text-white p-2" onClick={() => setOpen(!open)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-[#0d2340] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-white/80 text-sm py-1" onClick={() => setOpen(false)}>{l}</a>
          ))}
          <WaButton label="Consulta Gratuita" />
        </div>
      )}
    </nav>
  )
}

/* ─── Hero ───────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0d2340]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1600&h=900&fit=crop&auto=format"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2340] via-[#0d2340]/85 to-[#0d2340]/40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left: copy */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-px bg-[#c9a96e]" />
            <span className="text-[#c9a96e] text-xs tracking-[0.3em] uppercase font-medium">Patricia Cordeiro - Advogada</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-semibold leading-tight mb-6">
            Direito ao<br />
            seu lado,<br />
            <em className="text-[#c9a96e] not-italic">sempre.</em>
          </h1>
          <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-md">
            Atendimento jurídico personalizado em Uberaba/MG e online, com clareza, ética e atenção individual ao seu caso.
          </p>
          <div className="flex flex-wrap gap-3 mb-12">
            <WaButton label="Fale no WhatsApp" />
            <a
              href="#areas"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/30 text-white text-sm font-medium tracking-wide hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300"
            >
              Nossas Áreas
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 text-white/50 text-xs tracking-wide">
            {['Online e presencial', 'Sigilo garantido', 'Em todo o Brasil'].map((t, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-[#c9a96e]" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: animated scales */}
        <div className="hidden lg:flex flex-col items-center justify-center">
          <div className="w-64 h-64 xl:w-80 xl:h-80 opacity-70">
            <AnimatedScales />
          </div>
          <blockquote className="mt-6 text-center max-w-xs">
            <p className="text-white/60 text-sm italic font-serif leading-relaxed">
              "O Direito ganha sentido<br />quando serve às pessoas."
            </p>
            <cite className="block mt-3 text-[#c9a96e] text-xs tracking-widest uppercase not-italic">Patricia Cordeiro</cite>
          </blockquote>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#c9a96e]" />
      </div>
    </section>
  )
}

/* ─── Stats Strip ────────────────────────────────────────────────── */
const stats = [
  { value: 'Uberaba', label: 'Minas Gerais' },
  { value: 'Online', label: 'Atendimento em todo o Brasil' },
  { value: '3', label: 'Áreas principais de atuação' },
  { value: '18h', label: 'Encerramento do atendimento' },
]

function StatsStrip() {
  return (
    <section className="bg-[#1b3a4b] py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <FadeUp key={i} delay={i * 80} className="text-center">
            <div className="font-serif text-3xl text-[#c9a96e] font-semibold">{s.value}</div>
            <div className="text-white/50 text-xs tracking-wide mt-1">{s.label}</div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

/* ─── About ──────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="sobre" className="py-24 bg-[#f7f5f0]">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <FadeUp>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=600&h=720&fit=crop&auto=format"
              alt="Patricia Cordeiro — advogada"
              className="w-full h-[480px] object-cover rounded-sm"
            />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-[#c9a96e] rounded-sm" />
          </div>
        </FadeUp>
        <FadeUp delay={150}>
          <div className="text-[#c9a96e] text-xs tracking-[0.3em] uppercase mb-4">Sobre o escritório</div>
          <h2 className="font-serif text-4xl text-[#0d2340] font-semibold leading-snug mb-6 gold-line">
            Mais que leis,<br />pessoas.
          </h2>
          <p className="text-[#0d2340]/60 leading-relaxed mb-6">
            Patricia Cordeiro Lima Mota Benze atua em Direito Civil, Direito de Família e Direito do Consumidor, oferecendo atendimento jurídico personalizado em Uberaba/MG e também de forma online.
          </p>
          <ul className="space-y-3 mb-8">
            {['Ética profissional', 'Atendimento humanizado', 'Estratégia e resultado', 'Sigilo e confidencialidade'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-[#0d2340]/80">
                <div className="w-4 h-4 rounded-full border border-[#c9a96e] flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
                </div>
                {item}
              </li>
            ))}
          </ul>
          <WaButton label="Fale Conosco" variant="dark" />
        </FadeUp>
      </div>
    </section>
  )
}

/* ─── Practice Areas ─────────────────────────────────────────────── */
const areas = [
  { icon: '⚖️', title: 'Direito de Família', desc: 'Divórcios, inventários, partilha de bens, guarda, pensão e união estável.' },
  { icon: '🏛️', title: 'Direito Civil', desc: 'Contratos, cobranças, indenizações e demais questões cíveis.' },
  { icon: '🛒', title: 'Direito do Consumidor', desc: 'Negativação indevida, descontos indevidos e relações de consumo.' },
]

function Areas() {
  return (
    <section id="areas" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-[#c9a96e] text-xs tracking-[0.3em] uppercase mb-3">Áreas de atuação</div>
            <h2 className="font-serif text-4xl text-[#0d2340] font-semibold gold-line">
              Soluções para cada<br />momento da sua vida.
            </h2>
          </div>
          <WaButton label="Agendar Consulta" variant="dark" />
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {areas.map((a, i) => (
            <FadeUp key={i} delay={i * 60}>
              <div className="card-lift group p-8 border border-[#ede9e0] rounded-sm bg-[#f7f5f0] hover:bg-[#0d2340] cursor-pointer">
                <div className="text-2xl mb-5">{a.icon}</div>
                <h3 className="font-serif text-lg text-[#0d2340] group-hover:text-white font-semibold mb-2 transition-colors duration-300">
                  {a.title}
                </h3>
                <p className="text-[#0d2340]/55 group-hover:text-white/60 text-sm leading-relaxed transition-colors duration-300">
                  {a.desc}
                </p>
                <div className="mt-6 flex items-center gap-1 text-[#c9a96e] text-xs tracking-wide">
                  Saiba mais
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-300"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Differentials ──────────────────────────────────────────────── */
const diffs = [
  { n: '01', title: 'Atendimento humanizado', desc: 'Você é sempre ouvido de verdade.' },
  { n: '02', title: 'Comunicação clara', desc: 'Sem juridiquês, com transparência.' },
  { n: '03', title: 'Estratégia personalizada', desc: 'Soluções sob medida para o seu caso.' },
  { n: '04', title: 'Foco em resultados', desc: 'Atuação técnica e comprometida.' },
  { n: '05', title: 'Sigilo e ética', desc: 'Seu caso em mãos confiáveis.' },
]

function Diferenciais() {
  return (
    <section id="diferenciais" className="py-24 bg-[#0d2340]">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        <FadeUp>
          <div className="text-[#c9a96e] text-xs tracking-[0.3em] uppercase mb-4">Por que nos escolher</div>
          <h2 className="font-serif text-4xl text-white font-semibold leading-snug mb-6">
            Mais do que processos,<br />construímos<br /><em className="text-[#c9a96e] not-italic">confiança.</em>
          </h2>
          <div className="mt-10 lg:mt-16">
            <WaButton label="Consulta Gratuita" />
          </div>
        </FadeUp>
        <div className="space-y-0 divide-y divide-white/10">
          {diffs.map((d, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div className="group flex gap-6 py-7 hover:pl-4 transition-all duration-300 cursor-default">
                <span className="text-[#c9a96e]/40 font-serif text-sm pt-0.5 flex-shrink-0">{d.n}</span>
                <div>
                  <h3 className="text-white font-semibold text-base group-hover:text-[#c9a96e] transition-colors duration-300">
                    {d.title}
                  </h3>
                  <p className="text-white/40 text-sm mt-1">{d.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── How It Works ───────────────────────────────────────────────── */
const steps = [
  { n: '1', title: 'Primeiro contato', desc: 'Fale pelo WhatsApp ou preencha o formulário.' },
  { n: '2', title: 'Análise do caso', desc: 'Entendemos sua necessidade e avaliamos o melhor caminho.' },
  { n: '3', title: 'Orientação jurídica', desc: 'Você recebe a estratégia e acompanhamento em todas as etapas.' },
]

function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-[#f7f5f0]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <div className="text-[#c9a96e] text-xs tracking-[0.3em] uppercase mb-3">Como funciona</div>
          <h2 className="font-serif text-4xl text-[#0d2340] font-semibold">
            Simples, claro e eficiente.
          </h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* connecting line */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%-1px)] right-[calc(16.66%-1px)] h-px bg-[#c9a96e]/30" />
          {steps.map((s, i) => (
            <FadeUp key={i} delay={i * 120}>
              <div className="relative flex flex-col items-center text-center px-6">
                <div className="w-16 h-16 rounded-full bg-[#0d2340] flex items-center justify-center mb-6 ring-4 ring-[#f7f5f0] relative z-10">
                  <span className="font-serif text-xl text-[#c9a96e]">{s.n}</span>
                </div>
                <h3 className="font-serif text-lg text-[#0d2340] font-semibold mb-2">{s.title}</h3>
                <p className="text-[#0d2340]/55 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp className="text-center mt-12">
          <WaButton label="Começar agora" />
        </FadeUp>
      </div>
    </section>
  )
}

/* ─── Testimonials ───────────────────────────────────────────────── */
const testimonials = [
  { quote: 'Fui muito bem atendida. Me senti acolhida e tive todo o suporte necessário.', name: 'Juliana Martins', role: 'Cliente' },
  { quote: 'Profissional extremamente competente. Sempre transparente. Recomendo de olhos fechados.', name: 'Ricardo Almeida', role: 'Cliente' },
  { quote: 'Atendimento impecável do início ao fim. Excelente profissional!', name: 'Camila Souza', role: 'Cliente' },
]

function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="mb-14">
          <div className="text-[#c9a96e] text-xs tracking-[0.3em] uppercase mb-3">Depoimentos</div>
          <h2 className="font-serif text-4xl text-[#0d2340] font-semibold gold-line">
            O que nossos<br />clientes dizem.
          </h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeUp key={i} delay={i * 100}>
              <div className="card-lift p-8 border border-[#ede9e0] bg-[#f7f5f0] rounded-sm h-full flex flex-col">
                <div className="text-[#c9a96e] text-4xl font-serif leading-none mb-4">"</div>
                <p className="text-[#0d2340]/70 text-sm leading-relaxed italic flex-1">{t.quote}</p>
                <div className="mt-6 pt-6 border-t border-[#ede9e0]">
                  <div className="font-semibold text-[#0d2340] text-sm">{t.name}</div>
                  <div className="text-[#c9a96e] text-xs tracking-wide mt-0.5">{t.role}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ────────────────────────────────────────────────────────── */
const faqs = [
  { q: 'O atendimento pode ser feito online?', a: 'Sim. Atendemos presencialmente em Uberaba/MG e também de forma online para clientes de todo o Brasil.' },
  { q: 'Quais documentos preciso para a consulta?', a: 'Depende do caso. Na maioria das situações, RG, CPF e documentos relacionados ao seu problema são suficientes para o primeiro atendimento.' },
  { q: 'Como agendo uma consulta?', a: 'Pelo WhatsApp ou pelo formulário em nosso site. Retornamos em até 24 horas.' },
  { q: 'Vocês atendem outras cidades?', a: 'Sim. Prestamos consultoria jurídica para clientes em todo o Brasil de forma remota.' },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-24 bg-[#f7f5f0]">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-16">
        <FadeUp className="lg:col-span-2">
          <div className="text-[#c9a96e] text-xs tracking-[0.3em] uppercase mb-3">Dúvidas frequentes</div>
          <h2 className="font-serif text-4xl text-[#0d2340] font-semibold gold-line mb-8">
            Perguntas<br />comuns.
          </h2>
          <p className="text-[#0d2340]/55 text-sm leading-relaxed mb-8">
            Não encontrou a resposta? Fale diretamente conosco.
          </p>
          <WaButton label="Fazer uma pergunta" variant="dark" />
        </FadeUp>
        <div className="lg:col-span-3 space-y-0 divide-y divide-[#ede9e0]">
          {faqs.map((f, i) => (
            <FadeUp key={i} delay={i * 60}>
              <button
                className="w-full text-left py-6 flex justify-between items-start gap-4 group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`font-medium text-sm transition-colors duration-200 ${open === i ? 'text-[#c9a96e]' : 'text-[#0d2340] group-hover:text-[#c9a96e]'}`}>
                  {f.q}
                </span>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${open === i ? 'border-[#c9a96e] bg-[#c9a96e] text-white rotate-45' : 'border-[#0d2340]/30 text-[#0d2340]/60'}`}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="pb-6 text-[#0d2340]/60 text-sm leading-relaxed">
                  {f.a}
                </div>
              )}
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Final CTA ──────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="relative py-28 bg-[#0d2340] overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <AnimatedScales />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <FadeUp>
          <div className="text-[#c9a96e] text-xs tracking-[0.3em] uppercase mb-5">Pronto para começar?</div>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-semibold leading-tight mb-6">
            Precisa de orientação<br />jurídica?
          </h2>
          <p className="text-white/50 mb-10">
            Fale agora. Sem compromisso, sem jargões.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <WaButton label="Fale no WhatsApp" />
            <a
              href="tel:+5534988138499"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/30 text-white text-sm font-medium tracking-wide hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 14a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3.26h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 18z"/>
              </svg>
              (34) 98813-8499
            </a>
          </div>
          <div className="flex justify-center gap-8 mt-10 text-white/30 text-xs tracking-wide">
            {['Atendimento rápido', 'Online e presencial', 'Todo o Brasil'].map((t, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-[#c9a96e]" />
                {t}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#080f1a] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          <div>
            <Logo light />
            <p className="text-white/40 text-xs leading-relaxed mt-4 max-w-xs">
              Atendimento jurídico personalizado em Uberaba — MG.
            </p>
          </div>
          <div>
            <div className="text-white/60 text-xs uppercase tracking-widest mb-4">Links</div>
            <ul className="space-y-2">
              {['Home', 'Sobre', 'Áreas de Atuação', 'Depoimentos', 'FAQ'].map(l => (
                <li key={l}><a href="#" className="text-white/40 text-xs hover:text-[#c9a96e] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-white/60 text-xs uppercase tracking-widest mb-4">Contato</div>
            <ul className="space-y-2 text-white/40 text-xs">
              <li>(34) 98813-8499</li>
              <li>R. Nacib Cury, 229 — Sala 08</li>
              <li>São Sebastião, Uberaba — MG, 38060-380</li>
            </ul>
          </div>
          <div>
            <div className="text-white/60 text-xs uppercase tracking-widest mb-4">Siga-nos</div>
            <div className="flex gap-3">
              {['IG', 'IN', 'YT'].map(s => (
                <a key={s} href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/40 text-xs hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-200">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row justify-between gap-3 text-white/25 text-xs">
          <span>© 2026 Patricia Cordeiro — Advogada. Todos os direitos reservados.</span>
          <a href="#" className="hover:text-white/50 transition-colors">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  )
}

/* ─── App ────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="antialiased">
      <Nav />
      <Hero />
      <StatsStrip />
      <About />
      <Areas />
      <Diferenciais />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />

      {/* Floating WhatsApp bubble */}
      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25d366] flex items-center justify-center shadow-xl shadow-black/30 hover:scale-110 hover:shadow-2xl transition-all duration-300"
        aria-label="Contato via WhatsApp"
      >
        <WaIcon size={26} />
      </a>
    </div>
  )
}
