"use client";

import { useMemo, useState } from "react";

type Tone = "спокойно" | "дерзко" | "кинематографично";

function clampLines(text: string) {
  return text
    .split("\n")
    .map((l) => l.trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function makeCopy(params: {
  name: string;
  city: string;
  roles: string;
  niche: string;
  style: string;
  tone: Tone;
}) {
  const name = params.name || "Никита";
  const city = params.city || "Лиссабоне";
  const roles = params.roles || "актёр • монтажёр • моушн-дизайнер";
  const niche = params.niche || "личными брендами, рекламой, проектами для кино/театра";
  const style = params.style || "найти и закрепить стиль, который легко узнаётся";
  const tone = params.tone;

  const punch =
    tone === "дерзко"
      ? "Стиль важнее «просто склеить кадры»."
      : tone === "кинематографично"
      ? "Монтаж — это драматургия, ритм и дыхание кадра."
      : "Делаю монтаж, который выглядит естественно и узнаваемо.";

  const core = clampLines(`
${punch}

Я ${name}. ${roles}. Живу в ${city}.
4 года — театр, сейчас продолжаю в кино как актёр. Поэтому в монтаже я думаю сценой: смысл, ритм, напряжение, паузы.

Работаю с ${niche}.
Главное в моей работе — ${style}: если мы на постоянке, я нахожу «язык» под тебя, чтобы тебя узнавали по монтажу.
`);

  const site = clampLines(`
**${name} — ${roles}**
${punch}

— Драматургия кадра из театра и кино  
— Монтаж и моушн: Premiere Pro / After Effects  
— Собираю стиль под человека, а не «по шаблону»  
— ${city}
`);

  const linkedin = clampLines(`
${name} — ${roles} (${city})

Монтаж для меня — это драматургия и стиль.
Работаю в Premiere Pro и After Effects.
Если работаем регулярно — выстраиваю узнаваемый язык монтажа именно под вас.
`);

  const insta = clampLines(`
${name}. ${roles}.
Монтаж — это стиль и драматургия.

Premiere Pro / After Effects. ${city}.
`);

  return { core, site, linkedin, insta };
}

function makeClientPack(client: { name: string; niche: string; goal: string }) {
  const name = client.name || "Клиент";
  const niche = client.niche || "ниша";
  const goal = client.goal || "результат";

  return [
    "ОФФЕР:",
    `Я соберу для ${name} узнаваемый монтажный язык и упакую ${niche} так, чтобы это работало на ${goal}.`,
    "",
    "BIO:",
    `${name} • ${niche}
Видео как система: хук → смысл → стиль → результат.
Монтаж (Premiere/AE) + драматургия кадра.
Цель: ${goal}.`,
    "",
    "ХУКИ:",
    `99% видео про ${niche} выглядят одинаково.
Если кажется, что ${niche} не для Reels — смотри.
Три ошибки, из-за которых ${niche} не приносит ${goal}.`,
    "",
    "5 ИДЕЙ REELS:",
    `Разбор мифов про ${niche}
До / После
Закулисье
Тест A vs B
Кейс с результатом`,
    "",
    "CTA:",
    `Напиши «СТИЛЬ» — пришлю идеи под твой проект.`,
  ].join("\n");
}

export default function Page() {
  const [name, setName] = useState("Никита");
  const [city, setCity] = useState("Лиссабоне");
  const [roles, setRoles] = useState("актёр • видеомонтажёр • моушн-дизайнер");
  const [niche, setNiche] = useState("личными брендами, рекламой, проектами для кино/театра");
  const [style, setStyle] = useState("найти и закрепить стиль, который легко узнаётся");
  const [tone, setTone] = useState<Tone>("кинематографично");

  const [clientName, setClientName] = useState("Таня");
  const [clientNiche, setClientNiche] = useState("промышленные печи");
  const [clientGoal, setClientGoal] = useState("заявки и продажи");

  const copy = useMemo(
    () => makeCopy({ name, city, roles, niche, style, tone }),
    [name, city, roles, niche, style, tone]
  );

  const clientPack = useMemo(
    () => makeClientPack({ name: clientName, niche: clientNiche, goal: clientGoal }),
    [clientName, clientNiche, clientGoal]
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-6">
      <header className="max-w-6xl mx-auto pt-10">
        <h1 className="text-4xl font-semibold">Монтаж, который узнают</h1>
        <p className="mt-3 text-neutral-400">{copy.core}</p>
      </header>

      <main className="max-w-6xl mx-auto mt-10 grid gap-10">
        <section className="grid md:grid-cols-2 gap-6">
          <Field label="Имя" value={name} onChange={setName} />
          <Field label="Город" value={city} onChange={setCity} />
          <Field label="Роли" value={roles} onChange={setRoles} />
          <Field label="С чем работаешь" value={niche} onChange={setNiche} />
          <Field label="Главное в работе" value={style} onChange={setStyle} />
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl mb-4">Сгенерировать под клиента</h2>
            <Field label="Имя клиента" value={clientName} onChange={setClientName} />
            <Field label="Ниша" value={clientNiche} onChange={setClientNiche} />
            <Field label="Цель" value={clientGoal} onChange={setClientGoal} />
          </div>

          <div>
            <h2 className="text-xl mb-4">Пакет для клиента</h2>
            <pre className="bg-black/40 p-4 rounded-xl whitespace-pre-wrap text-sm">
              {clientPack}
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(clientPack)}
              className="mt-3 px-4 py-2 bg-white text-black rounded-xl"
            >
              Скопировать
            </button>
          </div>
        </section>

        <section id="contact" className="pt-10">
          <h2 className="text-xl mb-4">Контакты</h2>
          <div className="flex gap-3">
            <a href="https://t.me/kitvideomaker" target="_blank" className="px-4 py-2 bg-white/10 rounded-xl">Telegram</a>
            <a href="https://instagram.com/kitkfinus" target="_blank" className="px-4 py-2 bg-white/10 rounded-xl">Instagram</a>
            <a href="mailto:work@kitkarataev.com" className="px-4 py-2 bg-white/10 rounded-xl">Email</a>
          </div>
        </section>
      </main>
    </div>
  );
}

function Field({ label, value, onChange }: any) {
  return (
    <label className="block">
      <div className="text-sm text-neutral-400 mb-1">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-xl bg-neutral-900 text-white outline-none"
      />
    </label>
  );
}
