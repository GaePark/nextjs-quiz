"use client";
import Query from "@/app/_components/Query/Query";
import React, { ChangeEvent, useState } from "react";
import Total from "../../_components/total/page";

interface Idata {
  q: string;
  c1: string;
  c2: string;
  c3: string;
  c4: string;
  a: string;
  id: string;
}

const Quiz = () => {
  const [data, setData] = useState<Idata[]>([]);
  const [chose, setChose] = useState(false);
  const [c, setC] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(false);
  const [answer, setAnswer] = useState("");

  const getData = async (op: string) => {
    let a: Idata[] = [];
    const res = await fetch(
      `http://127.0.0.1:8090/api/collections/${op}/records`,
      { cache: "no-store" }
    );
    const db = await res.json();
    const result = db.items;
    for (let i = 0; i < 4; i++) {
      const random = Math.floor(Math.random() * result.length);
      a.push(result[random]);
      result.splice(random, 1);
    }
    setData(a);
  };

  const onChangeValue = async (e: ChangeEvent<HTMLSelectElement>) => {
    let op = e.target.value;
    await getData(op);
    setChose(true);
  };

  const onSubmitNext = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (answer === data[c].a) {
      setScore(score + 1);
    }
    if (c >= 3) {
      setTotal(true);
      return;
    }
    setC(c + 1);
  };

  if (!chose) {
    return (
      <div style={{ padding: "50px" }}>
        <select
          value=""
          onChange={onChangeValue}
          style={{ width: "100%", height: "30px" }}
        >
          <option value="none">선택</option>
          <option value="math">math</option>
          <option value="alphabet">alphabet</option>
        </select>
      </div>
    );
  }
  if (total) {
    return (
      <div>
        <Total score={score} />;
      </div>
    );
  } else {
    return (
      <div style={{ padding: "50px" }}>
        <Query
          data={data[c]}
          i={c}
          onSubmitNext={onSubmitNext}
          setAnswer={setAnswer}
          answer={answer}
        />
        <div>{c + 1} / 4문제</div>
      </div>
    );
  }
};

export default Quiz;
