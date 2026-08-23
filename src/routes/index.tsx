import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { RetroWindow, PixelHeart } from "@/components/RetroWindow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Carolinda 💙​" },
      {
        name: "description",
        content:
          "Convite interativo de date em estética anos 2000: escolha o rolê, mande sua reclamação no SAC e marque a data.",
      },
      { property: "og:title", content: "Carolinda 💙​" },
      {
        property: "og:description",
        content: "O nosso próximo date vai acontecer: Sim ou Com Certeza?",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: DateInvite,
});

const ACTIVITIES = [
  { icon: "👀", label: "Julgar as coisas compartilhando o humor duvidoso" },
  { icon: "🎮", label: "Perder em algum jogo/aposta pra gente descontar a raiva uma na outra" },
  { icon: "🌯", label: "Você faz burritos no jantar, eu faço Pad Thai no almoço" },
  { icon: "📺", label: "Ver algum GL e recriar as cenas" },
  { icon: "😴", label: "Colocar o sono em dia juntas" },
  { icon: "🖍️", label: "Fazer um desenho uma pra outra" },
  { icon: "🔮", label: "Date misterioso" },
  { icon: "💡", label: "Eu gostaria de sugerir uma nova opção" },
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
          <StepSac
            value={note}
            onChange={setNote}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <StepCalendar picked={picked} onPick={setPicked} onNext={() => setStep(4)} />
        )}
        {step === 4 && (
          <StepFinal activity={activity} picked={picked} />
        )}
      </div>
    </main>
  );
}

function TopBar({ step }: { step: number }) {
  return (
    <div className="win overflow-hidden">
      <div className="win-title">
        <span>c:\date\convite.exe</span>
        <span>{step + 1}/5</span>
      </div>
      <div className="overflow-hidden whitespace-nowrap bg-accent py-1 font-pixel text-[0.55rem] text-accent-foreground">
        <span className="marquee-track inline-block">
          ★ bem-vinda ao meu coração ★ melhor visualizado em 800x600 ★ você é a visitante
          número 000001 ★ nao tem botão de sair ★
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
          <span className="text-primary">SIM ou COM CERTEZA?</span>
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
          (o botão de recusa está temporariamente fora de cogitação)
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
        <div className="flex gap-4 p-5 items-center">
          <img
            src="/Ziggy.jpg"
            alt="Ziggy, o husky guardião"
            className="h-24 w-24 shrink-0 border-3 border-border object-cover"
            style={{ borderWidth: 3 }}
          />
          <div>
            <p className="font-pixel text-[0.6rem] leading-relaxed text-destructive">
              ⚠ Ziggy bloqueou esta tentativa
            </p>
            <p className="mt-2 leading-tight text-muted-foreground">
              Error404: recusa não autorizada pelo cão de guarda do meu coração.
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
    <RetroWindow title="cardapio_de_ideias.exe">
      <h2 className="font-pixel text-sm leading-relaxed text-foreground sm:text-lg">
        Selecione o programa oficial:
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
          {selected ? "ótima escolha registrada." : "selecione uma das alternativas acima para prosseguir."}
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
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!value.trim()) {
      setErrorMsg(true);
      return;
    }

    setErrorMsg(false);
    setSending(true);
    try {
      await fetch("https://formspree.io/f/xzepqknv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagem_sac: value }),
      });
    } catch (e) {
      console.error("Erro ao enviar", e);
    } finally {
      setSending(false);
    }
    onNext();
  }

  return (
    <RetroWindow title="sac_da_consumidora.txt">
      <form onSubmit={handleSubmit}>
        <div
          className="bg-input p-4 leading-tight"
          style={{ border: "3px solid var(--border)" }}
        >
          <p className="font-pixel text-[0.6rem] leading-relaxed text-primary">
            ☎ canal oficial de atendimento e sugestões
          </p>
          <p className="mt-3">
            Deixe sua mensagem, reclamação ou sugestão abaixo. Assim que possível, iremos te responder (porém, depende):
          </p>
        </div>

        <textarea
          required
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (e.target.value.trim()) setErrorMsg(false);
          }}
          rows={6}
          placeholder="digite aqui o seu recado..."
          className="mt-4 w-full resize-none bg-card p-3 font-term text-lg text-foreground outline-none"
          style={{
            border: "3px solid var(--border)",
            backgroundImage:
              "repeating-linear-gradient(oklch(0.97 0.02 330) 0 27px, oklch(0.86 0.03 320) 27px 28px)",
          }}
        />

        {errorMsg && (
          <p className="mt-2 font-pixel text-[0.6rem] text-destructive animate-bounce">
            ⚠ Você não tem escapatória! Agora vai precisar digitar alguma coisa no sistema.
          </p>
        )}

        <div className="mt-4 flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={sending}
            className="pixel-btn px-5 py-3 text-[0.6rem]"
          >
            {sending ? "enviando..." : "continuar »"}
          </button>
        </div>
      </form>
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
      <h2 className="font-pixel text-sm text-foreground">Defina a data oficial (não é só a minha agenda que está disponível pra você):</h2>

      <div className="mt-4 flex justify-center">
        <img
          src="/miu.png"
          alt="Miu"
          className="object-cover"
          style={{ width: "160px", height: "160px", border: "3px solid var(--border)" }}
        />
      </div>

      <div className="mt-5" style={{ border: "3px solid var(--border)" }}>
        <div className="flex items-center justify-between bg-primary px-3 py-2 font-pixel text-[0.6rem] text-primary-foreground">
          <button type="button" onClick={() => shift(-1)}>« </button>
          <span>
            {MONTHS[m]} {y}
          </span>
          <button type="button" onClick={() => shift(1)}> »</button>
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
                type="button"
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
            ? `data selecionada: ${picked.d}/${picked.m + 1}/${picked.y}.`
            : "clique em um dia no calendário para continuar."}
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
  picked,
}: {
  activity: string | null;
  picked: { y: number; m: number; d: number } | null;
}) {
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    setConfetti(true);
    const audio = new Audio("/lobo.mp3");
    audio.play().catch((err) => console.log("Áudio bloqueado ou não encontrado:", err));
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const dateLabel = picked ? `${pad(picked.d)}/${pad(picked.m + 1)}/${picked.y}` : "a definir";

  return (
    <RetroWindow title="confirmacao_final.exe" className={confetti ? "animate-scale-in" : ""}>
      <h2 className="font-pixel text-sm leading-relaxed text-primary sm:text-lg">
        Tudo certo! Seu interesse foi registrado com sucesso.
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
            <dt className="font-pixel text-[0.55rem] text-muted-foreground">atividade escolhida</dt>
            <dd className="leading-tight font-bold text-foreground mt-1">{activity ?? "surpresa"}</dd>
          </div>
          <div>
            <dt className="font-pixel text-[0.55rem] text-muted-foreground">data marcada</dt>
            <dd className="font-bold text-foreground mt-1">{dateLabel}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center gap-3">
        <img
          src="/depositphotos_124005594-stock-illustration-emoticon-with-rose-between-teeth.jpg"
          alt="Meme da rosa"
          className="h-32 w-32 object-cover sm:h-36 sm:w-36"
          style={{ border: "3px solid var(--border)" }}
        />
        <p className="font-pixel text-[0.6rem] text-muted-foreground text-center">
          recado entregue com sucesso no sistema. agora é só esperar o date! 💌
        </p>
      </div>
    </RetroWindow>
  );
}
