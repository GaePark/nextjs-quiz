"use client";
import Query from "@/app/_components/Query/Query";
import React, { useEffect, useState } from "react";

interface Idata {
  q: string;
  c1: string;
  c2: string;
  c3: string;
  c4: string;
  a: string;
  id: string;
}

const Question = () => {
  const [data, setData] = useState<Idata[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setData([]);
    const getData = async () => {
      let a: Idata[] = [];
      const res = await fetch(
        `http://127.0.0.1:8090/api/collections/question/records`,
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
  }, []);
  if (!loading) return <div>Loading...</div>;
  return (
    <div style={{ padding: "50px" }}>
      {data.map((data: Idata, i: number) => (
        <Query
          key={data.q}
          data={data}
          i={i}
          setAnswer={setAnswer}
          answer={answer}
        />
      ))}
    </div>
  );
};

export default Question;
