"use server";

// remove
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function onCreate(formData) {
  await delay(1000);
  console.log("from server");
  console.table(formData);
  return formData;
}
