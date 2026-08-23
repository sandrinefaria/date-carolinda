import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { RetroWindow, PixelHeart } from "@/components/RetroWindow";
import ziggy from "@/assets/ziggy.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sim ou Com Certeza? — Convite de Date Retrô" },
      {
        name: "description",
        content:
          "Convite interativo de date em estética anos 2000: escolha o rolê, mande sua reclamação no SAC e marque a data no calendário do crime.",
      },
      { property: "og:title", content: "Sim ou Com Certeza? — Convite de Date Retrô" },
      {
        property: "og:description",
        content:
          "O nosso próximo date vai acontecer: Sim ou Com Certeza? Um convite interativo com cara de Windows 98 e romance irônico.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DateInvite,
});

const ACTIVITIES = [
  { icon: "👀", label: "Julgar as coisas compartilhando o humor duvidoso" },
  { icon: "🎮", label: "Perder em algum jogo pra gente descontar a raiva uma na outra" },
  { icon: "🌯", label: "Você faz burritos no jantar, eu faço Pad Thai no almoço" },
  { icon: "📺", label: "Ver algum GL e recriar as cenas" },
  { icon: "😴", label: "Colocar o sono em dia juntas" },
  { icon: "🖍️", label: "Fazer um desenho uma pra outra juntas" },
  { icon: "🔮", label: "Date misterioso" },
];

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];

function DateInvite() {
  const [step, setStep] = useState(0);
  const [activity, setActivity] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [picked, setPicked] = useState<{ y: number; m: number; d: number } | null>(null);

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <TopBar step={step} />
        {step === 0 && <StepAsk onYes={() => setStep(1)} />}
        {step === 1 && (
          <StepActivities
            selected={activity}
            onSelect={setActivity}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <StepSac value={note} onChange={setNote} onNext={() => setStep(3)} />
        )}
        {step === 3 && (
          <StepCalendar picked={picked} onPick={setPicked} onNext={() => setStep(4)} />
        )}
        {step === 4 && (
          <StepFinal activity={activity} note={note} picked={picked} />
        )}
      </div>
    </main>
  );
}

function TopBar({ step }: { step: number }) {
  return (
    <div className="win overflow-hidden">
      <div className="win-title">
        <span>c:\amor\convite.exe</span>
        <span>{step + 1}/5</span>
      </div>
      <div className="overflow-hidden whitespace-nowrap bg-accent py-1 font-pixel text-[0.55rem] text-accent-foreground">
        <span className="marquee-track inline-block">
          ★ bem-vinda ao meu site pessoal ★ melhor visualizado em 800x600 ★ voce e a visitante
          numero 000001 ★ nao tem botao de sair ★
        </span>
      </div>
    </div>
  );
}

/* ---------- 1. O pedido inescusável ---------- */

function StepAsk({ onYes }: { onYes: () => void }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [popup, setPopup] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);

  function flee() {
    const area = areaRef.current;
    if (!area) return;
    const w = area.clientWidth;
    const h = area.clientHeight;
    setPos({
      x: Math.random() * Math.max(w - 180, 40) - (w - 180) / 2,
      y: Math.random() * Math.max(h - 70, 40) - (h - 70) / 2,
    });
    setPopup(true);
  }

  return (
    <>
      <RetroWindow title="pedido_inescusavel.html">
        <p className="font-pixel text-[0.6rem] text-muted-foreground">*** aviso legal ***</p>
        <h1 className="mt-3 font-pixel text-base leading-relaxed text-foreground sm:text-2xl">
          O nosso próximo date vai acontecer:
          <br />
          <span className="text-primary">Sim ou Com Certeza?</span>
        </h1>

        <div
          ref={areaRef}
          className="relative mt-8 flex min-h-[220px] flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <button
            onClick={onYes}
            className="pixel-btn flex items-center gap-3 px-8 py-5 text-sm sm:text-lg"
          >
            <PixelHeart className="blink h-5 w-5" />
            SIM
            <PixelHeart className="blink h-5 w-5" />
          </button>

          <button
            onMouseEnter={flee}
            onFocus={flee}
            onClick={flee}
            onTouchStart={(e) => {
              e.preventDefault();
              flee();
            }}
            style={pos ? { transform: `translate(${pos.x}px, ${pos.y}px)` } : undefined}
            className="pixel-btn-alt px-8 py-5 text-sm transition-transform duration-150 sm:text-lg"
          >
            NÃO
          </button>
        </div>

        <p className="mt-6 text-center text-muted-foreground">
          (o botão "não" está passando por uma instabilidade emocional)
        </p>
      </RetroWindow>

      {popup && <ZiggyPopup onClose={() => setPopup(false)} />}
    </>
  );
}

function ZiggyPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4">
      <div className="win floaty w-full max-w-sm">
        <div className="win-title">
          <span>erro_fatal.exe</span>
          <button onClick={onClose} className="border-2 border-primary-foreground px-1 leading-none">
            x
          </button>
        </div>
        <div className="flex gap-4 p-5">
          <img
            src={ziggy.url}
            alt="Ziggy, o husky guardião do botão não"
            className="h-24 w-24 border-3 border-border object-cover"
            style={{ borderWidth: 3 }}
          />
          <div>
            <p className="font-pixel text-[0.6rem] leading-relaxed text-destructive">
              ⚠ O Ziggy bloqueou este botão
            </p>
            <p className="mt-2 leading-tight text-muted-foreground">
              Erro 0xZIG: recusa não autorizada pelo cão de guarda. Tente novamente em nunca.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2 px-5 pb-5">
          <button onClick={onClose} className="pixel-btn px-4 py-2 text-[0.6rem]">
            ok, me desculpe
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- 2. Seleção do rolê ---------- */

function StepActivities({
  selected,
  onSelect,
  onNext,
}: {
  selected: string | null;
  onSelect: (v: string) => void;
  onNext: () => void;
}) {
  return (
    <RetroWindow title="cardapio_de_roles.exe">
      <h2 className="font-pixel text-sm leading-relaxed text-foreground sm:text-lg">
        O que você prefere (ou vai ter que aceitar)?
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {ACTIVITIES.map((a) => {
          const active = selected === a.label;
          return (
            <button
              key={a.label}
              onClick={() => onSelect(a.label)}
              className={`flex items-start gap-3 border-3 p-3 text-left leading-tight transition-transform ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-input text-foreground hover:-translate-y-1"
              }`}
              style={{ borderWidth: 3, borderColor: "var(--border)" }}
            >
              <span className="text-2xl">{a.icon}</span>
              <span>{a.label}</span>
              {active && <PixelHeart className="ml-auto h-4 w-4 shrink-0 blink" />}
            </button>
          );
        })}
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-muted-foreground">
          {selected ? "boa escolha, previsível." : "escolha uma, o silêncio também é uma escolha ruim."}
        </p>
        <button
          disabled={!selected}
          onClick={onNext}
          className="pixel-btn px-5 py-3 text-[0.6rem] disabled:opacity-40"
        >
          continuar »
        </button>
      </div>
    </RetroWindow>
  );
}

/* ---------- 3. SAC da consumidora ---------- */

function StepSac({
  value,
  onChange,
  onNext,
}: {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
}) {
  const [sent, setSent] = useState(false);

  return (
    <RetroWindow title="sac_da_consumidora.txt">
      <div
        className="bg-input p-4 leading-tight"
        style={{ border: "3px solid var(--border)" }}
      >
        <p className="font-pixel text-[0.6rem] leading-relaxed text-primary">
          ☎ central de atendimento — online desde 2003
        </p>
        <p className="mt-3">
          "O serviço de atendimento à consumidora aceita dúvidas, reclamações e sugestões.
          Gostaria de acrescentar algo?"
        </p>
      </div>

      <textarea
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setSent(false);
        }}
        rows={6}
        placeholder="digite aqui seu desabafo, exigência ou declaração acidental..."
        className="mt-4 w-full resize-none bg-card p-3 font-term text-lg text-foreground outline-none"
        style={{
          border: "3px solid var(--border)",
          backgroundImage:
            "repeating-linear-gradient(oklch(0.97 0.02 330) 0 27px, oklch(0.86 0.03 320) 27px 28px)",
        }}
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button onClick={() => setSent(true)} className="pixel-btn-alt px-4 py-3 text-[0.6rem]">
          enviar para a central
        </button>
        <button onClick={onNext} className="pixel-btn px-5 py-3 text-[0.6rem]">
          continuar »
        </button>
      </div>
      {sent && (
        <p className="blink mt-3 font-pixel text-[0.55rem] text-primary">
          protocolo #{String(value.length).padStart(4, "0")} — sua ligação é muito importante pra mim.
        </p>
      )}
    </RetroWindow>
  );
}

/* ---------- 4. Calendário do crime ---------- */

function StepCalendar({
  picked,
  onPick,
  onNext,
}: {
  picked: { y: number; m: number; d: number } | null;
  onPick: (v: { y: number; m: number; d: number }) => void;
  onNext: () => void;
}) {
  const today = new Date();
  const [y, setY] = useState(today.getFullYear());
  const [m, setM] = useState(today.getMonth());

  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();

  function shift(delta: number) {
    const d = new Date(y, m + delta, 1);
    setY(d.getFullYear());
    setM(d.getMonth());
  }

  return (
    <RetroWindow title="calendario_do_crime.exe">
      <h2 className="font-pixel text-sm text-foreground">Quando será o crime?</h2>
      <div className="mt-5" style={{ border: "3px solid var(--border)" }}>
        <div className="flex items-center justify-between bg-primary px-3 py-2 font-pixel text-[0.6rem] text-primary-foreground">
          <button onClick={() => shift(-1)}>« </button>
          <span>
            {MONTHS[m]} {y}
          </span>
          <button onClick={() => shift(1)}> »</button>
        </div>
        <div className="grid grid-cols-7 bg-card text-center">
          {WEEKDAYS.map((w, i) => (
            <div key={i} className="py-1 font-pixel text-[0.5rem] text-muted-foreground">
              {w}
            </div>
          ))}
          {Array.from({ length: first }).map((_, i) => (
            <div key={`e${i}`} />
          ))}
          {Array.from({ length: days }).map((_, i) => {
            const d = i + 1;
            const active = picked?.y === y && picked?.m === m && picked?.d === d;
            return (
              <button
                key={d}
                onClick={() => onPick({ y, m, d })}
                className={`aspect-square text-lg ${
                  active
                    ? "bg-primary font-pixel text-[0.6rem] text-primary-foreground"
                    : "text-foreground hover:bg-accent"
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-muted-foreground">
          {picked
            ? `marcado: ${picked.d}/${picked.m + 1}/${picked.y}. sem remarcações.`
            : "clique num dia. desmarcar depois dá multa."}
        </p>
        <button
          disabled={!picked}
          onClick={onNext}
          className="pixel-btn px-5 py-3 text-[0.6rem] disabled:opacity-40"
        >
          confirmar »
        </button>
      </div>
    </RetroWindow>
  );
}

/* ---------- 5. Grand finale ---------- */

function StepFinal({
  activity,
  note,
  picked,
}: {
  activity: string | null;
  note: string;
  picked: { y: number; m: number; d: number } | null;
}) {
  const [confetti, setConfetti] = useState(false);
  useEffect(() => {
    setConfetti(true);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const dateLabel = picked ? `${pad(picked.d)}/${pad(picked.m + 1)}/${picked.y}` : "a definir";
  const gcalDate = picked ? `${picked.y}${pad(picked.m + 1)}${pad(picked.d)}` : "";
  const next = picked ? new Date(picked.y, picked.m, picked.d + 1) : null;
  const gcalEnd = next
    ? `${next.getFullYear()}${pad(next.getMonth() + 1)}${pad(next.getDate())}`
    : "";

  const gcalUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent("Date confirmado 💗 " + (activity ?? ""))}` +
    (gcalDate ? `&dates=${gcalDate}/${gcalEnd}` : "") +
    `&details=${encodeURIComponent(
      "Compromisso inadiável: me suportar por algumas horas." +
        (note ? `\n\nRecado do SAC: ${note}` : ""),
    )}`;

  return (
    <>
      <RetroWindow title="confirmacao_final.exe" className={confetti ? "floaty" : ""}>
        <h2 className="font-pixel text-sm leading-relaxed text-primary sm:text-lg">
          Seu date foi confirmado por livre e espontânea pressão. Esperamos que seja prazeroso 🫦
        </h2>

        <div
          className="relative mt-8 bg-input p-5"
          style={{ border: "3px dashed var(--border)" }}
        >
          <PixelHeart className="blink absolute -top-4 -left-4 h-8 w-8 text-primary" />
          <PixelHeart className="blink absolute -top-4 -right-4 h-8 w-8 text-primary" />
          <PixelHeart className="absolute -bottom-4 -left-4 h-8 w-8 text-secondary" />
          <PixelHeart className="absolute -bottom-4 -right-4 h-8 w-8 text-secondary" />

          <dl className="space-y-4">
            <div>
              <dt className="font-pixel text-[0.55rem] text-muted-foreground">atividade</dt>
              <dd className="leading-tight">{activity ?? "surpresa (má)"}</dd>
            </div>
            <div>
              <dt className="font-pixel text-[0.55rem] text-muted-foreground">data do crime</dt>
              <dd>{dateLabel}</dd>
            </div>
            <div>
              <dt className="font-pixel text-[0.55rem] text-muted-foreground">
                recado no sac
              </dt>
              <dd className="leading-tight">
                {note.trim() || "nada a declarar (suspeito)."}
              </dd>
            </div>
          </dl>
        </div>
      </RetroWindow>

      <div className="win">
        <div className="win-title">
          <span>⚠ notificacao_do_sistema</span>
          <span className="blink">!</span>
        </div>
        <div className="space-y-4 p-5">
          <p className="font-pixel text-[0.6rem] leading-relaxed text-foreground">
            Compromisso inadiável: me suportar por algumas horas.
          </p>
          <p className="text-muted-foreground">
            Salve este link na sua agenda do Google (vai usar sim!)
          </p>
          <a
            href={gcalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn inline-block px-5 py-3 text-[0.6rem]"
          >
            📅 salvar na agenda
          </a>
        </div>
      </div>
    </>
  );
}
