"use client";
import Query from "@/app/_components/Query/Query";
import React, { ChangeEvent, useEffect, useState } from "react";

interface Idata {
  q: string;
  c1: string;
  c2: string;
  c3: string;
  c4: string;
  a: string;
  id: string;
}

const State = () => {
  const [data, setData] = useState<Idata[]>([]);
  const [select, setSelect] = useState<string>("math");
  const [loading, setLoading] = useState<boolean>(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setData([]);
    const getData = async () => {
      let a: Idata[] = [];
      const res = await fetch(
        `http://127.0.0.1:8090/api/collections/${select}/records`,
        { cache: "no-store" }
      );
      const db = await res.json();
      const result = db.items;
      for (let i = 0; i < 2; i++) {
        const random = Math.floor(Math.random() * result.length);
        a.push(result[random]);
        result.splice(random, 1);
      }
      setData(a);
      setLoading(true);
    };
    getData();
  }, [select]);

  const onChangeValue = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  if (!loading) return <div>Loading...</div>;
  return (
    <div style={{ padding: "50px" }}>
      <select
        value={select}
        onChange={onChangeValue}
        style={{ width: "100%", height: "30px" }}
      >
        <option value="math">math</option>
        <option value="alphabet">alphabet</option>
      </select>

      {data.map((data: Idata, i: number) => (
        <Query
          key={data.q}
          data={data}
          i={i}
          answer={answer}
          setAnswer={setAnswer}
        />
      ))}
    </div>
  );
};

export default State;
