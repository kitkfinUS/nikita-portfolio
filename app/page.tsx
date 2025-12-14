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
  platforms: { site: boolean; linkedin: boolean; insta: boolean };
})

function makeClientPack(client: { name: string; niche: string; goal: string }) {
  const name = client.name || "Клиент";
  const niche = client.niche || "ниша";
  const goal = client.goal || "результат";

  const offer = `Я соберу для ${name} узнаваемый монтажный язык и упакую ${niche} так, чтобы это работало на ${goal}.`;

  const bio = [
    `${name} • ${niche}`,
    `Видео как система: хук → смысл → стиль → результат.`,
    `Монтаж (Premiere/AE) + драматургия кадра.`,
    `Цель: ${goal}.`,
  ].join("\n");

  const hooks = [
    `99% видео про ${niche} выглядят одинаково. Вот как мы сделаем иначе:`,
    `Если тебе кажется, что ${niche} “не для Reels” — смотри:`,
    `Три ошибки, из-за которых ${niche} не приносит ${goal}:`,
  ].join("\n");

  const ideas = [
    `“Разбор мифа”: 3 мифа про ${niche} и что правда на практике.`,
    `“До/После”: как меняется результат, когда меняем 1 параметр / подход.`,
    `“Закулисье”: как это делается/производится/настраивается (визуально вкусно).`,
    `“Тест на выбор”: A vs B (попросить аудиторию выбрать).`,
    `“Кейс”: проблема → решение → цифры/результат → вывод.`,
  ].join("\n");

  const cta = [
    `Хочешь так же? Напиши “СТИЛЬ” — пришлю 3 идеи под твой продукт.`,
    `Скидывай свой аккаунт/сайт — скажу, что поменять, чтобы пошли ${goal}.`,
  ].join("\n");

  return { offer, bio, hooks, ideas, cta };
}
 {
  const name = params.name || "Никита";
  const city = params.city || "Лиссабон";
  const roles = params.roles || "актёр • монтажёр • моушн-дизайнер";
  const niche = params.niche || "реклама, личные бренды, кино/театр";
  const [clientName, setClientName] = useState("Таня");
  const [clientNiche, setClientNiche] = useState("промышленные печи");
  const [clientGoal, setClientGoal] = useState("заявки и продажи");
  const style = params.style || "узнаваемый язык монтажа под человека";
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

Кейсы: (вставишь ссылки)  
Контакт: (вставишь)
`);

  const linkedin = clampLines(`
${name} — ${roles} (${city})

4 года работал в театре, сейчас продолжаю в кино как актёр — поэтому монтаж для меня всегда про драматургию, ритм и стиль.
Работаю в Premiere Pro и After Effects. Делаю монтаж в любом направлении: от Reels и рекламы до более «киношных» форматов.
Если работаем регулярно — выстраиваю узнаваемый язык монтажа именно под вас.

Portfolio: (link)
`);

  const insta = clampLines(`
${name}. ${roles}.
Монтаж — не «склейка», а стиль и драматургия.

Если мы на постоянке — я соберу тебе узнаваемый язык монтажа, чтобы тебя узнавали с первых секунд.
Premiere Pro / After Effects. ${city}.
`);

  return { core, site, linkedin, insta };
}

export default function Page() {
  const [name, setName] = useState("Никита");
  const [city, setCity] = useState("Лиссабон");
  const [roles, setRoles] = useState("актёр • видеомонтажёр • моушн-дизайнер");
  const [niche, setNiche] = useState("личные бренды, рекламу, проекты для кино/театра");
  const [style, setStyle] = useState("найти и закрепить стиль, который легко узнаётся");
  const [tone, setTone] = useState<Tone>("кинематографично");

  const [siteOn, setSiteOn] = useState(true);
  const [liOn, setLiOn] = useState(true);
  const [igOn, setIgOn] = useState(true);

  const copy = useMemo(
    () =>
      makeCopy({
        name,
        city,
        roles,
        niche,
        style,
        tone,
        platforms: { site: siteOn, linkedin: liOn, insta: igOn },
      }),
    [name, city, roles, niche, style, tone, siteOn, liOn, igOn]
  );

  const [tab, setTab] = useState<"main" | "site" | "linkedin" | "insta">("main");

  function onCopy(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* top glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-64 bg-gradient-to-b from-white/10 to-transparent blur-2xl" />

      <header className="mx-auto max-w-6xl px-6 pt-10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white/10 ring-1 ring-white/10" />
            <div className="leading-tight">
              <div className="text-sm text-neutral-400">portfolio • generator</div>
              <div className="font-semibold">{name}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              className="rounded-2xl bg-white/10 px-4 py-2 text-sm ring-1 ring-white/10 hover:bg-white/15"
              href="#generator"
            >
              Генератор
            </a>
            <a
              className="rounded-2xl bg-white px-4 py-2 text-sm text-neutral-950 hover:bg-neutral-200"
              href="#contact"
            >
              Контакт
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
            <div className="text-sm text-neutral-400">в двух словах</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Монтаж, который
              <span className="text-neutral-300"> узнают с первых секунд</span>
            </h1>
            <p className="mt-4 text-neutral-300">
              Я думаю сценой и ритмом. Из театра и кино — в монтаж: смысл, пауза, акцент,
              стиль.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Premiere Pro", "After Effects", "Reels", "Реклама", "Кино/театр"].map((t) => (
                <span
                  key={t}
                  className="rounded-2xl bg-white/5 px-3 py-1 text-sm text-neutral-200 ring-1 ring-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
            <div className="text-sm text-neutral-400">быстрые блоки</div>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl bg-neutral-900/60 p-4 ring-1 ring-white/10">
                <div className="text-sm text-neutral-400">Фокус</div>
                <div className="mt-1 text-neutral-200">
                  Стиль + драматургия кадра → узнаваемый язык под человека
                </div>
              </div>
              <div className="rounded-2xl bg-neutral-900/60 p-4 ring-1 ring-white/10">
                <div className="text-sm text-neutral-400">Форматы</div>
                <div className="mt-1 text-neutral-200">
                  Reels / Shorts / реклама / артистические проекты
                </div>
              </div>
              <div className="rounded-2xl bg-neutral-900/60 p-4 ring-1 ring-white/10">
                <div className="text-sm text-neutral-400">География</div>
                <div className="mt-1 text-neutral-200">{city} • удалёнка</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        {/* Generator */}
        <section id="generator" className="mt-10 rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm text-neutral-400">генератор текста</div>
              <h2 className="mt-2 text-2xl font-semibold">Собираем твой “голос” за минуту</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {(["спокойно", "дерзко", "кинематографично"] as Tone[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={
                    "rounded-2xl px-4 py-2 text-sm ring-1 ring-white/10 " +
                    (tone === t ? "bg-white text-neutral-950" : "bg-white/10 hover:bg-white/15")
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <Field label="Имя" value={name} onChange={setName} />
              <Field label="Город" value={city} onChange={setCity} />
              <Field label="Роли" value={roles} onChange={setRoles} />
              <Field label="С чем работаешь" value={niche} onChange={setNiche} />
              <Field label="Что для тебя главное" value={style} onChange={setStyle} />
              <div className="rounded-2xl bg-neutral-900/60 p-4 ring-1 ring-white/10">
  <div className="text-sm text-neutral-400">Сгенерировать под клиента</div>
  <div className="mt-3 grid gap-3">
    <Field label="Имя клиента" value={clientName} onChange={setClientName} />
    <Field label="Ниша клиента" value={clientNiche} onChange={setClientNiche} />
    <Field label="Цель" value={clientGoal} onChange={setClientGoal} />
  </div>
</div>


              <div className="rounded-2xl bg-neutral-900/60 p-4 ring-1 ring-white/10">
                <div className="text-sm text-neutral-400">Выводить блоки</div>
                <div className="mt-3 flex flex-wrap gap-3 text-sm">
                  <Toggle label="Сайт" value={siteOn} onChange={setSiteOn} />
                  <Toggle label="LinkedIn" value={liOn} onChange={setLiOn} />
                  <Toggle label="Instagram" value={igOn} onChange={setIgOn} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-neutral-900/60 ring-1 ring-white/10">
              <div className="flex flex-wrap gap-2 border-b border-white/10 p-3">
                <TabButton active={tab === "main"} onClick={() => setTab("main")}>
                  Основной
                </TabButton>
                {siteOn && (
                  <TabButton active={tab === "site"} onClick={() => setTab("site")}>
                    Сайт
                  </TabButton>
                )}
                {liOn && (
                  <TabButton active={tab === "linkedin"} onClick={() => setTab("linkedin")}>
                    LinkedIn
                  </TabButton>
                )}
                {igOn && (
                  <TabButton active={tab === "insta"} onClick={() => setTab("insta")}>
                    Instagram
                  </TabButton>
                )}

                <div className="ml-auto" />
                <button
                  onClick={() => onCopy(tab === "main" ? copy.core : tab === "site" ? copy.site : tab === "linkedin" ? copy.linkedin : copy.insta)}
                  className="rounded-2xl bg-white px-4 py-2 text-sm text-neutral-950 hover:bg-neutral-200"
                >
                  Скопировать
                </button>
              </div>

              <pre className="max-h-[520px] whitespace-pre-wrap p-5 text-sm leading-relaxed text-neutral-200">
                {tab === "main"
                  ? copy.core
                  : tab === "site"
                  ? copy.site
                  : tab === "linkedin"
                  ? copy.linkedin
                  : copy.insta}
              </pre>
              <div className="border-t border-white/10 p-5">
  <div className="text-sm text-neutral-400">Пакет для клиента</div>
  {(() => {
    const pack = makeClientPack({ name: clientName, niche: clientNiche, goal: clientGoal });
    const text = [
      "ОФФЕР:",
      pack.offer,
      "",
      "BIO:",
      pack.bio,
      "",
      "ХУКИ:",
      pack.hooks,
      "",
      "5 ИДЕЙ REELS:",
      pack.ideas,
      "",
      "CTA:",
      pack.cta,
    ].join("\n");
    return (
      <div className="mt-3">
        <button
          onClick={() => navigator.clipboard.writeText(text)}
          className="rounded-2xl bg-white px-4 py-2 text-sm text-neutral-950 hover:bg-neutral-200"
        >
          Скопировать пакет
        </button>
        <pre className="mt-3 max-h-[260px] whitespace-pre-wrap text-sm leading-relaxed text-neutral-200">
          {text}
        </pre>
      </div>
    );
  })()}
</div>

            </div>
          </div>
        </section>

        {/* Cases placeholder */}
        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { title: "Кейс #1", desc: "Сюда вставишь описание и ссылку на ролик." },
            { title: "Кейс #2", desc: "Сюда — до/после, задачи, результат." },
            { title: "Кейс #3", desc: "Сюда — стиль, монтажные приёмы, тайминг." },
          ].map((c) => (
            <div key={c.title} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
              <div className="text-sm text-neutral-400">кейсы</div>
              <div className="mt-2 text-xl font-semibold">{c.title}</div>
              <p className="mt-3 text-neutral-300">{c.desc}</p>
              <div className="mt-4 h-28 rounded-2xl bg-white/5 ring-1 ring-white/10" />
            </div>
          ))}
        </section>

        {/* Contact */}
        <section id="contact" className="mt-10 rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
          <div className="text-sm text-neutral-400">контакт</div>
          <h3 className="mt-2 text-2xl font-semibold">Дай мне ссылку — я верну стиль</h3>
          <p className="mt-3 text-neutral-300">
            Вставь тут свои контакты: Telegram / Instagram / Email. (Пока заглушка.)
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a className="rounded-2xl bg-white/10 px-4 py-2 text-sm ring-1 ring-white/10 hover:bg-white/15" href="#">
              Telegram
            </a>
            <a className="rounded-2xl bg-white/10 px-4 py-2 text-sm ring-1 ring-white/10 hover:bg-white/15" href="#">
              Instagram
            </a>
            <a className="rounded-2xl bg-white/10 px-4 py-2 text-sm ring-1 ring-white/10 hover:bg-white/15" href="#">
              Email
            </a>
          </div>
        </section>

        <footer className="mt-10 pb-6 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} {name}
        </footer>
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm text-neutral-400">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl bg-neutral-900/60 px-4 py-3 text-sm text-neutral-100 ring-1 ring-white/10 outline-none placeholder:text-neutral-500 focus:ring-2 focus:ring-white/20"
        placeholder={label}
      />
    </label>
  );
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={
        "rounded-2xl px-4 py-2 ring-1 ring-white/10 " +
        (value ? "bg-white text-neutral-950" : "bg-white/10 text-neutral-200 hover:bg-white/15")
      }
    >
      {label}
    </button>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-2xl px-4 py-2 text-sm ring-1 ring-white/10 " +
        (active ? "bg-white text-neutral-950" : "bg-white/10 text-neutral-200 hover:bg-white/15")
      }
    >
      {children}
    </button>
  );
}
