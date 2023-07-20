import Image from "next/image";
import { Inter } from "@next/font/google";
import Counter from "../components/counter";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="main">
        <div className="main-container">
          <div id="main-container-inner" className="main-container-inner">
            <div>
              {" "}
              <svg
                width={300}
                height={300}
                data-name="corner-top-left"
                xmlns="http://www.w3.org/2000/svg"
                style={{ pointerEvents: "none" }}
                data-inlinesvg=".inlineSvgFile-4"
              >
                <defs>
                  <linearGradient
                    id="grad1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset={0} className="gradient1" />
                    <stop offset=".5" className="gradient2" />
                    <stop offset={1} className="gradient1" />
                  </linearGradient>
                </defs>
                <path
                  fill="url('#grad1')"
                  d="M8 0h292l-20 20H25a5 5 0 0 0-5 5v255L0 300V8a8 8 0 0 1 8-8Z"
                />
              </svg>{" "}
            </div>
            <div className="inner-container">
              <header>
                <div className="logo" id="color-click">
                  {" "}
                  <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 259.23 343.78"
                    data-inlinesvg=".inlineSvgFile-1"
                  >
                    <defs>
                      <style
                        dangerouslySetInnerHTML={{
                          __html:
                            "\n                                    .cls-1 {\n                                        fill: #777\n                                    }\n\n                                    .cls-2 {\n                                        fill: #ccc\n                                    }\n                                ",
                        }}
                      />
                    </defs>
                    <path
                      className="cls-1"
                      d="M915 419.1c22.75 1.32 45.5 2.69 68.26 3.89 3.74.2 2.67 2.69 2.67 4.59q.09 39 0 78c0 8.65 0 8.58 8.53 7.83 7-.61 13.93-1.14 20.91-1.49a27.35 27.35 0 0 0 19.27-9.14c19-20.15 18.24-63.83-1.61-83.18a22.94 22.94 0 0 0-15-7c-7-.4-13.94-1-20.92-1.29-2.16-.1-3.22-.37-3.21-3 .08-33.13.06-66.27.06-98.74 37.75.43 63.34 19.89 80.84 51.71 15.54 28.26 22.68 58.83 24 90.8 1.44 35.39-3.86 69.7-18.92 102-9.71 20.87-22.75 39.08-43.44 50.66-10.09 5.65-21.42 7-32.41 9.46q-43.26 9.86-86.57 19.52a11.85 11.85 0 0 1-2.46.07V419.1Z"
                      transform="translate(-839.8 -290.1)"
                    />
                    <path
                      className="cls-2"
                      d="M915 419.1v214.75q-26.28-5.64-52.56-11.3c-6.16-1.33-12.28-2.92-18.48-4-3.28-.58-4.17-1.95-4.15-5.23.14-27.45.08-54.91.08-82.36 0-34.44.06-68.88-.09-103.31 0-3.6.86-4.85 4.55-5 23.56-1.03 47.07-3.12 70.65-3.55ZM915 404.67c-23.69 1.79-47.39 3.53-71.07 5.44-3.43.28-4.14-.88-4.13-4.06.1-31.94 0-63.88.06-95.82 0-2-.34-3.71 2.64-4.35 23.85-5.14 47.65-10.49 71.48-15.76a3.34 3.34 0 0 1 1 .06Z"
                      transform="translate(-839.8 -290.1)"
                    />
                    <path
                      className="cls-1"
                      d="M915 404.67V290.18c13.94 2.27 27.49 6.28 41.27 9.27 8.76 1.9 17.43 4.27 26.21 6.11 2.93.61 3.57 1.85 3.56 4.63q-.15 48.22 0 96.44c0 3.16-.81 3.88-3.89 3.61-22.36-1.95-44.74-3.73-67.15-5.57Z"
                      transform="translate(-839.8 -290.1)"
                    />
                  </svg>{" "}
                </div>
                <div>
                  <ul>
                    <li className="email">
                      {" "}
                      <a
                        aria-label="email"
                        data-inlinesvg=".inlineSvgFile-3"
                        href="mailto:divyanshutyagiofficial@gmail.com?subject=Inquiry - Mail from divyanshutyagiofficial.com"
                      >
                        <svg
                          version={"1.0"}
                          xmlns="http://www.w3.org/2000/svg"
                          width="857.333"
                          height={620}
                          viewBox="0 0 643 465"
                        >
                          <path d="M39 3.4C31.6 5.1 27.5 7 21.4 11.6 11.2 19.3 5 29.2 3 41.1c-.8 4.5-1 61.4-.8 195.9.3 185.8.3 189.6 2.3 195 4.5 12.6 15.8 24.2 28.2 29.1 5 1.9 8.2 2.3 23.1 2.7l17.2.4V292.6c0-94.4.3-171.6.6-171.6.4 0 56.5 39.8 124.6 88.5l124 88.6 123.6-88.3c67.9-48.6 123.9-88.5 124.4-88.6.4-.2.8 76.8.8 171.2V464h15.3c16.2 0 21.9-1 30.3-5.1 11.3-5.6 21.7-19.2 24.3-31.7.8-3.8 1.1-59.8 1.1-194.5 0-166.8-.2-190-1.5-195.2-4.7-17.7-19.3-31.2-37.6-34.6-5.4-1-7-.9-9.2.2-1.4.8-62.9 44.7-136.6 97.6-73.7 53-134.5 96.3-135 96.3-.6 0-60.8-42.8-133.8-95.2C115.2 49.4 54 5.6 52.1 4.3c-3.8-2.6-5.2-2.7-13.1-.9z"></path>
                        </svg>
                      </a>{" "}
                    </li>
                    <li className="github">
                      {" "}
                      <a
                        aria-label="github"
                        data-inlinesvg=".inlineSvgFile-2"
                        href="https://github.com/dvynshu95"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 120.78 117.79"
                        >
                          <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                              <path
                                className="cls-1"
                                d="M60.39 0A60.39 60.39 0 0 0 41.3 117.69c3 .56 4.12-1.31 4.12-2.91 0-1.44-.05-6.19-.08-11.24C28.54 107.19 25 96.42 25 96.42c-2.75-7-6.71-8.84-6.71-8.84-5.48-3.75.41-3.67.41-3.67 6.07.43 9.26 6.22 9.26 6.22 5.39 9.23 14.13 6.57 17.57 5 .55-3.9 2.11-6.56 3.84-8.07C36 85.55 21.85 80.37 21.85 57.23A23.35 23.35 0 0 1 28.08 41c-.63-1.52-2.7-7.66.58-16 0 0 5.07-1.62 16.61 6.19a57.36 57.36 0 0 1 30.25 0C87 23.42 92.11 25 92.11 25c3.28 8.32 1.22 14.46.59 16a23.34 23.34 0 0 1 6.21 16.21c0 23.2-14.12 28.3-27.57 29.8 2.16 1.87 4.09 5.55 4.09 11.18 0 8.08-.06 14.59-.06 16.57 0 1.61 1.08 3.49 4.14 2.9A60.39 60.39 0 0 0 60.39 0Z"
                              ></path>
                              <path
                                className="cls-2"
                                d="M22.87 86.7c-.13.3-.6.39-1 .19s-.69-.61-.55-.91.61-.39 1-.19.69.61.54.91ZM25.32 89.43c-.29.27-.85.14-1.24-.28a.92.92 0 0 1-.17-1.25c.3-.27.84-.14 1.24.28s.47 1 .17 1.25ZM27.7 92.91c-.37.26-1 0-1.35-.52s-.37-1.18 0-1.44 1 0 1.35.51.37 1.19 0 1.45ZM31 96.27a1.13 1.13 0 0 1-1.59-.27c-.53-.49-.68-1.18-.34-1.54s1-.27 1.56.23.68 1.18.33 1.54ZM35.46 98.22c-.15.47-.82.69-1.51.49s-1.13-.76-1-1.24.82-.7 1.51-.49 1.13.76 1 1.24ZM40.4 98.58c0 .5-.56.91-1.28.92s-1.3-.38-1.31-.88.56-.91 1.29-.92 1.3.39 1.3.88ZM45 97.8c.09.49-.41 1-1.12 1.12s-1.35-.17-1.44-.66.42-1 1.12-1.12 1.35.17 1.44.66Z"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      </a>{" "}
                    </li>
                    <li className="linkedin">
                      <a
                        href="https://www.linkedin.com/in/divyanshutyagiofficial"
                        target="__blank"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          version="1.1"
                          width={26}
                          height={26}
                          viewBox="0 0 256 256"
                          xmlSpace="preserve"
                        >
                          <defs></defs>
                          <g
                            style={{
                              stroke: "none",
                              strokeWidth: 0,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "none",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                          >
                            <path
                              d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 c 24.853 0 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 31.187 69.956 H 20.822 V 36.617 h 10.365 V 69.956 z M 26.005 32.062 c -3.32 0 -6.005 -2.692 -6.005 -6.007 c 0 -3.318 2.685 -6.011 6.005 -6.011 c 3.313 0 6.005 2.692 6.005 6.011 C 32.01 29.37 29.317 32.062 26.005 32.062 z M 70 69.956 H 59.643 V 53.743 c 0 -3.867 -0.067 -8.84 -5.385 -8.84 c -5.392 0 -6.215 4.215 -6.215 8.562 v 16.491 H 37.686 V 36.617 h 9.939 v 4.559 h 0.141 c 1.383 -2.622 4.764 -5.385 9.804 -5.385 C 68.063 35.791 70 42.694 70 51.671 V 69.956 z"
                              style={{
                                stroke: "none",
                                strokeWidth: 1,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 10,
                                fill: "#777",
                                fillRule: "nonzero",
                                opacity: 1,
                              }}
                              transform=" matrix(1 0 0 1 0 0) "
                              strokeLinecap="round"
                            />
                          </g>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </header>
              <main className="projects-overview">
                <div className="main-message">
                  <div className="welcome-message">
                    <div className="nameWrapper">
                      Hi, My name is
                      <h1 className="name highlight">Divyanshu Tyagi</h1>
                    </div>{" "}
                    <span id="introduction">
                      I am a seasoned Full-Stack Developer with over 6+ years of
                      experience. I&apos;ve worked on a wide range of projects,
                      from dynamic{" "}
                      <p className="highlight">real-time chat applications</p>{" "}
                      to intricate{" "}
                      <p className="highlight">e-commerce platforms </p>
                      . I&apos;m always up for a challenge, and I love to learn
                      new technologies. I&apos;m passionate about creating
                      pixel-perfect, visually stunning interfaces that are also
                      intuitive and user-friendly. I believe that great design
                      is essential for any successful product. I&apos;m also a
                      meticulous developer who takes the time to understand your
                      needs and deliver a high-quality product. I&apos;m always
                      available to answer questions and provide support.
                      <br /> <br />I have expertise in working with cross-domain
                      compliances like <p className="highlight">PCI</p>,{" "}
                      <p className="highlight">HIPPA</p>, and experience in
                      achieving the non-functional requirements like{" "}
                      <p className="highlight">security, accessibility</p>, and
                      other things which are equally required in a web app. If
                      you&apos;re looking for a dedicated and experienced
                      Full-Stack Developer, I&apos;d love to hear from you.
                      Let&apos;s talk about how we can transform your vision
                      into reality.
                      <br /> <br />
                      <strong className="highlight">Check out!</strong> some of
                      the best Projects I&apos;ve worked on!
                    </span>
                  </div>
                </div>
                <div className="spacer" />
                <div className="main-projects">
                  <h2>
                    Projects
                    {/* {"  -  "}{" "} <span> <Counter /> <span className={styles.shyText}>and counting...</span></span>*/}
                  </h2>
                  <div className="project-wrapper">
                    <div>
                      <a
                        rel="noopener"
                        target="_blank"
                        href="https://edwardjones.com"
                      >
                        {" "}
                        <span>Edward Jones WebApp</span>
                      </a>
                      <a
                        rel="noopener"
                        target="_blank"
                        href="https://citib2badmin.incedopay.com"
                      >
                        {" "}
                        <span>Incedo Pay B2B Admin portal</span>
                      </a>
                      <a
                        rel="noopener"
                        target="_blank"
                        href="https://citib2bclient.incedopay.com"
                      >
                        {" "}
                        <span>Incedo Pay B2B Client portal</span>
                      </a>{" "}
                      <a
                        rel="noopener"
                        target="_blank"
                        // href="https://www.pickndplay.com/song/queries?Id=XXYlFuWEuKI"
                        href="https://www.pickndplay.com"
                      >
                        {" "}
                        <span> Pick n &apos; play </span>
                      </a>{" "}
                      <a
                        rel="noopener"
                        target="_blank"
                        href="https://mycompliance.netlify.app/employees"
                      >
                        {" "}
                        <span> Wallzone Trace </span>
                      </a>{" "}
                      <a
                        rel="noopener"
                        target="_blank"
                        href="https://pals.carematix.com"
                      >
                        <span>PALS </span>{" "}
                      </a>{" "}
                      <a
                        rel="noopener"
                        target="_blank"
                        href="https://www.reliefhhs.com"
                      >
                        {" "}
                        <span> ReliefHHS </span>{" "}
                      </a>{" "}
                      <a
                        rel="noopener"
                        target="_blank"
                        href="https://dro.carematix.com/#/002/abc233/welcome"
                      >
                        <span>DRO </span>{" "}
                      </a>{" "}
                    </div>
                  </div>
                </div>
              </main>
              <footer>
                © {new Date().getFullYear()} divyanshutyagiofficial.com
              </footer>
              <div>
                {" "}
                <svg
                  width={300}
                  height={300}
                  data-name="corner-bottom-right"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ pointerEvents: "none" }}
                  data-inlinesvg=".inlineSvgFile-5"
                >
                  <defs>
                    <linearGradient
                      id="grad2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset={0} className="gradient1" />
                      <stop offset=".5" className="gradient2" />
                      <stop offset={1} className="gradient1" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url('#grad2')"
                    d="M292 300H0l20-20h255a5 5 0 0 0 5-5V20l20-20v292a8 8 0 0 1-8 8Z"
                  ></path>
                </svg>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
