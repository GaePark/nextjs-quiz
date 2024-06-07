"use client";
import React from "react";

interface ITotalProps {
  score: number;
}

const Total = ({ score }: ITotalProps) => {
  const onClickReload = () => {
    location.reload();
  };
  return (
    <div>
      <h1>총 4문제 중 {score}문제 맞추셨습니다!</h1>
      <button onClick={onClickReload}>다시 풀기</button>
    </div>
  );
};

export default Total;
