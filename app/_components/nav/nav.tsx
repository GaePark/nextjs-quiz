import Link from "next/link";
import React from "react";
import navStyle from "./nav.module.css";

const Nav = () => {
  return (
    <div className={navStyle.wrapper}>
      <div className={navStyle.title}>Quiz App</div>
      <div className={navStyle.nav}>
        <Link href={"/"} className={navStyle.nav_wrap}>
          Home
        </Link>
        <Link href={"/question"} className={navStyle.nav_wrap}>
          Question
        </Link>
        <Link href={"/state"} className={navStyle.nav_wrap}>
          State
        </Link>
        <Link href={"/quiz"} className={navStyle.nav_wrap}>
          Quiz
        </Link>
      </div>
    </div>
  );
};

export default Nav;
