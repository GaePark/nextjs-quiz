"use client";
import React, { useState } from "react";
import queryStyle from "./Query.module.css";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { usePathname } from "next/navigation";

interface IQueryProps {
  data: {
    q: string;
    c1: string;
    c2: string;
    c3: string;
    c4: string;
    a: string;
    id: string;
  };
  i: number;
  onSubmitNext?: any;
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
}

const Query = ({ data, i, onSubmitNext, setAnswer, answer }: IQueryProps) => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const [CCheck, setCCheck] = useState(false);
  const [color, setColor] = useState("");

  const onChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
    setIsActive(true);
    setCCheck(false);
  };

  const onSubmitChecked = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (answer === data.a) {
      setCCheck(true);
      setColor("green");
    } else {
      setCCheck(true);
      setColor("red");
    }
    setIsActive(false);
  };

  if (pathname === "/quiz") {
    return (
      <div className={queryStyle.wrapper}>
        <div className={queryStyle.container}>
          <div className={queryStyle.title}>
            {i + 1}번 {data.q}
          </div>
          <form
            className={queryStyle.content}
            onSubmit={onSubmitNext && onSubmitNext}
          >
            <label className={queryStyle.text}>
              <input
                type="radio"
                name="inputRa"
                value={data.c1}
                className={queryStyle.textInput}
                onChange={onChangeAnswer}
              />
              {data.c1}
            </label>
            <label className={queryStyle.text}>
              <input
                type="radio"
                name="inputRa"
                value={data.c2}
                className={queryStyle.textInput}
                onChange={onChangeAnswer}
              />
              {data.c2}
            </label>
            <label className={queryStyle.text}>
              <input
                type="radio"
                name="inputRa"
                value={data.c3}
                className={queryStyle.textInput}
                onChange={onChangeAnswer}
              />
              {data.c3}
            </label>
            <label className={queryStyle.text}>
              <input
                type="radio"
                name="inputRa"
                value={data.c4}
                className={queryStyle.textInput}
                onChange={onChangeAnswer}
              />
              {data.c4}
            </label>
            <input
              type="submit"
              value="다음"
              className={queryStyle.next}
              style={{ height: isActive ? "40px" : "0" }}
            />
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className={queryStyle.wrapper}>
        <div
          className={queryStyle.container}
          style={{ border: CCheck ? `3px solid ${color}` : "none" }}
        >
          <div className={queryStyle.title}>
            {i + 1}번 {data.q}
          </div>
          <form className={queryStyle.content} onSubmit={onSubmitChecked}>
            <label className={queryStyle.text}>
              {CCheck && (
                <span className={queryStyle.text_span}>
                  {data.c1 === data.a ? (
                    <FaRegCheckCircle color="green" />
                  ) : (
                    <FaRegCircleXmark color="red" />
                  )}
                </span>
              )}
              <input
                type="radio"
                name={data.q}
                value={data.c1}
                className={queryStyle.textInput}
                onChange={onChangeAnswer}
              />
              {data.c1}
            </label>
            <label className={queryStyle.text}>
              {CCheck && (
                <span className={queryStyle.text_span}>
                  {data.c2 === data.a ? (
                    <FaRegCheckCircle color="green" />
                  ) : (
                    <FaRegCircleXmark color="red" />
                  )}
                </span>
              )}
              <input
                type="radio"
                name={data.q}
                value={data.c2}
                className={queryStyle.textInput}
                onChange={onChangeAnswer}
              />
              {data.c2}
            </label>
            <label className={queryStyle.text}>
              {CCheck && (
                <span className={queryStyle.text_span}>
                  {data.c3 === data.a ? (
                    <FaRegCheckCircle color="green" />
                  ) : (
                    <FaRegCircleXmark color="red" />
                  )}
                </span>
              )}
              <input
                type="radio"
                name={data.q}
                value={data.c3}
                className={queryStyle.textInput}
                onChange={onChangeAnswer}
              />
              {data.c3}
            </label>
            <label className={queryStyle.text}>
              {CCheck && (
                <span className={queryStyle.text_span}>
                  {data.c4 === data.a ? (
                    <FaRegCheckCircle color="green" />
                  ) : (
                    <FaRegCircleXmark color="red" />
                  )}
                </span>
              )}

              <input
                type="radio"
                name={data.q}
                value={data.c4}
                className={queryStyle.textInput}
                onChange={onChangeAnswer}
              />
              {data.c4}
            </label>
            <input
              type="submit"
              value="답변을 확인하세요"
              className={queryStyle.submit}
              style={{ height: isActive ? "40px" : "0" }}
            />
          </form>
        </div>
      </div>
    );
  }
};

export default Query;
