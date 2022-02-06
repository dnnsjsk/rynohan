import { useState } from "react";
import Link from "next/link";
import "../styles/tailwind.css";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import * as day from "../constants/day";
import { current } from "../constants/day";

function Button(props) {
  return (
    <a
      onClick={props.onClick}
      href={props.link}
      rel={props.link?.includes("https:") ? `noreferrer` : ``}
      target={props.link?.includes("https:") ? `_blank` : ``}
      className={`flex items-center px-10 py-7 text-sm uppercase font-semibold tracking-widest text-white cursor-pointer hover:bg-white/10 ${
        props.reverse ? `flex-row-reverse` : `flex-row`
      }`}
    >
      {props.icon === "instagram" ? (
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="instagram"
          className="w-6 h-6"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
          />
        </svg>
      ) : props.icon === "mail" ? (
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fal"
          data-icon="envelope"
          className="h-6 w-6"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M464 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h416c8.8 0 16 7.2 16 16v41.4c-21.9 18.5-53.2 44-150.6 121.3-16.9 13.4-50.2 45.7-73.4 45.3-23.2.4-56.6-31.9-73.4-45.3C85.2 197.4 53.9 171.9 32 153.4V112c0-8.8 7.2-16 16-16zm416 320H48c-8.8 0-16-7.2-16-16V195c22.8 18.7 58.8 47.6 130.7 104.7 20.5 16.4 56.7 52.5 93.3 52.3 36.4.3 72.3-35.5 93.3-52.3 71.9-57.1 107.9-86 130.7-104.7v205c0 8.8-7.2 16-16 16z"
          />
        </svg>
      ) : props.icon === "prev" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          data-prefix="fal"
          data-icon="arrow-left"
          className="h-6 w-6"
          role="img"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M231.536 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273H436c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12H60.113L238.607 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"
          />
        </svg>
      ) : props.icon === "next" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          data-prefix="fal"
          data-icon="arrow-right"
          className="h-6 w-6"
          role="img"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z"
          />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fal"
          data-icon="brackets-curly"
          className="h-6 w-6"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="currentColor"
            d="M571.31 244.69l-45.25-45.25A48 48 0 0 1 512 165.49V80a48 48 0 0 0-48-48h-72a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h72a16 16 0 0 1 16 16v85.48a80 80 0 0 0 23.44 56.58L537.38 256l-33.94 33.94A80 80 0 0 0 480 346.52V432a16 16 0 0 1-16 16h-72a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h72a48 48 0 0 0 48-48v-85.49a48 48 0 0 1 14.06-33.95l45.25-45.25a16 16 0 0 0 0-22.62zM184 32h-72a48 48 0 0 0-48 48v85.49a48 48 0 0 1-14.06 33.95L4.69 244.69a16 16 0 0 0 0 22.62l45.25 45.25A48 48 0 0 1 64 346.51V432a48 48 0 0 0 48 48h72a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8h-72a16 16 0 0 1-16-16v-85.48a80 80 0 0 0-23.44-56.58L38.62 256l33.94-33.94A80 80 0 0 0 96 165.48V80a16 16 0 0 1 16-16h72a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8z"
          />
        </svg>
      )}
      <span className={`${props.reverse ? `mr-6` : `ml-6`}`}>{props.text}</span>
    </a>
  );
}

export default function App({ Component, pageProps }) {
  const [fullscreen, setFullscreen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (window.location.href.includes("?full")) {
      setFullscreen(true);
    }

    document.body.classList.add("loaded");
  }, [fullscreen]);

  function navigate(direction = "prev") {
    const amount = day.current;
    const lastCharRoute = Number(
      router.pathname.substr(router.pathname.length - 1)
    );

    if (direction === "prev") {
      if (lastCharRoute === 1) {
        router.push(`/everydays/${amount}`);
      } else {
        router.push(`/everydays/${lastCharRoute - 1}`);
      }
    }

    if (direction === "next") {
      if (lastCharRoute === amount) {
        router.push(`/everydays/1`);
      } else {
        router.push(`/everydays/${lastCharRoute + 1}`);
      }
    }
  }

  return (
    <>
      <Head>
        <title>Ryno Han</title>
        <meta name="description" content="" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-192x192.png"
          sizes="192x192"
        />
        <link
          rel="apple-touch-icon-precomposed"
          type="image/png"
          href="/favicon-180x180.png"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        className={`h-full ${
          !fullscreen ? `md:grid md:grid-cols-[400px,minmax(0,1fr)]` : ""
        }`}
      >
        {!fullscreen && (
          <header
            className={`md:h-screen md:overflow-auto md:border-r md:border-white md:fixed md:top-0 md:w-[400px]`}
          >
            <div
              className={`border-b border-white divide-y divide-white md:max-h-[max-content]`}
            >
              <Link href="/" passHref>
                <a className={`p-10 w-full inline-block hover:bg-white/10`}>
                  <h1
                    className={`text-white text-6xl inline-block !leading-[0.9] font-black uppercase cursor-pointer`}
                  >
                    <span style={{ letterSpacing: "0.055em" }}>Ryno</span>
                    <br />
                    Han
                    <br />
                  </h1>
                </a>
              </Link>
              <h2
                className={`w-full p-10 text-white text-4xl inline-block !leading-[0.9] font-black uppercase cursor-pointer`}
              >
                Day {current}
              </h2>
              {router.pathname.includes("everydays") && (
                <div className={`grid grid-cols-2 divide-x divide-white`}>
                  {[
                    {
                      text: "Prev",
                      icon: "prev",
                      onClick: () => navigate("prev"),
                    },
                    {
                      text: "Next",
                      icon: "next",
                      reverse: true,
                      onClick: () => navigate("next"),
                    },
                  ].map((item, index) => {
                    return (
                      <Button
                        key={index}
                        text={item.text}
                        link={item.link}
                        icon={item.icon}
                        reverse={item.reverse}
                        onClick={item.onClick}
                      />
                    );
                  })}
                </div>
              )}
              <p
                className={`p-10 text-white text-sm leading-loose ${
                  router.pathname.includes("everydays") ? "hidden md:block" : ""
                }`}
              >
                <span className={`max-w-xs inline-block space-y-4`}>
                  Interdimensional creator based in Berlin, Germany. Making
                  weird things with code (three.js) since October 10th, 2021.
                  <br />
                  <span className="inline-block">One new piece every day.</span>
                </span>
              </p>
              <div
                className={`flex flex-col divide-y divide-white ${
                  router.pathname.includes("everydays") ? "hidden md:block" : ""
                }`}
              >
                {[
                  {
                    text: "Instagram",
                    link: "https://instagram.com/rynohan",
                    icon: "instagram",
                  },
                  {
                    text: "E-Mail",
                    link: "mailto:hi@dennn.is",
                    icon: "mail",
                  },
                ].map((item, index) => {
                  return (
                    <Button
                      key={index}
                      text={item.text}
                      link={item.link}
                      icon={item.icon}
                    />
                  );
                })}
              </div>
            </div>
          </header>
        )}
        <main className={`h-full w-full md:col-start-2`}>
          <Component next={true} {...pageProps} />
        </main>
      </div>
    </>
  );
}
