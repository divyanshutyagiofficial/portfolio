import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Counter from "../components/counter";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const magnify = (imgID, zoom) => {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);

  /* Create magnifier glass: */
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");

  /* Insert magnifier glass: */
  img.parentElement.insertBefore(glass, img);

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  /* Execute a function when someone moves the magnifier glass over the image: */
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);

  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
  function moveMagnifier(e) {
    var pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
    if (x < w / zoom) { x = w / zoom; }
    if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
    if (y < h / zoom) { y = h / zoom; }
    /* Set the position of the magnifier glass: */
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    /* Display what the magnifier glass "sees": */
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }

  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
}

export default function Home() {


  useEffect(() => {
    magnify("mainWrapper", 3)
  }, []);

  return (
    <>
      <Head>
        <title>{"One stop solution for launching you online!"} </title>
        <meta name="description" content="Best Software Consulting online." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} id="mainContainer" >
        <div className="main" id="mainWrapper">
          <div className="main-container" >
            <div id="main-container-inner" className="main-container-inner" >
              <div>
                <svg
                  width={300}
                  height={300}
                  data-name="corner-top-left"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ pointerEvents: "none" }
                  }
                  data-inlinesvg=".inlineSvgFile-4">
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
                </svg>
              </div>{" "}
            </div>
            <div className="inner-container" >
              <header>

                <div className="logo" id="color-click" >
                  {" "}
                  <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 259.23 343.78"
                    data-inlinesvg=".inlineSvgFile-1">
                    <defs>
                      <style
                        dangerouslySetInnerHTML={
                          {
                            __html:
                              "\n                                    .cls-1 {\n                                        fill: #777\n                                    }\n\n                                    .cls-2 {\n                                        fill: #ccc\n                                    }\n                                ",
                          }
                        }
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
                  </svg>
                </div>


                <ul>
                  <li className="email" >
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
                        <path d="M39 3.4C31.6 5.1 27.5 7 21.4 11.6 11.2 19.3 5 29.2 3 41.1c-.8 4.5-1 61.4-.8 195.9.3 185.8.3 189.6 2.3 195 4.5 12.6 15.8 24.2 28.2 29.1 5 1.9 8.2 2.3 23.1 2.7l17.2.4V292.6c0-94.4.3-171.6.6-171.6.4 0 56.5 39.8 124.6 88.5l124 88.6 123.6-88.3c67.9-48.6 123.9-88.5 124.4-88.6.4-.2.8 76.8.8 171.2V464h15.3c16.2 0 21.9-1 30.3-5.1 11.3-5.6 21.7-19.2 24.3-31.7.8-3.8 1.1-59.8 1.1-194.5 0-166.8-.2-190-1.5-195.2-4.7-17.7-19.3-31.2-37.6-34.6-5.4-1-7-.9-9.2.2-1.4.8-62.9 44.7-136.6 97.6-73.7 53-134.5 96.3-135 96.3-.6 0-60.8-42.8-133.8-95.2C115.2 49.4 54 5.6 52.1 4.3c-3.8-2.6-5.2-2.7-13.1-.9z" > </path>
                      </svg>
                    </a>{" "}
                  </li>
                  <li className="github">
                    <a
                      aria-label="github"
                      data-inlinesvg=".inlineSvgFile-2"
                      href="https://github.com/dvynshu95"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 120.78 117.79"
                      >
                        <g id="Layer_2" data-name="Layer 2" >
                          <g id="Layer_1-2" data-name="Layer 1" >
                            <path
                              className="cls-1"
                              d="M60.39 0A60.39 60.39 0 0 0 41.3 117.69c3 .56 4.12-1.31 4.12-2.91 0-1.44-.05-6.19-.08-11.24C28.54 107.19 25 96.42 25 96.42c-2.75-7-6.71-8.84-6.71-8.84-5.48-3.75.41-3.67.41-3.67 6.07.43 9.26 6.22 9.26 6.22 5.39 9.23 14.13 6.57 17.57 5 .55-3.9 2.11-6.56 3.84-8.07C36 85.55 21.85 80.37 21.85 57.23A23.35 23.35 0 0 1 28.08 41c-.63-1.52-2.7-7.66.58-16 0 0 5.07-1.62 16.61 6.19a57.36 57.36 0 0 1 30.25 0C87 23.42 92.11 25 92.11 25c3.28 8.32 1.22 14.46.59 16a23.34 23.34 0 0 1 6.21 16.21c0 23.2-14.12 28.3-27.57 29.8 2.16 1.87 4.09 5.55 4.09 11.18 0 8.08-.06 14.59-.06 16.57 0 1.61 1.08 3.49 4.14 2.9A60.39 60.39 0 0 0 60.39 0Z"
                            > </path>
                            <path
                              className="cls-2"
                              d="M22.87 86.7c-.13.3-.6.39-1 .19s-.69-.61-.55-.91.61-.39 1-.19.69.61.54.91ZM25.32 89.43c-.29.27-.85.14-1.24-.28a.92.92 0 0 1-.17-1.25c.3-.27.84-.14 1.24.28s.47 1 .17 1.25ZM27.7 92.91c-.37.26-1 0-1.35-.52s-.37-1.18 0-1.44 1 0 1.35.51.37 1.19 0 1.45ZM31 96.27a1.13 1.13 0 0 1-1.59-.27c-.53-.49-.68-1.18-.34-1.54s1-.27 1.56.23.68 1.18.33 1.54ZM35.46 98.22c-.15.47-.82.69-1.51.49s-1.13-.76-1-1.24.82-.7 1.51-.49 1.13.76 1 1.24ZM40.4 98.58c0 .5-.56.91-1.28.92s-1.3-.38-1.31-.88.56-.91 1.29-.92 1.3.39 1.3.88ZM45 97.8c.09.49-.41 1-1.12 1.12s-1.35-.17-1.44-.66.42-1 1.12-1.12 1.35.17 1.44.66Z"
                            > </path>
                          </g>
                        </g>
                      </svg>
                    </a>{" "}
                  </li>

                </ul>

              </header >
              <main className="projects-overview" >
                <div className="main-message" >
                  <div className="welcome-message" >
                    <div id="welcome" >
                      {" "}
                      <svg
                        id="welcome_svg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="605.44"
                        height="122.24"
                        viewBox="0 0 1892 382"
                        data-inlinesvg=".inlineSvgFile-7"
                      >
                        <path
                          id="welcome_path"
                          style={{
                            strokeDasharray: "9541.93, 9541.93",
                            strokeDashoffset: 7156,
                            transition: "fill 1s ease-in-out 0s",
                            stroke: "rgb(204, 204, 204)",
                            fill: "rgb(204, 204, 204)",
                          }}
                          stroke="none"
                          strokeMiterlimit={10}
                          strokeWidth={2}
                          d="M673 52h13v286h-13V52ZM21 68h15l11.67 35 25.66 76 31.33 92L121 319c1.18-7.67 5.08-16.57 7.66-24l14.65-42 44.36-127 15.75-45c3.77-10.08 3.22-12.74 9.6-12.98 10.02-.39 8.61 1.39 13.32 14.98l15.33 44 40.99 117L309 319c1.13-7.32 8.11-26.23 10.95-34l14-41 10.74-32 29.98-87 14.66-43c4.29-12.86 3.55-13.88 10.67-14h8l-13.69 40-38.65 113-27.33 80L316 338h-7c-8.14-.05-7.4-.24-12.33-15l-15.34-44-39.99-114L214 87c-1.18 7.63-4.52 14.73-7 22l-15 43-30.31 87-15.27 44-12.75 37c-1.05 3.14-4.63 14.5-6.51 16.4-1.95 1.98-9.36 2.07-11.94 1.31-3.99-1.18-6.58-12.8-7.89-16.71l-16.66-49L21 68Zm570 230c2.38 2.41 7.16 6.17 5.83 10-.99 2.86-6.43 7.08-8.83 9.13-8.01 6.86-18.98 13.19-29 16.54-31.99 10.67-70.69 6.18-98-14.15-17.58-13.08-30.45-33.18-35.5-54.52-3.02-12.77-2.65-24.03-2.5-37 .31-26.02 14.43-53.95 34-70.7 29.18-24.98 77.82-27.22 110-6.76 15.48 9.85 25.23 22.2 33.24 38.46 8.78 17.81 9.76 31.68 9.76 51H457l-22 1 3.5 22c2.11 8.93 6.03 17.29 10.94 25 22.1 34.72 69.57 48.39 107.56 33.54 20.65-8.08 22.5-15.31 34-23.54Zm320-1c12.51 5.34 10.73 10.47 1.91 18.57-8.18 7.52-16.65 12.67-26.91 16.83-27.39 11.09-63.18 8.47-89-5.71-56.7-31.15-64.76-116.41-20.96-161.69 16.95-17.52 41.58-27.96 65.96-28h13c17.15.2 38.68 7.29 52 18.09 3.48 2.82 13.82 11.03 13.1 15.87-.31 2.1-2.54 3.96-4.12 5.19-1.79 1.39-2.96 1.94-4.98 2.85-16.12-22.52-41.49-30.31-68-30-13.46.16-31.78 6.35-43 13.7-48.27 31.58-51.35 106.37-9 144.13 32.26 28.76 94.69 27.83 120-9.83Zm130-159.58c31.95-3.9 65.11 6.25 86.83 30.58 14.22 15.93 24.14 40.56 24.17 62v17c-.32 26.84-16.35 57.76-38 73.41-21.5 15.54-41.23 18.89-67 18.59-7.87-.1-18.5-2.52-26-5-31.73-10.49-54.2-35.62-62.1-68-3.13-12.81-3.05-22.06-2.9-35 .18-14.98 5.27-32.93 12.51-46 12.61-22.75 33.41-38.61 58.49-45.25l14-2.33ZM1229 184c2.81-11.94 13.43-23.44 23-30.63 20.75-15.58 38.22-16.66 63-16.37 10.93.13 25.57 4.26 35 9.75 11.55 6.71 21.12 16.99 26.56 29.25l5.44 14c3.84-16.33 17.18-31.14 31-39.95 20.33-12.95 36.95-13.32 60-13.05 21.62.26 42.69 11.59 55.22 29 14.93 20.75 13.78 43.98 13.78 68v104h-13V215c-.03-18.87-8.14-40.46-23-52.53-21.85-17.76-59.06-17.22-83-3.96-7.55 4.19-14.03 9.9-19.56 16.49-19.32 23.02-18.44 47.97-18.44 76v87h-13V221c-.03-17.84-4.92-39.43-17.32-52.83-19.51-21.09-55.03-24.08-80.68-13.72-11.39 4.6-21.2 12.02-28.91 21.55-18.09 22.38-17.09 46.16-17.09 73v89h-13V138h13v29l1 17Zm542 114c2.39 2.42 7.16 6.17 5.83 10-.91 2.65-6.56 7.66-8.83 9.56-8.97 7.53-18.99 12.76-30 16.58-30.89 10.72-70.81 4.63-97-14.9-48.89-36.45-51.28-121.31-5-160.94 14.53-12.44 35.76-21.21 55-21.3h13c8.96.11 17.63 2.32 26 5.31 23.27 8.31 40.35 24.18 50.69 46.69 7.74 16.84 10.31 32.6 10.31 51h-175c.03 34.99 20.14 67.24 53 80.55 13.99 5.67 25.24 6.47 40 6.45 15.51-.02 33.42-5.67 46-14.78l16-14.22Zm7-69c-.24-26.58-16.1-55.62-39-69.24-24.94-14.85-59.06-14.85-84 0-18.23 10.85-30.98 29.82-36.11 50.24l-2.89 19h162Zm-1180 0c-2.27-28.02-15.25-54.79-40-69.55-29.57-17.64-72.11-13.53-96.96 10.64-15.37 14.94-24.57 37.54-25.04 58.91h162Zm445-79.7c-32.04 5.95-54.87 20.41-67.55 51.7-4.06 10.03-6.4 24.18-6.45 35-.18 39.89 18.04 74.6 58 86.98 5.76 1.78 15.05 3.95 21 4.02 18.01.21 32.87-1.63 49-10.51 49.02-27.01 55.84-102.96 18.71-142.4-18.76-19.93-46.02-27.44-72.71-24.79Zm799 165.55c4.74-1.3 9.69-1.39 13.67 1.95 7.18 6.01 5.14 18.08-3.67 21.46-14.63 5.61-25.63-14.82-10-23.41Z"
                        > </path>
                      </svg>{" "}
                    </div>{" "}
                    <span id="introduction" >
                      <p>
                        I am Divyanshu Tyagi, a seasoned Full - Stack Developer based in the picturesque city of Haridwar, Uttarakhand, India.Armed with over six years of intensive professional experience, I have a proven track record in successfully spearheading and independently crafting an array of diverse projects.
                        I am adept at designing and implementing both front - end and back - end systems, catering to an extensive clientele across multiple industries.My repertoire spans from dynamic real - time Chat applications, intricate E - commerce platforms, to niche and highly compliant real - time patient monitoring systems.
                        As a tech enthusiast, I remain at the forefront of cutting - edge systems, continually integrating novel technologies to optimize performance and efficiency.My approach marries aesthetics and functionality, wherein I prioritize the creation of pixel - perfect, visually stunning interfaces, paired with intuitively designed user experiences.
                        In entrusting your project to me, you gain a committed partner who strives for excellence, meticulously attuned to the distinct needs of your business, and unwavering in the pursuit of achieving your goals.I look forward to exploring how we can transform your vision into reality, creating bespoke solutions that exceed expectations.
                      </p>
                    </span>
                  </div>
                </div>
                <div className="spacer" />
                <div className="main-projects" >
                  <h2>
                    Projects
                    {/* {"  -  "}{" "} <span> <Counter /> <span className={styles.shyText}>and counting...</span></span>*/}
                  </h2>
                  <div className="project-wrapper" >
                    <div>
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
                      </a>
                      {" "}
                      <a
                        rel="noopener"
                        target="_blank"
                        href="https://www.pickndplay.com/song/queries?Id=XXYlFuWEuKI"
                      >
                        {" "}
                        <span> Pick n & apos; play </span>
                      </a>{" "}
                      <a
                        rel="noopener"
                        target="_blank"
                        href="https://mycompliance.netlify.app/employees"
                      >
                        {" "}
                        <span > Wallzone Trace </span>
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
                        <span > ReliefHHS </span>{" "}
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
              </main >
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
                  > </path>
                </svg>{" "}
              </div >
            </div >
          </div >
        </div >
      </main >
    </>
  );
}