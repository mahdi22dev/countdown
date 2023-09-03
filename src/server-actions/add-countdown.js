"use server";
export async function addCountdown() {
  const res = await fetch("http://localhost:3000/api/add");
  const data = await res.json();
  return data;
}
