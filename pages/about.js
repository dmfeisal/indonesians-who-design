import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import Title from "../components/Title.js";
import MetaTags from "../components/Metatags.js";
import Analytics from "../components/Analytics.js";

const item = {
  hidden: { opacity: 0, y: "15%" },
  show: { opacity: 1, y: "0%" },
  transition: {
    easing: "easeInOut",
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Home({ designers }) {
  return (
    <div className="container">
      <Head>
        <title>Indonesians Who Design | About</title>
        <link rel="icon" href="/favicon.png" />
        <MetaTags />
      </Head>

      <Link href="/" shallow={true}>
        <a className="auxNav arrowback">←</a>
      </Link>

      <Title
        className="title m0 p0"
        text="Indonesians&nbsp;who&nbsp;design*is&nbsp;a&nbsp;platform"
        noAnimation
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <p className="f1 extend">
          <motion.span variants={item}>to showcase</motion.span>{" "}
          <motion.span variants={item}>the work of brilliant</motion.span>{" "}
          <motion.span variants={item}>Indonesian designers to the world.</motion.span>{" "}
          <motion.span variants={item}>The goal of the project is</motion.span>{" "}
          <motion.span variants={item}>to inspire new designers to expand their references,</motion.span>{" "}
          <motion.span variants={item}>experienced designers to diversify their network,</motion.span>{" "}
          <motion.span variants={item}>and companies to find hidden talent to join their teams.
          </motion.span>
        </p>
      </motion.div>

      <div className="moreabout">
        <div className="col-left">
          <h3>How can I nominate someone?</h3>
          <p>
            If you know a Indonesian designer whose experience, work or opinions is valuable to
            the design industry, please{" "}
            <Link href="/nominate">
              <a className="link">fill out this form</a>
            </Link>{" "}
            with their information and a brief explanation about why you're nominating them. 
            You can choose to link to their portfolio, website or blog, to their Linkedin,
            or to other social profiles such as Twitter or Instagram — any link
            that you feel best represents how that person is making an impact in 
            the industry. As with other talent aggregators that have inspired 
            this website, we won’t display the designer’s photo as we want the 
            repository to be less about appearances and more about that person's story, 
            their thoughts, skills and abilities.
          </p>

          <h3>How did you come up with this idea?</h3>
          <p>
            We didn’t. This project is inspired by our fantastic sibling sites:
          </p>
          <ul>
            <li>
              <a className="link" href="https://brazilianswho.design/">
                brazilianswho.design
              </a>
            </li>
            <li>
              <a className="link" href="https://britswho.design/">
                britswho.design
              </a>
            </li>
            <li>
              <a className="link" href="https://uruguayanswho.design/">
                uruguayanswho.design
              </a>
            </li>
            <li>
              <a className="link" href="https://spaniardswho.design/">
                spaniardswho.design
              </a>
            </li>

            <li>
              <a className="link" href="https://womenwho.design/">
                Women Who Design
              </a>
            </li>
            <li>
              <a className="link" href="https://www.womenwhodraw.com/">
                Women Who Draw
              </a>
            </li>
            <li>
              <a className="link" href="http://www.28blacks.com/">
                28 Black Designers
              </a>
            </li>
            <li>
              <a className="link" href="https://www.latinxswhodesign.com/">
                Latinx Who Design
              </a>
            </li>
            <li>
              <a
                className="link"
                href="https://filipinos-who-design.webflow.io/"
              >
                Filipinos Who Design
              </a>
            </li>
            <li>
              <a
                className="link"
                href="https://filipinos-who-design.webflow.io/"
              >
                People Of Craft
              </a>
            </li>
            <li>
              <a className="link" href="https://indianswhodesign.in/">
                Indians Who Design
              </a>
            </li>
            <li>
              <a className="link" href="https://www.apiwho.design/">
                Asian & Pacific Islanders Who Design
              </a>
            </li>
          </ul>

          <h3>How did you build this?</h3>
          <p>
            Indonesians Who Design is{" "}
            <a
              className="link"
              target="_blank"
              href="https://github.com/daengdoang/indonesians-who-design"
            >
              open source
            </a>
            for you create your own showcase. It is built using the amazing open source {" "}
            <a
              className="link"
              target="_blank"
              href="https://github.com/zehfernandes/brazilianswhodesign"
            >
              Brazilians Who Design
            </a> template. 
          </p>
          <br />
          <p>
            Thanks to UXID Web for the help of gathering the initial list of designers.
          </p>

          <h3>Who’s behind this?</h3>
          <ul>
            <li>
              <a className="link" href="https://twitter.com/daengdoang">
                Daeng M. F.
              </a>
            </li>
          </ul>
        </div>

        <div className="col-right">
          <h3>How can I remove my name?</h3>
          <p>
            If you’ve been added to the directory and would like to opt-out or
            make an edit to your profile, please send us a message at
            hello[at]dae[dot]ng or DM via twitter <a className="link" href="https://twitter.com/daengdoang">@daengdoang</a>.
          </p>
          <h3>Why is my nomination taking so long to show?</h3>
          <p>
            We update this website twice a week to include new names. 
          </p>
        </div>

        <Analytics />
      </div>

      <style jsx>{`
        .extend {
          margin: 0;
          max-width: 17ch;
        }

        .moreabout {
          font-weight: normal;
          font-size: 1.5rem;
          line-height: 140%;
          letter-spacing: 0.01em;
          display: flex;
          margin-top: 8rem;
        }

        .moreabout > div {
          width: 50%;
          max-width: 50ch;
        }

        .col-right {
          padding-left: 3rem;
        }
        .col-left {
          padding-right: 3rem;
        }

        .moreabout p {
          margin: 0;
          padding: 0;
        }

        .moreabout h3 {
          padding: 0;
          margin: 0;
          font-size: 1.5rem;
        }

        .moreabout h3 {
          margin: 4rem 0 0 0;
        }

        ul,
        li {
          padding: 0;
          margin: 0;
          list-style: none;
          margin-top: 0.3rem;
        }

        @media (max-width: 480px) {
          .moreabout {
            display: block;
          }

          .moreabout > div {
            width: 100%;
            max-width: 100%;
            display: block;
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
}
